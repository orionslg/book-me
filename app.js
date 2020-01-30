const express = require('express');
const app = express();
const session = require('express-session');

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:false }));
app.use(session({
    secret: 'kucing rahasia',
    resave: false,
    saveUninitialized: true
}))

const router = require('./routes/index');

app.use('/', router)

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`);
})