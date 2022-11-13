const { Schema, model } = require('mongoose');

const Contacto = new Schema({
    nombre: String,
    apellidos: String,
    correo: String,
    fecha_nac: String,
    imageURL: String,
    public_id: String
});

module.exports = model('Contacto', Contacto);