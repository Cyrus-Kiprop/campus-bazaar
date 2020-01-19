const router = require("express").Router();
const path = require("path");

//models
const { User, Product } = require("../models/index");

// stores the new image genreate
let newImage;
let finalProduct;

// user routes
router.post("/addProduct", async (req, res) => {
  //  handle file renaming
  const rename = image => {
    const timeStamp = Date.now();
    let imageName;
    if (image.mimetype === "image/jpeg") imageName = `${timeStamp}.jpeg`;
    if (image.mimetype === "image/png") imageName = `${timeStamp}.png`;
    if (image.mimetype === "image/jpg") imageName = `${timeStamp}.jpg`;
    console.log(imageName);
    return imageName;
  };

  try {
    if (req.files) {
      const name = rename(req.files.image);
      console.log(req.files);
      newImage = name;
      req.files.image.mv(path.join(__dirname, `../../uploads`, name));
    }

    if (Object.keys(req.body)) {
      if (newImage && Object.keys(req.body)) {
        let data = req.body;
        data.imagePath = newImage;
        finalProduct = data;
        console.log(finalProduct);

        if(finalProduct && Object.keys(finalProduct).length > 1 ){
          const product = new Product(finalProduct);
            const result = await product.save();
            console.log(result);
            res.send(result).status(200);        }
      }
    }
  } catch (error) {
    console.log(error.stack);
    
  }

  // try {
  //   // there is no validation
  //   const newProduct = {
  //     imageUrl,
  //     price,
  //     productName,
  //     description,
  //     location,
  //     category
  //   };
  //   console.log(newProduct);
  //   const product = new Product(newProduct);
  //   const result = await product.save();
  //   console.log(result);
  //   res.send(result);
  // } catch (error) {
  //   res.status(500).send(error.message);
  // }
});

// get courses
router.get("/getProducts", (req, res) => {
  Product.find({}, (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
});

router.get(`/getProductsById/:id`, (req, res) => {
  console.log(req.params.id);

  Product.findById(req.params.id)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId
      });
    });
});

// product routes
// router.post("/addProduct", (req, res) => {
//   console.log(req.body);

//   const newProduct = new Product(req.body);
//   newProduct
//     .save()
//     .then(result => {
//       res.send(result).status(200);
//     })
//     .catch(err => {
//       console.log(err.message);
//       res.send(err.message);
//     });
// });

module.exports = router;
