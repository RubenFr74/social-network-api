const moongoose = require('mongoose');

moongoose.connect =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';


module.exports = connection;