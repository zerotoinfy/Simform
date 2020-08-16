const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');

// Models
let User = require('../models/Register');
let Product = require('../models/Product');

router.route('/test').get((req, res) => {
  res.json({
    message: 'Welcome To The API'
  });
});

router.route('/posts').post(verifyToken, (req, res) => {
  console.log('The value of token is ; ', req.token);
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      console.log("there is an error.")
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Successfull',
        authData
      });
    }
  });
});

// Verify Token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, "secretKey", function (err, decoded) {
      if (err) {
        console.log("Unable To Verify Token");
      } else {
        console.log("Token Verified Successfully");
      }
    });
    next();
  } else {
    res.sendStatus(403);
  }
}

// User Register
router.route('/verify').post(verifyToken, (req, res, next) => {

  res.status(401).json({ success: false, message: "List Successfullll" });

});

router.route('/login').post((req, res, next) => {
  var userParams = {
    email: req.body.email,
    password: req.body.password
  }

  User.countDocuments(userParams, function (err, count) {
    if (count > 0) {
      authToken = jwt.sign(userParams, 'secretKey');
      console.log("The User Can Login Successfully...");
      return res.status(200).json({ success: false, message: "LogIn Successfull", token: authToken, email: req.body.email });
    } else {
      console.log("User Is Unauthorized So Cannot LogIn.");
      res.status(401).json({ success: false, message: "User Doesnot Exist." });
    }
  });
});


// User Register
router.route('/register').post((req, res, next) => {
  User.countDocuments({ email: req.body.email }, function (err, count) {
    if (count > 0) {
      console.log("Yes this email already found...", count);
      return res.status(400).json({ success: false, message: "This User Already Exist." });
    }

    var userParams = {
      email: req.body.email,
      password: req.body.password
    }
    var authToken = jwt.sign(userParams, 'secretKey');
    userParams.token = authToken;
    userParams.name = req.body.name;
    userParams.designation = req.body.designation;
    userParams.phoneNumber = req.body.phoneNumber;

    console.log("The data received in the request is : ", userParams);
    User.create(userParams, (error, data) => {
      if (error) {
        console.log("There is an error in resistering user in MongoDb");
        return next(error)
      } else {
        console.log("User Registered successfully in MongoDb");
        res.json(data)
      }
    });
  });
});

// Add Product
router.route('/create').post((req, res, next) => {
  Product.create(req.body, (error, data) => {
    console.log('The Create Route Is Hitted...');
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Employees
router.route('/').get((req, res) => {
  Product.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
router.route('/read/:id').get((req, res) => {
  Product.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update employee
router.route('/update/:id').put((req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete employee
router.route('/delete/:id').delete((req, res, next) => {
  Product.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;