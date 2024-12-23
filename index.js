
const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const router=require('./routes/route');
const connection=require('./Db/db')
require('dotenv').config();

const app=express();
// dotenv.config()
// console.log(process.env.JWT);


app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',router);


const PORT=process.env.PORT||5000;
// const PORT=8000;

app.listen(PORT,()=>{
    console.log(`server is running on port  ${PORT}`);
    
});

