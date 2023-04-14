const express =require('express')
const bodyParser=require('body-parser');
var cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();

const sequelize=require('./util/database');

const userRoutes=require('./routes/user')
const messageRoutes=require('./routes/message')


const User=require('./models/user');
const Message=require('./models/message')

const app=express()


app.use(cors({
    origin:'http://localhost:3002'
}));
app.use(bodyParser.json({extended:false}));

app.use(userRoutes)
app.use(messageRoutes)

Message.belongsTo(User);
User.hasMany(Message)

sequelize.sync()
.then((result)=>{
    app.listen(process.env.PORT || 3000);
})
.catch(err=>{
    console.log(">>>>>>",err)
})