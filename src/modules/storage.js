export function getAssignments() {
  return JSON.parse(localStorage.getItem("assignments")) || [];
}

export function saveAssignments(assignments) {
  localStorage.setItem(
    "assignments",
    JSON.stringify(assignments)
  );
}