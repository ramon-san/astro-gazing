import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url'; // Needed to work with path.
import methodOverride from 'method-override';
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
// Middleware to parse request as URL encoded.
app.use(express.urlencoded({ extended: true }));
// We call in the override middleware to allow form requests different than GET or POST.
app.use(methodOverride('_method'));

// We tell our app to use EJS.
app.set('view engine', 'ejs');
// We set the path of our views folder.
app.set('views', path.join(__dirname, '/views'));

// Render Landing Page.
app.get('/', (req, res) => {
    res.render('home', { title: "Home" });
});

// Render page indexing all customers.
app.get('/customers', async (req, res) => {
    const customers = await Customer.find({});
    res.render('customers/index', { title: "Customer list", customers });
});

// Send message to create customers elsewhere.
app.get('/make-customer', async (req, res) => {
    res.send('To make customers use seed...');
});

// Render page with form to add new customer.
app.get('/customers/new', (req, res) => {
    res.render('customers/new', { title: "New Client" });
});

// Add new customer to the DB.
app.post('/customers', async (req, res) => {
    const newCustomer = new Customer(req.body.customer);
    await newCustomer.save();
    res.redirect(`/customers/${newCustomer._id}`);
});

// Render page with form to edit new customer.
app.get('/customers/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findById(id);
        res.render('customers/edit', { title: "Edit", customer });
    } catch (err) {
        console.log("Error: " + err)
        res.redirect('/customers');
    }
});

app.put('/customers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updateCustomer = await Customer.findByIdAndUpdate(id, req.body.customer, { runValidators: true, new: true });
        res.redirect(`/customers/${updateCustomer._id}`); // We need to await previous line for this to work.
    } catch (e) {
        res.send("ERROR: " + e);
    }
});

// Delete given id.
app.delete('/customers/:id', async (req, res) => {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.redirect('/customers');
});

// Render page showing a specific customer.
app.get('/customers/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    try {
        res.render('customers/show', { title: customer.name, customer });
    } catch (err) {
        console.log("Error: " + err);
    }
});

app.listen(8080, () => {
    console.log('Serving on port 8080!');
})