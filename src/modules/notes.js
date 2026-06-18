export function initializeNotes() {
  const textarea = document.querySelector("#notes-area");

  textarea.value =
    localStorage.getItem("studyNotes") || "";

  textarea.addEventListener("input", () => {
    localStorage.setItem(
      "studyNotes",
      textarea.value
    );
  });
}