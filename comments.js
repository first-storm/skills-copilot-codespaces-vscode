// Create web server
// Import express
const express = require('express');
const router = express.Router();
const comments = require('../data/comments');

// GET /comments
router.get('/', (req, res) => {
  res.json(comments);
});

// GET /comments/:id
router.get('/:id', (req, res) => {
  const found = comments.some(comment => comment.id === parseInt(req.params.id));
  
  if (found) {
    res.json(comments.filter(comment => comment.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
  }
});

// POST /comments
router.post('/', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    name: req.body.name,
    email: req.body.email,
    body: req.body.body
  };

  if (!newComment.name || !newComment.email || !newComment.body) {
    return res.status(400).json({ msg: 'Please include a name, email and body' });
  }

  comments.push(newComment);
  res.json(comments);
});

// PUT /comments/:id
router.put('/:id', (req, res) => {
  const found = comments.some(comment => comment.id === parseInt(req.params.id));

  if (found) {
    const updComment = req.body;
    comments.forEach(comment => {
      if (comment.id === parseInt(req.params.id)) {
        comment.name = updComment.name ? updComment.name : comment.name;
        comment.email = updComment.email ? updComment.email : comment.email;
        comment.body = updComment.body ? updComment.body : comment.body;

        res.json({ msg: 'Comment updated', comment });
      }
    });
  } else {
    res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
  }
});

// DELETE /comments/:id
router.delete('/:id', (req, res) => {
  const found = comments.some(comment => comment.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Comment deleted',
      comments: comments.filter(comment => comment.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
  }