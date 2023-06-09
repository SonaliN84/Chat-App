const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cron = require("node-cron");

const multer = require("multer");
const sequelize = require("./util/database");

const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const groupRoutes = require("./routes/group");

const User = require("./models/user");
const Message = require("./models/message");
const Group = require("./models/group");
const UserGroup = require("./models/usergroup");
const ArchivedMessage = require("./models/archivedmessages");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(multer().single("myfile"));
app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);
app.use(messageRoutes);
app.use(groupRoutes);

Message.belongsTo(User);
User.hasMany(Message);

Message.belongsTo(Group);
Group.hasMany(Message);

ArchivedMessage.belongsTo(User);
User.hasMany(ArchivedMessage);

ArchivedMessage.belongsTo(Group);
Group.hasMany(ArchivedMessage);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

sequelize
  .sync()
  .then((result) => {
    const server = app.listen(process.env.PORT || 3000);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      socket.on("joinroom", (room) => {
        console.log("JOIN ROOM ", room);
        socket.join(room);
      });
      socket.on("leaveroom", (room) => {
        socket.leave(room);
      });
      console.log("Client connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });

cron.schedule("0 0 * * *", () => {
  sequelize.query(
    "insert into archivedmessages (name,message,url,UserId,groupId,createdAt,updatedAt) select name,message,url,UserId,groupId,createdAt,updatedAt from messages"
  );
  sequelize.query("DELETE FROM messages");
});
