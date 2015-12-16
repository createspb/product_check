import 'babel/polyfill';

module.exports = function(sequelize, DataTypes) {
  var result = sequelize.define("subscribes", {
    email: { type: DataTypes.STRING }
  });
  return result;
}
