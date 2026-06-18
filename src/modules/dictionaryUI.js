import { getDefinition } from "../api/dictionary.js";

export function initializeDictionary() {
  const input = document.querySelector("#dictionary-input");
  const button = document.querySelector("#dictionary-btn");
  const result = document.querySelector("#dictionary-result");

  if (!input || !button || !result) return;

  button.addEventListener("click", async () => {
    const word = input.value.trim();

    if (!word) return;

    try {
      result.innerHTML = "<p>Loading...</p>";

      const data = await getDefinition(word);

      const entry = data[0];

      const definition =
        entry.meanings?.[0]?.definitions?.[0]?.definition ||
        "No definition found.";

      const partOfSpeech =
        entry.meanings?.[0]?.partOfSpeech ||
        "Unknown";

      result.innerHTML = `
        <div class="dictionary-card">
          <h3>${entry.word}</h3>

          <p>
            <strong>Part of Speech:</strong>
            ${partOfSpeech}
          </p>

          <p>
            <strong>Definition:</strong>
            ${definition}
          </p>
        </div>
      `;
    } catch (error) {
      result.innerHTML = `
        <p>Sorry, that word could not be found.</p>
      `;
    }
  });
}