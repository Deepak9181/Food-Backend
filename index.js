const express = require('express')
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
const userRoute = require('./Routes/UserRoutes');
const loginRoute=require('./Routes/LoginRoute');
const foodroute=require('./Routes/foodroute');

app.get('/',(req,res)=>{
  res.send("Hello World");
})

app.use('/user',userRoute);
app.use('/fooddata',foodroute);
app.use('/login',loginRoute);

module.exports=app;