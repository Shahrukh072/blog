const express = require('express');
const { 
    createBlogs,
    getAllBlogs,
    updateBlogs,
    likesBlogs,
    commentsBlogs,
} = require('../controller/blogController');
const { singleUpload, multipleUpload } = require('../middleware/multer');
const { validateJwt } = require("../middleware/auth");
const router = express.Router();

router.post("/createBlogs",validateJwt, singleUpload, createBlogs)
router.get("/getAllBlogs", getAllBlogs)
router.post("/updateBlogs",validateJwt, singleUpload, updateBlogs)
router.post("/likesBlogs", likesBlogs)
router.post("/commentsBlogs", commentsBlogs)

module.exports = router;