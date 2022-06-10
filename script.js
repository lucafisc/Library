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

//load default books
function onLoad() {

//default books
myLibrary.push(
new Book ("Made in Tokyo", "Atelier Bow-Wow", false),
new Book ("Capitalist Realism", "Mark Fisher", true),
new Book ("Britney Spears: An Unauthorized Biography", "Alix Strauss", true),
new Book ("Drive My Car", "Haruki Murakami", true),
new Book ("My Year of Rest and Relaxation", "Otessa Moshfegh", false),
new Book ("Oryx and Crake", "Margaret Atwood", false)
)

for (let i=0; i<myLibrary.length; i++)
{
showBook(myLibrary[i])}
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

//combine all functions to create new book
function showBook(newBook) {
  let newCover = newCoverDiv();
  let bookDetails = newBookDetailsDiv(newCover);
  let newTitle = newTitleText(newBook);
  let newAuthor = newAuthorText(newBook);
  let coverArt = newCoverArt(bookDetails);
  let tools = newToolsDiv();
  let newEdit = newEditBtn(newBook, bookDetails);
  let newDelete = newDeleteBtn(bookDetails);

  //append all new elements
  bookDetails.appendChild(newTitle);
  bookDetails.appendChild(newAuthor);
  newCover.appendChild(bookDetails);
  newCover.appendChild(coverArt);
  tools.appendChild(newDelete);
  tools.appendChild(newEdit);
  newCover.appendChild(tools);

  //add unique data-index for cover div
  newCover.setAttribute("data-index", `${newBook.title} - ${newBook.author}`); 
  
  //insert in corresponding section
  if (newBook.unread) {
    bookGridUnread.insertBefore(newCover, bookGridUnread.firstElementChild);
    bookGridUnread.style.maxHeight = "fit-content";

  } else {
    bookGridRead.insertBefore(newCover, bookGridRead.firstElementChild);
    bookGridRead.style.maxHeight = "fit-content";
  }
  feather.replace();
}

//create new cover div with random color
function newCoverDiv() {
    let newCover = document.createElement("div");
    newCover.classList.add("cover");
    newCover.style.backgroundColor = colors[randomArrayIndex(colors)];
    return newCover;
}

//create new book details div with different color from cover
function newBookDetailsDiv(newCover) {
    let bookDetails = document.createElement("div");
    bookDetails.classList.add("book-details");
    do {
        bookDetails.style.color = colors[randomArrayIndex(colors)];
    } while (newCover.style.backgroundColor === bookDetails.style.color);
    return bookDetails;
}

//create new title text element
function newTitleText(newBook) {
    let newTitle = document.createElement("h1");
    newTitle.classList.add("title");
    newTitle.textContent = newBook.title;
    return newTitle;
}

//create new author text element
function newAuthorText(newBook) {
    let newAuthor = document.createElement("h2");
    newAuthor.classList.add("author");
    newAuthor.classList.add("hr");
    newAuthor.textContent = newBook.author;
    return newAuthor;
}

//create tools div
function newToolsDiv() {
    let tools = document.createElement("div");
    tools.classList.add("tools");
    return tools;
}

//create cover art
function newCoverArt(bookDetails) {
    let coverArt = document.createElement("i");
    coverArt.classList.add("cover-art");
    coverArt.setAttribute("data-feather", icons[randomArrayIndex(icons)]);
    coverArt.style.color = bookDetails.style.color;
    return coverArt;
}

//create delete btn
function newDeleteBtn(bookDetails) {
    let newDelete = document.createElement("i");
    newDelete.classList.add("tool");
    newDelete.setAttribute("data-feather", "trash-2");
    newDelete.setAttribute("id", "del");
    newDelete.style.color = bookDetails.style.color;
    return newDelete;
}

//create edit btn
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



//collapse section button
let viewport = window.matchMedia("(max-width: 680px)")
const accSection = document.getElementsByClassName("accordion");
let x;
for (x=0; x<accSection.length; x++) {
    accSection[x].addEventListener("click", function() {
        this.classList.toggle("collapse");
        let section = this.nextElementSibling;
        console.log(section)
        if (section.style.maxHeight) {
            section.style.maxHeight = null;
        }
        else {
            // on this case scroll.Height hides part of the form in desktop view
            if (section.classList.contains("form") && !viewport.matches)  {
                section.style.maxHeight = "30px"; 
            }
            else {
            section.style.maxHeight = section.scrollHeight + "px";
            }
        }
    });
}


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
        bookGridRead.appendChild(e.target.parentNode.parentNode);
        bookGridRead.style.maxHeight = "fit-content";
        myLibrary[i].unread = false;
        break;
      case false:
        bookGridUnread.appendChild(e.target.parentNode.parentNode);
        bookGridUnread.style.maxHeight = "fit-content";
        myLibrary[i].unread = true;
        break;
    }
    
    //replace edit button
    let newEdit = newEditBtn(myLibrary[i], e.target.parentNode.firstChild);
    e.target.parentNode.appendChild(newEdit);
    e.target.remove();
    feather.replace();
  }
});


//todo
//prevent duplicated books
//grid in mobile
//hover menu on icons


document.onload = onLoad()