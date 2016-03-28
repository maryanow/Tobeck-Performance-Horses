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
    Post.find({}, null, {sort: {created: 'desc'}}, function(err, posts) {
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

    if (user) {
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

                res.status(200).send(newPost);
            }
        })
    }
    else {
        res.status(400).send({
           message: 'Must be logged in to create a post.'
        });
    }
}

exports.savePost = function(req, res) {
    var user = req.user;

    if (user) {
        Post.findById(req.body._id, function(err, post) {
            if (err) {
                res.status(400).send(err);
            }
            else if (post) {
                post.updated = Date.now();
                post.data = req.body.data;
                post.title = req.body.title;
                post.subtitle = req.body.subtitle;

                post.save(function(err) {
                    if (err) {
                        res.status(400).send({
                            message: 'Could not save post.'
                        });
                    }
                });

                res.sendStatus(200);
            }
            else {
                res.status(400).send({
                    message: 'Could not find the post.'
                })
            }
        });
    }
    else {
        res.status(400).send({
            message: 'Must be logged in to save a post.'
        });
    }
}

exports.removePost = function(req, res) {
    var user = req.user;

    if (user) {
        Post.findByIdAndRemove(req.params.id, function(err, removed) {
            if (err) {
                res.status(400).send(err);
            }
        });

        res.sendStatus(200);
    }
    else {
        res.status(400).send({
            message: 'Must be logged in to remove a post.'
        })
    }
}
