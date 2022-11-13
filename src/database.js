const mongoose = require('mongoose')
require("dotenv").config()
mongoose.connect(

  process.env.MONGODB_ATLAS,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Error al conectar MongoAtlas'))
db.once('open', function callback() {
    console.log("¡Conectado a MongoAtlas!")
})
module.exports = db