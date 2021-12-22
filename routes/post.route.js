;(() => {
    "use strict";

    /**
     * Include config amd options
     */
    const authM = require("../middleware/auth.middleware");
    const { check, validationResult } = require("express-validator");

    /**
     * Required necessary options
     */
    const { Router } = require("express");
 
    /**
     * Required models
     */
    const Post = require("../models/post.model");
 
    /**
     * Init router
     */
    const router = Router();

    /**
     * Setting up router post request - create post
     * /api/post/create
     */
    router.put(
        "/create",
        authM,
        [
            check("title", "Required field.").exists(),
            check("context", "Required Field.").exists()
        ],
        async (req, res) => {

        try {
            /**
             * Valid errors
             */
             const errors = validationResult(req);

             if (!errors.isEmpty()) {
                 return res.status(400).json({
                     errors: errors.array(),
                     message: "Fill all mandatory fields."
                 });
             }

             /**
              * get data from request
              */
             const { title, context } = req.body;

              /**
              * New Post & save data
              */
               const newPost = new Post({
                title: title,
                context: context,
                user: req.userDecoded.userId
            });

            await newPost.save();

            res.status(201).json({message: "Post successfully created.", newPost });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });

    /**
     * Setting up router get request - get posts
     * /api/post/get-posts
     */
    router.get("/get-posts", authM, async (req, res) => {
        try {
            const posts = await Post.find({ user: req.userDecoded.userId });

            res.json(posts);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });

    /**
     * Setting up router get request - get post :id
     * /api/post/get-post/:id
     */
    router.get("/get-post/:id", authM, async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);

            res.json(post);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });

     /**
     * export module router
     */
    module.exports = router;
})();