const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export async function searchBooks(query) {
  const url =
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}&maxResults=10&key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Books API Error: ${response.status}`
    );
  }

  const data = await response.json();

  return data.items || [];
}