const express =require('express')
const bodyParser=require('body-parser');
var cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();

const sequelize=require('./util/database');

const userRoutes=require('./routes/user')
const messageRoutes=require('./routes/message')
const groupRoutes=require('./routes/group')

const User=require('./models/user');
const Message=require('./models/message')
const Group=require('./models/group')
const UserGroup=require('./models/usergroup')

const app=express()


app.use(cors({
    origin:'http://localhost:3001'
}));
app.use(bodyParser.json({extended:false}));

app.use(userRoutes)
app.use(messageRoutes)
app.use(groupRoutes)

Message.belongsTo(User);
User.hasMany(Message);

Message.belongsTo(Group);
Group.hasMany(Message);

User.belongsToMany(Group,{through:UserGroup})
Group.belongsToMany(User,{through:UserGroup})




sequelize.sync()
.then((result)=>{
    app.listen(process.env.PORT || 3000);
})
.catch(err=>{
    console.log(err)
})