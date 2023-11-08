const express = require('express');
const fs = require('fs');
const path = require('path');

const notes = [];

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while retrieving notes.');
    }

    try {
      const parsedNotes = JSON.parse(data);
      notes.push(...parsedNotes);
      res.json(notes);
    } catch (error) {
      console.error(error);
      return res.status(500).send('An error occurred while parsing notes data.');
    }
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    text: req.body.text,
  };

  notes.push(newNote);

  fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while saving notes.');
    }

    res.json(newNote);
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);

  const updatedNotes = notes.filter((note) => note.id !== noteId);

  fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(updatedNotes), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while deleting a note.');
    }

    notes.length = 0;
    notes.push(...updatedNotes);

    res.json({ message: 'Note deleted successfully.' });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});