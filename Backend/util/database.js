const Sequelize=require('sequelize');

const sequelize=new Sequelize('chat-app','root',process.env.ROOT_KEY,{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;