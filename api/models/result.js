import 'babel/polyfill';

module.exports = function(sequelize, DataTypes) {
  var result = sequelize.define("result", {
    productName: { type: DataTypes.STRING },
    answers: DataTypes.TEXT
  });
  return result;
}
