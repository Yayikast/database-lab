let book1 = {
  title: "1984",
  author: "George Orwell",
  year: 1949,
};

let book2 = {
  title: "Dune",
  author: "Frank Herbert",
  year: 1965,
};

let book3 = {
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  year: 1937,
};

let books = [book1, book2, book3];

console.log("Number of books:", books.length);
console.log("Second book:", books[1].title);

for (let book of books) {
  console.log(`${book.title} by ${book.author}`);
}
