'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable('results', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    productName: { type: 'string' },
    answers: { type: 'text' },
    createdAt: { type: 'datetime' },
    updatedAt: { type: 'datetime' }
  });
  return null;
};

exports.down = function(db) {
  db.dropTable('results');
  return null;
};
