const express =require('express')
const bodyParser=require('body-parser');
var cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();

const sequelize=require('./util/database');
const userRoutes=require('./routes/user')

const app=express()


app.use(cors());
app.use(bodyParser.json({extended:false}));

app.use(userRoutes)

sequelize.sync()
.then((result)=>{
    app.listen(process.env.PORT || 3000);
})
.catch(err=>{
    console.log(">>>>>>",err)
})