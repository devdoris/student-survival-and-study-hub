import { searchBooks } from "../api/books.js";

export function initializeBookSearch() {
  const searchBtn = document.querySelector("#search-btn");
  const searchInput = document.querySelector("#book-search");
  const results = document.querySelector("#book-results");

  if (!searchBtn || !searchInput || !results) return;

  searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();

    if (!query) return;

    try {
      results.innerHTML = "<p>Loading books...</p>";

      const books = await searchBooks(query);

      results.innerHTML = "";

      if (!books.length) {
        results.innerHTML =
          "<p>No books found. Try another search.</p>";
        return;
      }

      books.slice(0, 6).forEach((book) => {
        const info = book.volumeInfo || {};

        const card = document.createElement("div");

        card.classList.add("book-card");

        const thumbnail =
          info.imageLinks?.thumbnail ||
          "https://via.placeholder.com/128x180?text=No+Cover";

        const description = info.description
          ? `${info.description.slice(0, 120)}...`
          : "No description available.";

        card.innerHTML = `
          <img
            src="${thumbnail}"
            alt="${info.title || "Book Cover"}"
            class="book-cover"
          />

          <h3>${info.title || "No Title"}</h3>

          <p>
            <strong>Author:</strong>
            ${info.authors?.join(", ") || "Unknown"}
          </p>

          <p>
            <strong>Publisher:</strong>
            ${info.publisher || "Unknown"}
          </p>

          <p>
            <strong>Published:</strong>
            ${info.publishedDate || "Unknown"}
          </p>

          <p>
            <strong>Pages:</strong>
            ${info.pageCount || "N/A"}
          </p>

          <p>${description}</p>

          <a
            href="${info.previewLink || "#"}"
            target="_blank"
          >
            Preview Book
          </a>
        `;

        results.appendChild(card);
      });
    } catch (error) {
      console.error(error);

      results.innerHTML = `
        <p>Unable to load books right now.</p>
      `;
    }
  });
}