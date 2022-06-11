import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url'; // Needed to work with path.
import mongoose from 'mongoose';
// We add our DB schema objects.
import { Customer } from './models/customer.js'; // File extension is needed.

// We add __filename to get the current path.
const __filename = fileURLToPath(import.meta.url);
// We add __dirname to our ES scope.
const __dirname = path.dirname(__filename);
//We start the express app.
const app = express();

// We connect our mongoose library to the running Mongo DB.
mongoose.connect('mongodb://localhost:27017/disale') // Mongo default port is 27017 and we're currently hardcoding.
    .then(() => {
        console.log("DB connection Open!");
    }).catch(err => {
        console.log("DB connection error: " + err);
    });


// We serve our static files to any request.
app.use(express.static(path.join(__dirname, 'public'))); // __dirname gives us an absolute path.

// We tell our app to use EJS.
app.set('view engine', 'ejs');
// We set the path of our views folder.
app.set('views', path.join(__dirname, '/views'));

// Render Landing Page.
app.get('/', (req, res) => {
    res.render('home', { title: "Home" });
});

app.get('/make-customer', async (req, res) => {
    await customer.save();
    res.send(customer);
});

app.listen(8080, () => {
    console.log('Serving on port 8080!');
})