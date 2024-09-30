const mongoose = require('mongoose');
require('dotenv').config()


function connectToDB(){

    mongoose.connect(process.env.MANGO_URI)
  .then(() => console.log('mongoose is connected successfully'))
  .catch(()=>console.log('not connected in mongoose'))

}
module.exports = connectToDB