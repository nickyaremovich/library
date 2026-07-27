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





// DOM elements
const addBook = document.getElementById('add-book');
// event listener to open book form. modal or side dialog?
addBook.addEventListener('click', openForm());