const express = require('express');
const fs = require('fs'); // Corrected module name
const path = require('path'); // Correctly require the path module
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

// GET /notes: Return the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html')); // Corrected file name
});

// GET /api/notes: Read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => { // Corrected path
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while retrieving notes.');
    }

    res.json(JSON.parse(data)); // Directly parse and send the data
  });
});

// POST /api/notes: Receive a new note, add it to the db.json file, and return the new note
app.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuidv4(), // UUID for unique identification
    title: req.body.title,
    text: req.body.text,
  };

  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => { // Read existing notes
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while reading notes.');
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), (err) => { // Write the updated notes back to db.json
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while saving the new note.');
      }

      res.json(newNote);
    });
  });
});

// DELETE /api/notes/:id: Receive a query parameter containing the ID of a note to delete
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id; // No need to parse as int, use the string directly

  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while reading notes.');
    }

    let notes = JSON.parse(data);
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(updatedNotes), (err) => { // Write the updated notes back to db.json
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while deleting the note.');
      }

      res.json({ message: 'Note deleted successfully.' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
