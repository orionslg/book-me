const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:false }));
const router = require('./routes/index');

app.use('/', router)

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`);
})