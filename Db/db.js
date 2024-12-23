const mySql= require('mysql2');
const connectdb=mySql.createConnection({
    host:'localhost',
    user:'root',
    password: 'root',
     database:'scheduledb',
    port:3306

});

connectdb.connect((error)=>{
    if (error) {
      return  console.log('error in connecting to db',error);  
    }
    else{
        console.log('database connected');      
    }
});
module.exports=connectdb;