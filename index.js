import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url'; // Needed to work with path.
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import engine from 'ejs-mate'; // We call in this to create a generic partial.
// We add our DB schema objects.
import { Camp } from './models/camps.js'; // File extension is needed.

// We add __filename to get the current path.
const __filename = fileURLToPath(import.meta.url);
// We add __dirname to our ES scope.
const __dirname = path.dirname(__filename);
//We start the express app.
const app = express();

// We connect our mongoose library to the running Mongo DB.
mongoose.connect('mongodb://localhost:27017/astroGazing') // Mongo default port is 27017 and we're currently hardcoding.
    .then(() => {
        console.log("DB connection Open!");
    }).catch(err => {
        console.log("DB connection error: " + err);
    });

// We serve our static files to any request.
app.use(express.static(path.join(__dirname, 'public'))); // __dirname gives us an absolute path.
// Middleware to parse request as URL encoded.
app.use(express.urlencoded({ extended: true }));
// We call in the override middleware to allow form requests different than GET or POST.
app.use(methodOverride('_method'));

// We tell our app to use our new engine to make sense of EJS.
app.engine('ejs', engine);
// We tell our app to use EJS, the previous engine is used instead of default.
app.set('view engine', 'ejs');
// We set the path of our views folder.
app.set('views', path.join(__dirname, '/views'));

// Render Landing Page.
app.get('/', (req, res) => {
    res.render('home', { title: "Home" });
});

// Render page indexing all camps.
app.get('/camps', async (req, res) => {
    const camps = await Camp.find({});
    res.render('camps/index', { title: "Camps", camps });
});

// Send message to create camps elsewhere.
app.get('/make-camp', async (req, res) => {
    res.send('To make camps use seed...');
});

// Render page with form to add new camp.
app.get('/camps/new', (req, res) => {
    res.render('camps/new', { title: "New Camp" });
});

// Add new camp to the DB.
app.post('/camps', async (req, res, next) => {
    try {
        const newCamp = new Camp(req.body.camp);
        await newCamp.save();
        res.redirect(`/camps/${newCamp._id}`);
    } catch (error) {
        next(error);
    }
});

// Render page with form to edit new camp.
app.get('/camps/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const camp = await Camp.findById(id);
        res.render('camps/edit', { title: "Edit Camp", camp });
    } catch (err) {
        console.log("Error: " + err);
        res.redirect('/camps');
    }
});

app.put('/camps/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updateCamp = await Camp.findByIdAndUpdate(id, req.body.camp, { runValidators: true, new: true });
        res.redirect(`/camps/${updateCamp._id}`); // We need to await previous line for this to work.
    } catch (e) {
        res.send("ERROR: " + e);
    }
});

// Delete given id.
app.delete('/camps/:id', async (req, res) => {
    const { id } = req.params;
    await Camp.findByIdAndDelete(id);
    res.redirect('/camps');
});

// Render page showing a specific camp.
app.get('/camps/:id', async (req, res) => {
    const camp = await Camp.findById(req.params.id);
    try {
        res.render('camps/show', { title: camp.name, camp });
    } catch (err) {
        console.log("Error: " + err);
    }
});

// Basic error handling.
app.use((err, req, res, next) => {
    res.send('Oh boy, something went wrong.')
});

app.listen(7070, () => {
    console.log('Serving on port 7070!');
});