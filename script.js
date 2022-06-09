// const fontType = []

const colors = [
  "#2f1c3b",
  "#f4cfff",
  "#e99100",
  "#dcd529",
  "#78519a",
  "#f15621",
  "#f1d3ab",
];
const icons = [
  "align-justify",
  "bar-chart-2",
  "box",
  "circle",
  "columns",
  "crosshair",
  "droplet",
  "edit-2",
  "grid",
  "hash",
  "heart",
  "hexagon",
  "loader",
  "minus",
  "more-vertical",
  "octagon",
  "plus",
  "smile",
  "square",
  "target",
  "triangle",
];

//library
let myLibrary = [];

//book constructor
class Book {
  constructor(title, author, unread) {
    this.title = title;
    this.author = author;
    this.unread = unread;
    this.dataIndex = `${this.title} - ${this.author}`;
  }
}

//add to library
function addBookToLibrary() {
  let inputTitle = document.getElementById("title").value;
  let inputAuthor = document.getElementById("author").value;
  let inputUnread = document.getElementById("unread").checked;
  if (inputTitle && inputAuthor) {
    toggleForm();
    let newInput = new Book(inputTitle, inputAuthor, inputUnread);
    myLibrary.push(newInput);
    showBook(myLibrary[myLibrary.length - 1]);
  } else {
    // displayError();
  }
}

const bookGridUnread = document.getElementById("book-grid-unread");
const bookGridRead = document.getElementById("book-grid-read");
function showBook(newBook) {
  let newCover = document.createElement("div");
  newCover.classList.add("cover");
  newCover.style.backgroundColor = colors[randomArrayIndex(colors)];
  let bookDetails = document.createElement("div");
  bookDetails.classList.add("book-details");
  do {
    bookDetails.style.color = colors[randomArrayIndex(colors)];
  } while (newCover.style.backgroundColor === bookDetails.style.color);
  let newTitle = document.createElement("h1");
  newTitle.classList.add("title");
  newTitle.textContent = newBook.title;
  let newAuthor = document.createElement("h2");
  newAuthor.classList.add("author");
  newAuthor.classList.add("hr");
  newAuthor.textContent = newBook.author;
  let coverArt = document.createElement("i");
  coverArt.classList.add("cover-art");
  coverArt.setAttribute("data-feather", icons[randomArrayIndex(icons)]);
  coverArt.style.color = bookDetails.style.color;
  let tools = document.createElement("div");
  tools.classList.add("tools");
  let newEdit = newEditBtn(newBook, bookDetails);
  let newDelete = document.createElement("i");
  newDelete.classList.add("tool");
  newDelete.setAttribute("data-feather", "trash-2");
  newDelete.setAttribute("id", "del");
  newDelete.style.color = bookDetails.style.color;

  bookDetails.appendChild(newTitle);
  bookDetails.appendChild(newAuthor);
  newCover.appendChild(bookDetails);
  newCover.appendChild(coverArt);
  tools.appendChild(newDelete);
  tools.appendChild(newEdit);
  newCover.appendChild(tools);

  newCover.setAttribute("data-index", `${newBook.title} - ${newBook.author}`); //add unique data-index for cover div
  if (newBook.unread) {
    bookGridUnread.insertBefore(newCover, bookGridUnread.firstElementChild);
  } else {
    bookGridRead.insertBefore(newCover, bookGridRead.firstElementChild);
  }
  feather.replace();
}

function newEditBtn(newBook, bookDetails) {
    let newEdit = document.createElement("i");
    newEdit.classList.add("tool");
    if (newBook.unread) {
        newEdit.setAttribute("data-feather", "circle");
    } else {
        newEdit.setAttribute("data-feather", "check-circle");
    }
    newEdit.setAttribute("id", "unread-toggle");
    newEdit.style.color = bookDetails.style.color;
    return newEdit;
}

//return random number
function randomArrayIndex(array) {
  return Math.floor(Math.random() * array.length);
}

//toggle form
const plusToggle = document.getElementById("plus-toggle");
const minusToggle = document.getElementById("minus-toggle");
const submit = document.getElementById("submit");
const header = document.querySelector("header");
const form = document.querySelector("form");

plusToggle.addEventListener("click", () => {
  toggleForm();
});
minusToggle.addEventListener("click", () => {
  toggleForm();
});
submit.addEventListener("click", () => {
  addBookToLibrary();
});

function toggleForm() {
  plusToggle.classList.toggle("hidden");
  minusToggle.classList.toggle("hidden");
  header.classList.toggle("expand");
  form.classList.toggle("hidden");
}

//collapse section button
const collapse = document.getElementById("collapse");
collapse.addEventListener("click", () => {
  collapse.classList.toggle("btn-rotate");
  bookGridUnread.classList.toggle("hidden");
});

//delete book
const content = document.getElementById("content");
content.addEventListener("click", function (e) {
  if (e.target.id === "del") {
    if (confirm("Remove this book?")) {
      let key = e.target.parentNode.parentNode.getAttribute("data-index");
      myLibrary = myLibrary.filter(function (book) {
        if (book.dataIndex !== key) {
          return true; //keeps the book
        }
      });
      console.table(myLibrary);
      e.target.parentNode.parentNode.remove();
    }
  } else {
    return;
  }
});

// toggle read <-> unread
content.addEventListener("click", function (e) {
  if (e.target.id === "unread-toggle") {
    let key = e.target.parentNode.parentNode.getAttribute("data-index");
    let i = myLibrary.map((book) => book.dataIndex).indexOf(key);

    switch (myLibrary[i].unread) {
      case true:
        myLibrary[i].unread = false;
        bookGridRead.appendChild(e.target.parentNode.parentNode);
        break;
      case false:
        myLibrary[i].unread = true;
        bookGridUnread.appendChild(e.target.parentNode.parentNode);
        break;
    }
    
    let newEdit = newEditBtn(myLibrary[i], e.target.parentNode.firstChild);
    e.target.parentNode.appendChild(newEdit);
    e.target.remove();
    feather.replace();
  }
});
