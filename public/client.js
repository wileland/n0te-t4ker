let allNotes = []; // This will hold all notes

// Helper function to create a delete button
function createDeleteButton(noteId) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteNote(noteId);
  deleteButton.id = `delete-note-${noteId}`; // Assign an ID to the delete button
  return deleteButton;
}

// This function should create and return a DOM element for a note
function createNoteElement(note) {
  const noteElement = document.createElement('div');
  noteElement.classList.add('note');
  noteElement.setAttribute('data-note-id', note.id);
  const noteTitle = document.createElement('span');
  noteTitle.textContent = note.title;
  noteElement.appendChild(noteTitle);
  noteElement.appendChild(createDeleteButton(note.id));
  return noteElement;
}

// This function should handle viewing of a note
function viewNote(note) {
  const noteTitle = document.getElementById('note-title');
  const noteText = document.getElementById('note-text');

  noteTitle.textContent = note.title;
  noteText.textContent = note.text;

  document.getElementById('new-note').style.display = 'block';
  document.getElementById('save-note').style.display = 'none';
}

function displayError(message) {
  // Ideally, this should be more user-friendly in a production environment
  alert(message);
}
function fetchNotes() {
  return fetch('/api/notes')
    .then(response => {
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(notesArray => {
      allNotes = notesArray;
      updateNoteList();
      return notesArray;
    })
    .catch(error => {
      console.error('Error fetching notes:', error);
      displayError('Error fetching notes. Please try again later.');
    });
}



function updateNoteList() {
  const listGroup = document.getElementById('list-group');
  listGroup.innerHTML = '';
  allNotes.forEach(note => {
    const noteListItem = createNoteElement(note);
    listGroup.appendChild(noteListItem);
  });
}

function prepareNewNote() {
  // Clear the input fields
  document.getElementById('note-title').value = '';
  document.getElementById('note-text').value = '';
  // Hide the save button and show the new note button
  document.getElementById('new-note').style.display = 'block';
  document.getElementById('save-note').style.display = 'none';
  // Focus on the title input
  document.getElementById('note-title').focus();
}

function saveNewNote() {
  const title = document.getElementById('note-title').value.trim();
  const text = document.getElementById('note-text').value.trim();

  if (!title || !text) {
    displayError('Title and text are required to save a note.');
    return;
  }

  const newNote = { title, text };
  fetch('/api/notes', {
    method: 'POST', // Matches the server-side route for creating a new note
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  })
    .then(response => {
      if (!response.ok) {
        throw Error('Network response was not ok');
      }
      return response.json();
    })
    .then(savedNote => {
      allNotes.push(savedNote);
      updateNoteList();
      prepareNewNote();
      displaySuccess('Note saved successfully.');
    })
    .catch(error => {
      console.error('Error saving the new note:', error);
      displayError('Error saving the new note. Please try again.');
    });
}

function deleteNote(noteId) {
  fetch(`/api/notes/${noteId}`, {
    method: 'DELETE', // Matches the server-side route for deleting a note
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(responseData => {
      console.log('Note deleted:', noteId);
      // After deleting, update the list of notes
      updateNoteList();
      displaySuccess(responseData.message); // Display the success message from the server
    })
    .catch(error => {
      console.error('Error deleting the note:', error);
      displayError('Error deleting the note. Please try again.');
    });
}

function displaySuccess(message) {
  // Display success message
  console.log(message);
  // Additional UI feedback logic can be added here
}

function initializePage() {
  document.getElementById('new-note').addEventListener('click', prepareNewNote);
  document.getElementById('save-note').addEventListener('click', saveNewNote);
  fetchNotes();
}

document.addEventListener('DOMContentLoaded', initializePage);
