import 'babel/polyfill';
import md5 from 'md5';

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    username: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING
  });
  (async function() {
    // await User.drop();
    // await User.sync();
    await user.findOne({
      where: {username: 'admin'}
    }).then((res) => {
      if (!res) {
        user.create({username: 'admin', password: md5(process.env.PASSWORD)})
      }
    });
  }());
  return user;
};
