const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
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
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };

  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while reading notes.' });
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while saving the new note.' });
      }
      res.json(newNote);
    });
  });
});

// DELETE /api/notes/:id: Remove a note by ID from the db.json file
app.delete('/api/notes/:id', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while reading notes.' });
    }

    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== req.params.id);

    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while deleting the note.' });
      }
      res.json({ message: 'Note deleted successfully.' });
    });
  });
});

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
