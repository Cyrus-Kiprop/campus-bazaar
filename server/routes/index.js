const router = require("express").Router();
const path = require("path");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const secret = process.env.SECRET;

//models
const { User, Product } = require("../models/index");

// stores the new image genreate
let newImage;
let finalProduct;

// User api endpoints
router.post("/register", (req, res) => {
  // check to see if the email exist in the database
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      let error = "Email Address Exists in Database.";
      return res.status(400).json(error);
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
});

// login routes
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let errors = {};
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "No Account Found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.email
        };
        jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
          if (err)
            res.status(500).json({ error: "Error signing token", raw: err });

          res.json({
            success: true,
            user: user,
            token: `Bearer ${token}`
          });
        });
      } else {
        errors.password = "Password is incorrect";
        res.status(400).json(errors);
      }
    });
  });
});

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

        if (finalProduct && Object.keys(finalProduct).length > 1) {
          const product = new Product(finalProduct);
          const result = await product.save();
          console.log(result);
          res.send(result).status(200);
        }
      }
    }
  } catch (error) {
    console.log(error.stack);
  }
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

router.get(
  "/homepage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.send("This is our homepage")
);

module.exports = router;
