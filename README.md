# n0te t4ker

## Overview

The n0te t4ker is a streamlined, web-based application that empowers users to effortlessly create, view, and manage notes. This tool is ideal for both personal and professional note management, offering a clean and intuitive user interface, underpinned by a solid Express.js backend.

## Features:

- **Create Notes**: Users can effortlessly add new notes, complete with titles and content.
- **View Notes**: All notes are conveniently displayed for easy access and review.
- **Delete Notes**: Outdated or unnecessary notes can be removed, maintaining a clutter-free note space.

## Technical Journey

The development journey began with establishing a stable Express.js server, forming what became the backbone of my application's backend. I then committed to writing maintainable, scalable code, and ensuring seamless frontend integration while attempting some OOP best-practices. Here are some of the key milestones achieved:

- **RESTful API Design**: Our endpoints handle CRUD operations with finesse, offering a blueprint for RESTful practices.
- **Persistent Storage**: Employing a JSON file, we simulated database interactions to retain notes between sessions.
- **Frontend Ingenuity**: Static files served through Express.js guarantee a responsive UI, while client-side JavaScript promises asynchronous backend communication.
- **Robust Error Handling**: Anticipating and resolving errors, we've crafted a stable platform for users.
- **UUIDs for Uniqueness**: Every note gets a unique identifier, safeguarding data integrity.

## Built With

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML): Structures web content.
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS): Styles and lays out web pages.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): Manages client-side scripting for user interaction.
- [Bootstrap](https://getbootstrap.com/): Enables responsive design and style components.
- [Express.js](https://expressjs.com/): Serves as the web application framework.
- [UUID](https://www.npmjs.com/package/uuid): Generates unique identifiers for notes.
- [Insomnia](https://insomnia.rest/): Assists in API endpoint testing.
- [Heroku](https://www.heroku.com/): Hosts and runs the web application.
- [Node.js](https://nodejs.org/): Executes server-side code.

## API Endpoints

- `GET /api/notes`: Retrieve all notes.
- `POST /api/notes`: Create a new note.
- `DELETE /api/notes/:id`: Delete a note by ID.

## How to Engage with n0te t4ker?

To get started with the n0te t4ker app, follow these steps:

1. **Clone the Repository**
   git clone https://github.com/your-username/note-taker.
   Install Dependencies:
   Navigate to your cloned repository and run:
   
   
2. **Install Dependencies & Other Technologies**
   npm install
   Initialize the Application
   More coming soon!
   
   
3. **NPM Start & Access the Application**
   Launch a web browser and navigate to http://localhost:3000 to begin managing your notes.
   

4. **User Story & Acceptance Criteria**

    I. User Story:
    As a small business owner, I want to write and save
    notes so I can organize my thoughts and keep track of
    tasks I need to complete.

II. Acceptance Criteria:
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

       III. **![Mock-Up](https://) (.GIF)**  *-Link coming soon!*

       IV. **n0te t4ker: File Directory**

├── node_modules
├── public
│ ├── *index.html*
│ ├── *notes.html*
│ ├── styles.css
│ └── **client.js**
├── Routes
│ ├── **apiRoutes.js**
│ └── **htmlRoutes.js**
├── .gitignore
├── db.json
├── package-lock.json
├── package.json
├── README.md
└── **server.js**
        -Javascript files- bolded
        -HTML files- italicised
 _______________________________________________________________

V. License
Distributed under the MIT License. See LICENSE for more information.

VI. Contact
~William Haynes - @your_twitter - wileland7@gmail.com

  VII. Project Link: 
     https://github.com/your-username/note-taker


VIII. Contributions-
    Coming soon - We're excited to see how the community will help n0te t4ker evolve.

IX. Technical Note (code):

 The source code for the application is housed in the server.js file, with front-end logic within the public/client.js. Middleware in the JS, and Routes are broken down into two folders dividing the tasks between HTML & API routes. The other real trick was getting the two ends (client and server)to shake hands and work together (even though, getting the notes to work was like whack-a-mole). As mentioned prior, Insomnia was used to failsafe that aspect of the challenge, and I only wish I'd used it sooner.

    Furthermore, the app's code ongoingly uses node,
    and the entire thing is deployed on Heroku. On a 
    *side-note* (ha-ha), this project is open-source and encourages community engagement. One love.


**X. BONUS**

n0te t4ker can delete!

Remember to replace placeholders like `@your_twitter` and the GitHub URL with your ac
