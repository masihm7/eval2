const express = require('express')
const connectDB = require('./config/db'); 
const cors = require('cors');


const app = express()
app.use(express.json());
require('dotenv').config();

connectDB();

app.use(cors({ origin: '*' }));

app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/', require('./routes/authroutes'));
app.use('/', require('./routes/employeeroutes'));

app.listen(process.env.PORT, () => {
    console.log('Server running on http://localhost:3000');
});
