const library = [];

// book constructor

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
    this.id = crypto.randomUUID();
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
/// render library function 
function renderLibrary() {
    libraryContainer.innerHTML = '';

    library.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        //attach crypto ID
        bookCard.dataset.id = book.id;
        //
        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Status:</strong> ${book.read ? 'Read' : 'Not Read Yet'}</p>
    `;
    libraryContainer.appendChild(bookCard);
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