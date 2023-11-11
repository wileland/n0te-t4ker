// client.js

let allNotes = []; // This will hold all notes

// Helper function to display messages in the UI instead of alert
function displayMessage(message, isError = false) {
  const messageContainer = document.getElementById('message-container');
  messageContainer.textContent = message;
  messageContainer.className = isError ? 'error' : 'success'; // Add classes for styling
  // Hide the message after 3 seconds
  setTimeout(() => {
    messageContainer.textContent = '';
    messageContainer.className = '';
  }, 3000);
}

// Helper function to create a delete button for a note
function createDeleteButton(noteId) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-btn'; // Assign class for styling
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
      console.error('Error fetching notes:', error);
      displayMessage('Error fetching notes. Please try again later.', true);
    });
}

// Helper function to update the list of notes in the UI
function updateNoteList() {
  const listGroup = document.getElementById('notes-container');
  listGroup.innerHTML = ''; // Clear the list before updating
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
  document.getElementById('save-note').style.display = 'none';
  document.getElementById('new-note').style.display = 'block';
}

// Function to prepare the form for a new note
function prepareNewNote() {
  document.getElementById('note-title').value = '';
  document.getElementById('note-text').value = '';
  document.getElementById('save-note').style.display = 'block';
  document.getElementById('new-note').style.display = 'none';
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
  document.getElementById('new-note').style.display = !isInputEmpty ? 'none' : 'block';
}

// Function to save a new note
function saveNewNote(event) {
  event.preventDefault(); // Prevent default form submission behavior
  const title = document.getElementById('note-title').value.trim();
  const text = document.getElementById('note-text').value.trim();

  if (!title || !text) {
    displayMessage('Title and text are required to save a note.', true);
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
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(savedNote => {
    allNotes.push(savedNote);
    updateNoteList();
    prepareNewNote();
    displayMessage('Note saved successfully.');
  })
  .catch(error => {
    console.error('Error saving the new note:', error);
    displayMessage('Error saving the new note. Please try again.', true);
  });
}

// Function to delete a note
function deleteNote(noteId) {
  fetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(() => {
    allNotes = allNotes.filter(note => note.id !== noteId);
    updateNoteList();
    displayMessage('Note deleted successfully.');
  })
  .catch(error => {
    console.error('Error deleting the note:', error);
    displayMessage('Error deleting the note. Please try again.', true);
  });
}

// Initialize the page and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('note-form').addEventListener('submit', saveNewNote);
  document.getElementById('clear-form').addEventListener('click', prepareNewNote);
  document.getElementById('note-title').addEventListener('input', toggleButtons);
  document.getElementById('note-text').addEventListener('input', toggleButtons);
  fetchNotes(); // Load notes when the page is initialized
});
