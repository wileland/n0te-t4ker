const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Use built-in middleware for json
app.use(express.static('public')); // Serve static files from the public directory

// GET /notes: Return the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// GET /api/notes: Read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
    const notes = JSON.parse(data);
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving notes.' });
  }
});

// POST /api/notes: Receive a new note to add to the db.json file, and return the new note
app.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuidv4(), // Use UUID for unique identifier
    title: req.body.title,
    text: req.body.text,
  };

  try {
    const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes, null, 2));
    res.json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving the new note.' });
  }
});

// DELETE /api/notes/:id: Remove a note by ID from the db.json file
app.delete('/api/notes/:id', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
    let notes = JSON.parse(data);
    const notesBeforeDeletion = notes.length;
    notes = notes.filter((note) => note.id !== req.params.id);

    if (notes.length === notesBeforeDeletion) {
      return res.status(404).json({ error: 'Note not found.' });
    }

    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes, null, 2));
    res.json({ message: 'Note deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the note.' });
  }
});

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
