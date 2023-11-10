// client.js

let allNotes = []; // This will hold all notes

// Helper function to display errors
function displayError(message) {
  alert(message); // Simple alert for the error message
}

// Helper function to display success messages
function displaySuccess(message) {
  alert(message); // Simple alert for the success message
}

// Helper function to create a delete button for a note
function createDeleteButton(noteId) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteNote(noteId);
  deleteButton.id = `delete-note-${noteId}`; // Assign an ID to the delete button
  return deleteButton;
}

// Helper function to create a DOM element for a note
function createNoteElement(note) {
  const noteElement = document.createElement('div');
  noteElement.classList.add('note');
  noteElement.setAttribute('data-note-id', note.id);
  const noteTitle = document.createElement('span');
  noteTitle.textContent = note.title;
  noteElement.appendChild(noteTitle);
  noteElement.appendChild(createDeleteButton(note.id));
  noteElement.addEventListener('click', () => viewNote(note));
  return noteElement;
}

// Helper function to fetch notes from the server
function fetchNotes() {
  return fetch('/api/notes')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(notesArray => {
      allNotes = notesArray;
      updateNoteList();
    })
    .catch(error => {
      displayError('Error fetching notes. Please try again later.');
    });
}

// Helper function to update the list of notes in the UI
function updateNoteList() {
  const listGroup = document.getElementById('notes-container');
  listGroup.innerHTML = '';
  allNotes.forEach(note => {
    const noteListItem = createNoteElement(note);
    listGroup.appendChild(noteListItem);
  });
}

// Function to view the details of a note
function viewNote(note) {
  const noteTitle = document.getElementById('note-title');
  const noteText = document.getElementById('note-text');
  noteTitle.value = note.title;
  noteText.value = note.text;
  document.getElementById('new-note').style.display = 'block';
  document.getElementById('save-note').style.display = 'none';
}

// Function to prepare the form for a new note
function prepareNewNote() {
  document.getElementById('note-title').value = '';
  document.getElementById('note-text').value = '';
  document.getElementById('new-note').style.display = 'block';
  document.getElementById('save-note').style.display = 'none';
  document.getElementById('note-title').focus();
  toggleButtons();
}

// Function to toggle the visibility of the buttons based on user input
function toggleButtons() {
  const title = document.getElementById('note-title').value.trim();
  const text = document.getElementById('note-text').value.trim();
  const isInputEmpty = title.length === 0 && text.length === 0;
  document.getElementById('save-note').style.display = isInputEmpty ? 'none' : 'block';
  document.getElementById('clear-form').style.display = isInputEmpty ? 'none' : 'block';
  document.getElementById('new-note').style.display = isInputEmpty ? 'block' : 'none';
}

// Function to save a new note
function saveNewNote() {
  const title = document.getElementById('note-title').value.trim();
  const text = document.getElementById('note-text').value.trim();
  if (!title || !text) {
    displayError('Title and text are required to save a note.');
    return;
  }

  const existingNote = allNotes.find(note => note.title === title && note.text === text);
  if (existingNote) {
    displayError('This note already exists.');
    return;
  }

  const newNote = { title, text };
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
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
    displayError('Error saving the new note. Please try again.');
  });
}

// Function to delete a note
function deleteNote(noteId) {
  fetch(`/api/notes/${noteId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(responseData => {
    allNotes = allNotes.filter(note => note.id !== noteId);
    updateNoteList();
    displaySuccess(responseData.message);
  })
  .catch(error => {
    displayError('Error deleting the note. Please try again.');
  });
}


// Function to initialize the page and set up event listeners
function initializePage() {
  document.getElementById('new-note').addEventListener('click', prepareNewNote);
  document.getElementById('save-note').addEventListener('click', saveNewNote);
  toggleButtons(); // Call this initially to set the correct button states
  fetchNotes();
}

// Set up the page once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);
