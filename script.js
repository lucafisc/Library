// const fontType = []

const colors = ["#2f1c3b", "#f4cfff", "#e99100", "#dcd529", "#78519a", "#f15621", "#f1d3ab"]
const icons = ["align-justify", "bar-chart-2", "box", "circle", "columns", "crosshair", "droplet", "edit-2", "grid", "hash", "heart", "hexagon", "loader", "minus", "more-vertical", "octagon", "plus", "smile", "square", "target", "triangle"]

//library
let myLibrary = [];
let index = 0;

//book constructor
class Book {
    constructor (title, author, unread) {
        this.title = title
        this.author = author
        this.unread = unread
    }
}

//add to library
function addBookToLibrary() {
    let inputTitle = document.getElementById("title").value;
    let inputAuthor = document.getElementById("author").value;
    let inputUnread = document.getElementById("unread").checked;
    if (inputTitle && inputAuthor) {
        toggleForm();
        myLibrary[index] = new Book(inputTitle,inputAuthor,inputUnread);
        showBook(myLibrary[index]);
        index++;
    }
    else {
        // displayError();
    }
}

const bookGrid = document.getElementById("book-grid")
function showBook(newBook) {
    let newCover = document.createElement('div');
    newCover.classList.add("cover");
    newCover.style.backgroundColor = colors[randomArrayIndex(colors)];
    let bookDetails = document.createElement('div');
    bookDetails.classList.add("book-details");
    do {
    bookDetails.style.color = colors[randomArrayIndex(colors)];}
    while (newCover.style.backgroundColor === bookDetails.style.color);
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

    bookDetails.appendChild(newTitle);
    bookDetails.appendChild(newAuthor);
    newCover.appendChild(bookDetails);
    newCover.appendChild(coverArt);

    bookGrid.insertBefore(newCover, bookGrid.firstElementChild);
    feather.replace();
    
}

//return random number
function randomArrayIndex (array) {
    return Math.floor(Math.random()*array.length);
}


//toggle form
const plusToggle = document.getElementById("plus-toggle");
const minusToggle = document.getElementById("minus-toggle");
const submit = document.getElementById("submit");
const header = document.querySelector("header");
const form = document.querySelector("form");

plusToggle.addEventListener("click", () => {
    toggleForm();
})
minusToggle.addEventListener("click", () => {
    toggleForm();
})
submit.addEventListener("click", () => {
    addBookToLibrary();
})

function toggleForm() {
    plusToggle.classList.toggle("hidden");
    minusToggle.classList.toggle("hidden");
    header.classList.toggle("expand");
    form.classList.toggle("hidden");
}

