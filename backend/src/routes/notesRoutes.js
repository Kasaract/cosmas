const express = require('express');

const { getNotes, createNote, editNote, deleteNote, summarizeNotes } = require('../controllers/notesController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getNotes);
router.post('/', authenticate, createNote);
router.patch('/:id', authenticate, editNote);
router.delete('/:id', authenticate, deleteNote);
router.get('/summarize', authenticate, summarizeNotes);

module.exports = router;
