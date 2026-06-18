import { getAssignments, saveAssignments } from "./storage.js";
import { updateProgress } from "./progress.js";

let assignments = getAssignments();

export function renderAssignments() {
  const list = document.querySelector("#assignment-list");

  if (!list) return;

  list.innerHTML = "";

  assignments.forEach((assignment, index) => {
    const li = document.createElement("li");

    li.classList.add("assignment-item");

    li.innerHTML = `
      <label class="assignment-label">
        <input
          type="checkbox"
          class="complete-checkbox"
          data-id="${index}"
          ${assignment.completed ? "checked" : ""}
        />

        <span class="${
          assignment.completed ? "completed" : ""
        }">
          ${assignment.title}
        </span>
      </label>

      <button
        data-id="${index}"
        class="delete-btn"
      >
        Delete
      </button>
    `;

    list.appendChild(li);
  });

  attachEvents();

  // Update progress bar and text
  updateProgress();
}

export function addAssignment(task) {
  const newAssignment = {
    title: task,
    completed: false,
    createdAt: Date.now(),
  };

  assignments.push(newAssignment);

  saveAssignments(assignments);

  renderAssignments();
}

function deleteAssignment(index) {
  assignments.splice(index, 1);

  saveAssignments(assignments);

  renderAssignments();
}

function toggleAssignment(index) {
  assignments[index].completed =
    !assignments[index].completed;

  saveAssignments(assignments);

  renderAssignments();
}

function attachEvents() {
  const deleteButtons =
    document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      deleteAssignment(Number(button.dataset.id));
    });
  });

  const checkboxes =
    document.querySelectorAll(".complete-checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      toggleAssignment(Number(checkbox.dataset.id));
    });
  });
}