// Function to update the DOM with fetched notes
function fetchNotes() {
  fetch('/api/notes')
    .then(response => response.json())
    .then(notesArray => {
      const notesContainer = document.getElementById('notes-container');
      notesContainer.innerHTML = ''; // Clear existing notes
      notesArray.forEach(note => {
        const noteElement = createNoteElement(note);
        notesContainer.appendChild(noteElement);
      });
    })
    .catch(error => console.error('Error fetching notes:', error));
}

// Handler for adding a note via form submission
function addNoteHandler(event) {
  event.preventDefault();
  const titleInput = document.getElementById('note-title');
  const textInput = document.getElementById('note-text');
  
  const note = {
    title: titleInput.value,
    text: textInput.value,
  };
  
  addNote(note);
}

// Function to send a POST request to add a note
function addNote(note) {
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note)
  })
    .then(response => response.json())
    .then(addedNote => {
      document.getElementById('notes-container').appendChild(createNoteElement(addedNote));
      // Optionally clear the input fields
      document.getElementById('note-title').value = '';
      document.getElementById('note-text').value = '';
    })
    .catch(error => console.error('Error adding note:', error));
}

// Function to send a DELETE request to remove a note
function deleteNote(noteId) {
  fetch(`/api/notes/${noteId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(() => {
      // Remove the note element from the page
      const noteElement = document.getElementById(`note-${noteId}`);
      if (noteElement) noteElement.remove();
    })
    .catch(error => console.error('Error deleting note:', error));
}

// Utility function to create the HTML for a note
function createNoteElement(note) {
  const noteDiv = document.createElement('div');
  noteDiv.id = `note-${note.id}`;
  noteDiv.className = 'note';

  const titleElement = document.createElement('h2');
  titleElement.textContent = note.title;
  noteDiv.appendChild(titleElement);

  const textElement = document.createElement('p');
  textElement.textContent = note.text;
  noteDiv.appendChild(textElement);

  // Add delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteNote(note.id); // Changed to call deleteNote directly
  noteDiv.appendChild(deleteButton);

  return noteDiv;
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  fetchNotes(); // Fetch notes when the page loads
});

// Event listener for form submission
document.getElementById('note-form').addEventListener('submit', addNoteHandler);

// Event listeners for button clicks
document.getElementById('save-note').addEventListener('click', addNoteHandler);
document.getElementById('new-note').addEventListener('click', () => {
  document.getElementById('note-title').value = '';
  document.getElementById('note-text').value = '';
});
document.getElementById('clear-form').addEventListener('click', () => {
  document.getElementById('note-title').value = '';
  document.getElementById('note-text').value = '';
});
