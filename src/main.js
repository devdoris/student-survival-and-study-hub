import "./styles/main.css";
import {
  addAssignment,
  renderAssignments,
} from "./modules/assignments.js";
import { initializeNotes } from "./modules/notes.js";
import { initializeBookSearch } from "./modules/booksUI.js";
import { initializeDictionary } from "./modules/dictionaryUI.js";
import { renderUpcomingDeadlines } from "./modules/upcomingDeadlines.js";

document.querySelector("#app").innerHTML = `
<header class="header">
  <h1>Student Survival & Study Hub</h1>
  <p>My all-in-one study companion</p>
</header>

<main class="dashboard">

  <section class="card">
  <h2>Study Statistics</h2>

    <p id="total-assignments">
    Total Assignments: 0
    </p>

    <p id="completed-assignments">
    Completed: 0
    </p>

    <p id="pending-assignments">
    Pending: 0
    </p>
  </section>

  <section class="card progress-card">
    <h2>Study Progress</h2>

    <p id="progress-text">
      0 of 0 assignments completed
    </p>

    <div class="progress-bar">
      <div id="progress-fill"></div>
    </div>
  </section>

  <section class="card">
    <h2>Upcoming Deadlines</h2>

    <ul id="deadline-list"></ul>
  </section>

  <section class="card">
    <h2>Assignment Tracker</h2>

    <div class="assignment-controls">
      <input
        id="assignment-input"
        type="text"
        placeholder="Assignment title"
      />

      <input
        id="assignment-date"
        type="date"
      />

      <button id="add-btn">
        Add
      </button>
    </div>

    <ul id="assignment-list"></ul>
  </section>

  <section class="card">
    <h2>Study Notes</h2>

    <textarea
      id="notes-area"
      placeholder="Write your notes here..."
    ></textarea>
  </section>

  <section class="card">
    <h2>Resource Explorer</h2>

    <div class="search-container">
      <input
        id="book-search"
        type="text"
        placeholder="Search for books..."
      />

      <button id="search-btn">
        Search
      </button>
    </div>

    <div id="book-results"></div>
  </section>

  <section class="card">
    <h2>Dictionary</h2>

    <div class="search-container">
      <input
        id="dictionary-input"
        type="text"
        placeholder="Search a word..."
      />

      <button id="dictionary-btn">
        Define
      </button>
    </div>

    <div id="dictionary-result"></div>
  </section>

</main>
`;

const addBtn =
  document.querySelector("#add-btn");

const input =
  document.querySelector("#assignment-input");

const dateInput =
  document.querySelector("#assignment-date");

addBtn.addEventListener("click", () => {
  const task = input.value.trim();

  if (!task) return;

  addAssignment(
    task,
    dateInput.value
  );

  input.value = "";
  dateInput.value = "";
});

renderAssignments();
renderUpcomingDeadlines();
initializeNotes();
initializeBookSearch();
initializeDictionary();