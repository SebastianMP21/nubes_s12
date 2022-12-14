const { Router } = require('express');
const router = Router();

const Contacto = require('../models/Contacto');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const fs = require('fs-extra');

router.get('/', async (req, res) => {
    const contactos = await Contacto.find();
    res.render('images', {contactos});
});

router.get('/images/add', async (req, res) => {
    const contactos = await Contacto.find();
    res.render('image_form', {contactos});
});

router.post('/images/add', async (req, res) => {
    console.log(req.body);
    const { nombre, apellidos, correo, fecha_nac } = req.body;
    console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result);
    
    const newContacto = new Contacto({
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        fecha_nac: fecha_nac,
        imageURL: result.url,
        public_id: result.public_id
    });

    await newContacto.save();
    await fs.unlink(req.file.path);
    res.redirect('/');
});

router.get('/images/delete/:contacto_id', async (req, res) => {
    const { contacto_id }= req.params;
    const contacto = await Contacto.findByIdAndDelete(contacto_id);
    const result = await cloudinary.v2.uploader.destroy(contacto.public_id);
    console.log(result);
    res.redirect('/images/add')
});

module.exports = router;