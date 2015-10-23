import 'babel/polyfill';
import md5 from 'md5';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING
  });
  (async function() {
    await User.drop();
    await User.sync();
    await User.findOne({
      where: {username: 'admin'}
    }).then((user) => {
      if (!user) {
        User.create({username: 'admin', password: md5(process.env.PASSWORD)})
      }
    });
  }());
  return User;
};
