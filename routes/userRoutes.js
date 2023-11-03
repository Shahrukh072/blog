const express = require('express');
const { 
    signup,
    signin,
    saveEmailToGs,   
} = require('../controller/userController');
const { singleUpload, multipleUpload } = require('../middleware/multer');
const router = express.Router();

router.post("/signup" , singleUpload, signup)
router.post("/signin" ,signin)
router.post("/saveEmailToGs" , saveEmailToGs)


module.exports = router;