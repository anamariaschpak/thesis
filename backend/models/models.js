const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("thesisDB", "root", "p@ss", {
  dialect: "mysql",
  logging: false,
});

const Model = Sequelize.Model;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established succesfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the DB: ", err);
  });

class User extends Model {}
User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user" }
);

const Author = sequelize.define(
  "Author",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    isParsed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

const Coauthor = sequelize.define(
  "Coauthor",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false }
);

const Authorcoauthors = sequelize.define(
  "Authorcoauthors",
  {},
  { timestamps: false }
);

Author.belongsToMany(Coauthor, {
  through: Authorcoauthors,
  foreignKey: "authorId",
});
Coauthor.belongsToMany(Author, {
  through: Authorcoauthors,
  foreignKey: "coauthorId",
});

sequelize.sync();

module.exports = {
  sequelize,
  User,
  Author,
  Coauthor,
  Authorcoauthors,
};
