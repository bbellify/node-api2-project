// implement your posts router here
const express = require('express')
const Post = require('./posts-model')
const router = express.Router()


// /api/posts

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

router.get(`/:id`, async (req, res) => {
    
})

router.post(`/`, async (req, res) => {
    
})

router.put(`/:id`, async (req, res) => {
    
})

router.delete(`/:id`, async (req, res) => {
    
})

router.get(`/:id/comments`, async (req, res) => {
    
})

module.exports = router