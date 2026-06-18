import { getAssignments } from "./storage.js";

export function updateProgress() {
  const assignments = getAssignments();

  const completed =
    assignments.filter(task => task.completed).length;

  const total = assignments.length;

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const progressText =
    document.querySelector("#progress-text");

  const progressFill =
    document.querySelector("#progress-fill");

  if (!progressText || !progressFill) return;

  progressText.textContent =
    `${completed} of ${total} assignments completed`;

  progressFill.style.width =
    `${percentage}%`;
}