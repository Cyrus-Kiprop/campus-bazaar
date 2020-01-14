const router = require("express").Router();
const multer = require("multer");

//generate random ID and get rid of the original name
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// handle file uploads using multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  //name file using unique ID
  filename: function(req, file, cb) {
    if (file.mimetype === "image/jpeg") {
      cb(null, Math.floor(Math.random() * 100) + makeid(15) + ".jpg");
    } else {
      cb(null, Math.floor(Math.random() * 100) + makeid(15) + ".png");
    }
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// configuration option to restrict files size
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

/*end of multer */
//models
const { User, Product } = require("../models/index");

// user routes
router.post("/addProduct", upload.single("UploadedFile"), async (req, res) => {
  // console.log(req.body); // this is an object holding the details of the registering user
  // const productImage = req.file.path.substr(8);
  // console.log(req.file);

  // // console.log(req.file.path);
  const { imageUrl, productName, description, price, location } = req.body;

  try {
    // there is no validation
    const newProduct = {
      imageUrl,
      price,
      productName,
      description,
      location
    };
    console.log(newProduct);
    const product = new Product(newProduct);
    const result = await product.save();
    console.log(result);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get courses
router.get("/getProducts", (req, res) => {
  Product.find({}, (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
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
