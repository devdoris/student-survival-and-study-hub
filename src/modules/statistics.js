import { getAssignments } from "./storage.js";

export function updateStatistics() {
  const assignments = getAssignments();

  const total = assignments.length;

  const completed =
    assignments.filter(
      (assignment) => assignment.completed
    ).length;

  const pending = total - completed;

  document.querySelector(
    "#total-assignments"
  ).textContent =
    `Total Assignments: ${total}`;

  document.querySelector(
    "#completed-assignments"
  ).textContent =
    `Completed: ${completed}`;

  document.querySelector(
    "#pending-assignments"
  ).textContent =
    `Pending: ${pending}`;
}