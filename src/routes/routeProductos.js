const { Router } = require("express");
const router = Router();
const Contenedor = require("../classProducts");
const dataJson = "./productos.json";
const contenedorProductos = new Contenedor();
const multer = require("multer");

// Multer subir archivos.
// 'image' campo en el formulario para subir imagen.
const storage = multer.diskStorage({
  destination: (req, dataJson, cb) =>{
    cb(null, 'src/public/uploads');
   
  },
  filename: (req, dataJson, cb) => {
    cb(null, dataJson.originalname);
  },
});
router.use(multer({ storage }).single('image'));


router.get('/', (req, res) => {
  res.render("index", {
    title: "WebStore",
    items: contenedorProductos.getAll(dataJson)
  })
})
 
  
  router.post('/productos', (req, res, next) => {
    const body = req.body
    const image = req.file
    console.log(req)
    body.thumbnail = '/uploads/'+image.filename
    contenedorProductos.saveProducto(body, dataJson)
    res.redirect('/')
  })

  
 
module.exports = router
