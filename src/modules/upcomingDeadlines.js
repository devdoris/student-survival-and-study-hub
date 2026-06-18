import { getAssignments }
from "./storage.js";

export function renderUpcomingDeadlines() {
  const list =
    document.querySelector(
      "#deadline-list"
    );

  if (!list) return;

  const assignments =
    getAssignments();

  const upcoming =
    assignments
      .filter(
        (item) =>
          !item.completed &&
          item.dueDate
      )
      .sort(
        (a, b) =>
          new Date(a.dueDate) -
          new Date(b.dueDate)
      );

  list.innerHTML = "";

  upcoming.forEach((item) => {
    const li =
      document.createElement("li");

    li.classList.add(
      "assignment-item"
    );

    li.innerHTML = `
      <div class="assignment-details">
        <strong>
          ${item.title}
        </strong>

        <small>
          Due:
          ${item.dueDate}
        </small>
      </div>
    `;

    list.appendChild(li);
  });
}