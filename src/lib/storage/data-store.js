'use strict';
require('dotenv').config();
// Pull in all of our possible storage modules
const memoryStorage = require('./memory.js');
const fileStorage = require('./filesystem.js');

let dataStorageModule = {};
console.log(process.env.STORAGE);

// Based on an entry in our .env file (or really any other mechanism you want)
// Switch this module to export THAT storage mechanism
// This allows this application to dynamically switch out storage systems based
// on any logic you choose
switch( process.env.STORAGE ) {
case 'filesystem':
  console.log('i reached data store');
  dataStorageModule = fileStorage;
  break;
default:
  dataStorageModule = memoryStorage;
  break;
}

module.exports = dataStorageModule;