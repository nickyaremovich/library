const library = [];

// book constructor

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
    this.id = crypto.randomUUID();
};
// protoype function to toggle if read

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};
//helper function 
function toggleBookRead(id){
    const book = library.find((book) => book.id === id);

    if (book) {
        book.toggleRead();
    };
};
// add book to library function 
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    library.push(book);
};

// hardcode a couple books
addBookToLibrary('The Count of Monte Cristo', 'Alexandre Dumas', 1312, true);
addBookToLibrary('East of Eden', 'John Steinbeck', 607, true);

// log to see library 
console.log(library);
const libraryContainer = document.querySelector('#library-container');

function renderLibrary() {
    libraryContainer.textContent = '';

    library.forEach((book) => {
        const card = document.createElement('article');
        const title = document.createElement('h4');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const read = document.createElement('p');
        const actions = document.createElement('div');
        const toggleRead = document.createElement('button');
        const removeBtn = document.createElement('button');

        card.classList.add('book-card');
        author.classList.add('book-detail');
        pages.classList.add('book-detail');
        read.classList.add('book-status', book.read ? 'is-read' : 'is-unread');
        actions.classList.add('book-actions');

        title.textContent = book.title;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Pages: ${book.pages}`;
        read.textContent = book.read ? "Completed" : "Not read";
        toggleRead.textContent = "Toggle read";
        removeBtn.textContent = "Delete";

        toggleRead.dataset.id = book.id;
        toggleRead.classList.add('toggle-read');
        removeBtn.dataset.id = book.id;
        removeBtn.classList.add('remove-btn');

        actions.append(toggleRead, removeBtn);
        card.append(
            title,
            author,
            pages,
            read,
            actions
        );
        libraryContainer.append(card);
    });

};


// DOM elements - library container
const dialog = document.getElementById('addBookModal');
const bookForm = document.getElementById('book-form');
const addBook = document.getElementById('add-btn');
const submit = document.getElementById('submit');
//DOM Inputs
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');
//buttons
const cancelButton = document.getElementById('cancel');

// event listener to open book form. modal 
addBook.addEventListener('click', () => {
    dialog.showModal();
});
cancelButton.addEventListener('click', () => {
    dialog.close();
    bookForm.reset();
});
// hook up submit btn
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = Number(pagesInput.value);
    const read = readInput.checked;
    // call addBookToLibrary
    addBookToLibrary(title, author, pages, read);
    renderLibrary();

    bookForm.reset();
    dialog.close();
});

/// remove book 
function removeBook(id) {
    const index = library.findIndex((book) => book.id === id);

    if (index !== -1) {
        library.splice(index, 1);
    };
        
};

libraryContainer.addEventListener('click', (event) => {
    const id = event.target.dataset.id;

    if (!id) return;
    if (event.target.classList.contains('remove-btn')) {
        removeBook(id);
        renderLibrary();
    };
    if (event.target.classList.contains('toggle-read')) {
        toggleBookRead(id);
        renderLibrary();
    }
});
