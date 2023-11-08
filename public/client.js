let allNotes = []; // This will hold all notes

// Modify fetchNotes to update allNotes and also return the fetched notes
function fetchNotes() {
  return fetch('/api/notes')
    .then(response => response.json())
    .then(notesArray => {
      allNotes = notesArray; // Update the global allNotes array
      const notesContainer = document.getElementById('notes-container');
      notesContainer.innerHTML = ''; // Clear existing notes
      notesArray.forEach(note => {
        const noteElement = createNoteElement(note);
        notesContainer.appendChild(noteElement);
      });
      return notesArray; // Return the fetched notes
    })
    .catch(error => {
      console.error('Error fetching notes:', error);
      return []; // Return an empty array in case of error
    });
}

// Update the event listener to use the updated logic
document.getElementById('list-group').addEventListener('click', event => {
  const noteId = event.target.getAttribute('data-note-id');
  if (noteId) {
    const note = allNotes.find(note => note.id.toString() === noteId);
    if (note) {
      viewNote(note);
    }
  }
});

// Now updateNoteList doesn't need to handle the notesArray anymore
function updateNoteList() {
  fetchNotes().then(() => { // We don't need to receive notesArray here
    // Update the list-group with the notes
    const listGroup = document.getElementById('list-group');
    listGroup.innerHTML = ''; // Clear current list
    allNotes.forEach(note => {
      const noteListItem = document.createElement('li');
      noteListItem.textContent = note.title;
      noteListItem.setAttribute('data-note-id', note.id);
      // Here we shouldn't call viewNote directly, since the note object might not have all the data
      noteListItem.addEventListener('click', function() {
        const note = allNotes.find(n => n.id.toString() === this.getAttribute('data-note-id'));
        if (note) {
          viewNote(note);
        }
      });
      listGroup.appendChild(noteListItem);
    });
  });
}

// Call updateNoteList on page load or when needed
function initializePage() {
  updateNoteList();
  prepareNewNote(); // Prepare the form for a new note
}

// Initialize the page when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);
