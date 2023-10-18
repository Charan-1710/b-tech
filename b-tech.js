const express = require('express');
const app = express();
const port = 3003;
var passwordHash = require("password-hash")
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended : false}));


app.use(express.static('public'));
app.set('view engine', 'ejs');

const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { credential } = require('firebase-admin'); 

const serviceAccount = require('./webpage.js.json');

const admin = initializeApp({
  credential: credential.cert(serviceAccount), 
});
app.post("/signup.html", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = passwordHash.generate(password);

const db = getFirestore();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/web/' + 'home.html');
});

app.get('/signupSubmit', function (req, res) {
  console.log(req.query);
  db.collection('web')
    .add({
      name: req.query.name,
      email: req.query.email,
      password: req.query.password,
    })
    .then(() => {
      res.sendFile(__dirname + '/web/' + 'login.html');
    })
    .catch(() => {
      res.send('Something went wrong');
    });
});
app.post('loginsubmit', (req, res) => {
  
const Email = req.body.email;
const Password = req.body.password;

db.collection('data')
  .where('Email', '==', Email)
  .get()
  .then((docs) => {
    if (docs.size === 1)
    const userDoc = docs.docs[0];
    const userData = userDoc.data();

    if (passwordHash.verify(Password, userData.Password)) {
      res.render('home', { userData: userData });
    } else {
      res.send('Login failed');
    }
  } else {
    res.send('This account is already exist ');
  }
})

app.get('/search', async (req, res) => {
  const title = req.query.title;

  try {
    const response = await axios.get(
    
    );
    const movieResults = response.data.Search || [];

    res.json(movieResults);
  } catch (error) {
    console.error('Error fetching movie data:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching movie data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
