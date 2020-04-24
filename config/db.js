const Sequelize = require('sequelize').Sequelize;

//database, username, password
let sequelize = new Sequelize('BasededatosTaco','root','',{
  host: 'localhost',
  dialect: 'mysql'
});

//Promise
sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL connection successful.')
  })
  .catch((err) => {
    console.error('MySQL connection error: ', err)
  });

  module.exports = {
      //sequelize: sequelize
      sequelize
  }