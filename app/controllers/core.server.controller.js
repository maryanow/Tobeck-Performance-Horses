'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Page = mongoose.model('Page'),
    Metric = mongoose.model('Metric');

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
        Post.findByIdAndRemove(req.params.id, function(err) {
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

exports.getPage = function(req, res) {
    Page.findOne({title: req.params.page}, function(err, page) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.json(page);

            Metric.findOne({page: req.params.page}, function(err, metric) {
                if (err) {
                    console.log('Could not find metric schema.');
                }
                else {
                    metric.visits += 1;
                    metric.save();
                }
            });
        }
    });
}

exports.savePage = function(req, res) {
    var user = req.user;

    if (user) {
        Page.findById(req.body._id, function(err, page) {
            if (err) {
                res.status(400).send(err);
            }
            else if (page) {
                page.data = req.body.data;
                page.title = req.body.title;
                page.header = req.body.header;

                page.save(function(err) {
                    if (err) {
                        res.status(400).send({
                            message: 'Could not save page.'
                        });
                    }
                });

                res.sendStatus(200);
            }
            else {
                res.status(400).send({
                    message: 'Could not find the page.'
                })
            }
        });
    }
    else {
        res.status(400).send({
            message: 'Must be logged in to save a page.'
        });
    }
}

// exports.addPage = function(req, res) {
//     var newPost = new Page(req.body);

//     newPost.save(function(err) {
//         if (err) {
//             res.status(400).send(err);
//         }
//     });

//     res.status(200).send(newPost);
// }

// exports.addMetric = function(req, res) {
//     var newMetric = new Metric(req.body);

//     newMetric.save(function(err) {
//         if (err) {
//             res.status(400).send(err);
//         }
//     });

//     res.sendStatus(200);
// }