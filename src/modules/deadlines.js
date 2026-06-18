import {
  getDeadlines,
  saveDeadlines
} from "./storage.js";

let deadlines = getDeadlines();

export function renderDeadlines() {
  const list =
    document.querySelector("#deadline-list");

  if (!list) return;

  list.innerHTML = "";

  deadlines.forEach((deadline, index) => {
    const li =
      document.createElement("li");

    li.classList.add("assignment-item");

    li.innerHTML = `
      <label class="assignment-label">
        <input
          type="checkbox"
          class="deadline-checkbox"
          data-id="${index}"
          ${deadline.completed ? "checked" : ""}
        />

        <div class="assignment-details">
          <span class="${
            deadline.completed
              ? "completed"
              : ""
          }">
            ${deadline.title}
          </span>

          <small>
            Due:
            ${deadline.dueDate || "No date"}
          </small>
        </div>
      </label>

      <button
        class="delete-deadline"
        data-id="${index}"
      >
        Delete
      </button>
    `;

    list.appendChild(li);
  });

  attachEvents();
}

export function addDeadline(
  title,
  dueDate
) {
  const newDeadline = {
    title,
    dueDate,
    completed: false,
    createdAt: Date.now(),
  };

  deadlines.push(newDeadline);

  saveDeadlines(deadlines);

  renderDeadlines();
}

function toggleDeadline(index) {
  deadlines[index].completed =
    !deadlines[index].completed;

  saveDeadlines(deadlines);

  renderDeadlines();
}

function deleteDeadline(index) {
  deadlines.splice(index, 1);

  saveDeadlines(deadlines);

  renderDeadlines();
}

function attachEvents() {
  const checkboxes =
    document.querySelectorAll(
      ".deadline-checkbox"
    );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener(
      "change",
      () => {
        toggleDeadline(
          Number(
            checkbox.dataset.id
          )
        );
      }
    );
  });

  const deleteButtons =
    document.querySelectorAll(
      ".delete-deadline"
    );

  deleteButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        deleteDeadline(
          Number(
            button.dataset.id
          )
        );
      }
    );
  });
}