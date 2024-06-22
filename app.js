document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById('bookForm');
    const unreadBooksContainer = document.getElementById('unreadBooks');
    const readBooksContainer = document.getElementById('readBooks');

    const getBooksFromStorage = () => JSON.parse(localStorage.getItem('books')) || [];

    const saveBooksToStorage = (books) => localStorage.setItem('books', JSON.stringify(books));

    const renderBooks = () => {
        const books = getBooksFromStorage();
        unreadBooksContainer.innerHTML = '';
        readBooksContainer.innerHTML = '';

        books.forEach(book => {
            const bookElement = createBookElement(book);
            if (book.isRead) {
                readBooksContainer.appendChild(bookElement);
            } else {
                unreadBooksContainer.appendChild(bookElement);
            }
        });
    };

    const createBookElement = (book) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');

        const bookInfo = document.createElement('span');
        const bookCover = document.createElement('img');

        
        const defaultImagePath = 'asset/img/filosofi teras.jpeg';

     
        bookCover.src = defaultImagePath;

        const bookDetails = document.createElement('span');
        bookDetails.textContent = `${book.title} by ${book.author} (${book.year})`;

        bookInfo.appendChild(bookCover);
        bookInfo.appendChild(bookDetails);

        bookItem.appendChild(bookInfo);

        const buttonsContainer = document.createElement('div');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            editBook(book);
        });
        buttonsContainer.appendChild(editButton);

        const toggleButton = document.createElement('button');
        toggleButton.textContent = book.isRead ? 'Belum Di Baca' : 'Sudah Di Baca';
        toggleButton.classList.add('toggle-button');
        toggleButton.addEventListener('click', () => {
            toggleBookReadStatus(book.id);
        });
        buttonsContainer.appendChild(toggleButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            deleteBook(book.id);
        });
        buttonsContainer.appendChild(deleteButton);

        bookItem.appendChild(buttonsContainer);

        return bookItem;
    };

    const toggleBookReadStatus = (id) => {
        const books = getBooksFromStorage();
        const updatedBooks = books.map(book => {
            if (book.id === id) {
                book.isRead = !book.isRead;
            }
            return book;
        });
        saveBooksToStorage(updatedBooks);
        renderBooks();
    };

    const deleteBook = (id) => {
        const books = getBooksFromStorage();
        const updatedBooks = books.filter(book => book.id !== id);
        saveBooksToStorage(updatedBooks);
        renderBooks();
    };

    const editBook = (book) => {
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('year').value = book.year;
        deleteBook(book.id);
    };

    const addBook = (title, author, year) => {
        const books = getBooksFromStorage();
        const newBook = {
            id: Date.now(),
            title,
            author,
            year,
            isRead: false
        };
        books.push(newBook);
        saveBooksToStorage(books);
        renderBooks();
    };

    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;
        addBook(title, author, year);
        bookForm.reset();
    });

    renderBooks();
});
