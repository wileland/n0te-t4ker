const express = require('express');
const app = express();
const port = 3000;

let allNotes = []; // This will hold all notes in memory

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public')); // if you have a 'public' directory for static files

// GET route for /api/notes
app.get('/api/notes', (req, res) => {
  res.json(allNotes);
});

// POST route for /api/notes
app.post('/api/notes', (req, res) => {
  const note = req.body;
  note.id = allNotes.length + 1; // simplistic way to assign an ID
  allNotes.push(note);
  res.json(note);
});

// DELETE route for /api/notes/:id
app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  allNotes = allNotes.filter(note => note.id !== noteId);
  res.json({ message: 'Note deleted' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
