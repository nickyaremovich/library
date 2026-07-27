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
addBookToLibrary('The Count of Monte Cristo', 'Alexandre Dumas', 1232, true);
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
renderLibrary(library);


// DOM elements
const addBook = document.getElementById('add-btn');

// event listener to open book form. modal 
addBook.addEventListener('click', () => {
    console.log('Open add book form');
});
