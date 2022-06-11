import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url'; // Needed to work with path.

// We add __filename to get the current path.
const __filename = fileURLToPath(import.meta.url);
// We add __dirname to our ES scope.
const __dirname = path.dirname(__filename);
//We start the express app.
const app = express();

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

app.listen(8080, () => {
    console.log('Serving on port 8080!');
})