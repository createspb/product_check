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
  db.createTable('subscribes', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    email: { type: 'string' },
    createdAt: { type: 'datetime' },
    updatedAt: { type: 'datetime' }
  });
  return null;
};

exports.down = function(db) {
  db.dropTable('subscribes');
  return null;
};
