# Note Taker Application

## Overview

The Note Taker is a web-based application that allows users to create, view, and delete notes, providing a simple yet powerful interface for managing personal or work-related notes. It leverages an Express.js backend, showcasing RESTful API design patterns for handling note-related CRUD operations with a JSON file serving as a persistent storage mechanism.

## Features

- **Create Notes**: Users can add new notes with a title and body text.
- **View Notes**: Users can view the list of all existing notes.
- **Delete Notes**: Users have the ability to delete notes that are no longer needed.

## Technical Journey

The development trek of the Note Taker application commenced with the scaffolding of an Express.js server, ensuring a robust backend architecture. Over the subsequent iterations, the following milestones marked our progress:

- **API Design**: We meticulously designed RESTful endpoints, facilitating the quintessential operations of reading, creating, and deleting notes, thereby adhering to best practices in API development.
- **Persistent Storage**: By employing a JSON file as our database, we enabled the persistence of notes across sessions, simulating a real-world database environment within the constraints of a file system.
- **Frontend Integration**: The server seamlessly serves static files, ensuring a responsive and intuitive user interface. The client-side JavaScript was honed to provide asynchronous interactions with the backend, delivering a smooth user experience.
- **Error Handling**: Robust error handling was integrated to provide stability and helpful feedback to users, anticipating and mitigating potential operational aberrations.
- **UUID Generation**: Unique identifiers for each note were generated using UUIDs, ensuring data integrity and avoiding collisions.

Throughout the development journey, the focus remained steadfast on writing clean, maintainable code. By employing modular routes and middleware, the application is structured to facilitate easy updates and scalability.

## API Endpoints

The application exposes the following endpoints:

- `GET /api/notes`: Retrieves all notes.
- `POST /api/notes`: Creates a new note.
- `DELETE /api/notes/:id`: Deletes a note by ID.

## Testing

API endpoints have been rigorously tested using Insomnia to ensure they meet functionality and reliability standards. End-to-end testing scenarios encompass the creation, retrieval, and deletion of notes, as well as error states and edge cases.

## Getting Started

Follow these steps to get started with the Note Taker application:

I. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/note-taker.git

II. Install dependencies:

III. Navigate to the cloned repository directory and run:
npm install

IV. Start the application:

V. npm start

VI. Access the application:
Open your browser and visit http://localhost:3000.


License
Distributed under the MIT License. See LICENSE for more information.

Contact
Your Name - @your_twitter - email@example.com

Project Link: https://github.com/your-username/note-taker

User Story & Acceptance Criteria

User Story
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete

Acceptance Criteria
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page
WHEN I click on the Save button
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column and a "New Note" button appears in the navigation
WHEN I click on the "New Note" button in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears

Project Structure

NOTE T4ke
├── db
│   └── db.json
├── node_modules
├── public
│   ├── client.js
│   ├── index.html
│   ├── index.js
│   ├── notes.html
│   └── styles.css
├── Routes
│   ├── API routes
│   └── HTML routes
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js