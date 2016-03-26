'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Post');

exports.index = function(req, res) {
    res.render('index', {
        user: req.user || null,
        request: req
    });
};

exports.getPosts = function(req, res) {
    Post.find({}, function(err, posts) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.json(posts);
        }
    });
}

exports.addPost = function(req, res) {
    var user = req.user;

    // if (user) {
        Post.findOne({title: req.body.title}, function(err, exists) {
            if (err) {
                res.status(400).send(err);
            }
            else if (exists) {
                res.status(400).send({
                    message: 'A post with that title already exists.'
                })
            }
            else {
                var newPost = new Post(req.body);

                newPost.save(function(err) {
                    if (err) {
                        res.status(400).send(err);
                    }
                });

                res.sendStatus(200);
            }
        })
    // }
    // else {
    //     res.status(400).send({
    //        message: 'Must be logged in to create a post.'
    //     });
    // }
}
