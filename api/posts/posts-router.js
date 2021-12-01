// implement your posts router here
const express = require('express')
const Post = require('./posts-model')
const router = express.Router()


// /api/posts

// gets all posts
router.get(`/`, async (req, res) => {
    try {
        const posts = await Post.find()
        if (!posts) {
            res.status(500).json({
                message: 'No posts to display'
            })
        } else {
            res.status(200).json(posts)
        }

    } catch (err) {
        res.status(500).json({
            message: "The posts information could not be retrieved",
            error: err.message
        })
    }
})

// gets post by id
router.get(`/:id`, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved",
            error: err.message
        })
    }
})

// create new post
router.post(`/`, (req, res) => {

    const { title, contents } = req.body
    
    if (!title || !contents ) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Post.insert(req.body)
            .then(postId => {
                const { id } = postId
            
                Post.findById(id)
                    .then(newPost => {
                        res.status(201).json(newPost)
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: "There was an error while saving the post to the database",
                            error: err.message
                        })
                    })
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the post to the database",
                    error: err.message
                })
            })
    }
})

// edit post by id
router.put(`/:id`, async (req, res) => {
    const updates = req.body
    const id = req.params.id

    if (!updates.title || !updates.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Post.update(id, updates)
            .then(updated => {
                if (!updated) {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist"
                    })
                } else {
                    Post.findById(id)
                    .then(post => {
                        res.status(200).json(post)
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "The post information could not be modified",
                    error: err.message
                })
            })
        }
})

// delete post by id
router.delete(`/:id`, async (req, res) => {
    const { id } = req.params

    const toDelete = await Post.findById(id)
    
    if (!toDelete) {
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    } else {
        const removed = await Post.remove(id)
        if (!removed) {
                res.status(500).json({
                    message: "The post could not be removed",
                })
        } else {
            res.status(200).json(toDelete)    
        }
    }   
})

router.get(`/:id/comments`, async (req, res) => {
    
})

module.exports = router