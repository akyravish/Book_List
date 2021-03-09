// jshint esversion:6
// * Create book class
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}
//  * Create UI class
class UI {
	// Add the book to the list by creating element
	addBookToList(book) {
		const list = document.querySelector('#book-list'); // select the list element
		const row = document.createElement('tr'); // create the row element
		row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">x</a></td>
        `;
		list.appendChild(row); // append the row to the list
	}
	// It clear all the input values
	clearInput() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}
	// It show alert messages
	showAlert(msg, elmClass) {
		const div = document.createElement('div'); // create a div element
		div.className = `remove ${elmClass}`; // creating two class for div element
		div.appendChild(document.createTextNode(msg)); // creating a text node for div element

		const parent = document.querySelector('.container'); // get the parent element
		const form = document.querySelector('#book-form'); // get the element before which you want to show the message
		parent.insertBefore(div, form);

		// remove the message after 3 seconds
		setTimeout(() => {
			document.querySelector('.remove').remove();
		}, 3000);
	}
	// It remove the book from the list
	removeBook(target) {
		// if click target contain "delete" class then it target its parent and remove it
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
		}
	}
}

// * Create store class to add the content in local storage
class Store {
	// It Get the book array from the LS, if there is nothing in local storage,
	// then it put the value of book to the empty array
	static getBook() {
		let book;
		if (localStorage.getItem('books') === null) {
			book = []; // Put the value of books to empty array
		} else {
			book = JSON.parse(localStorage.getItem('books'));
		}
		return book;
	}
	// It show the book that are present in the LS
	static displayItem() {
		const books = Store.getBook();

		books.forEach((x) => {
			const ui = new UI();
			ui.addBookToList(x); // Create element by getting the item from LS
		});
	}
	// It store the book to the local storage
	static storeItem(book) {
		const books = Store.getBook();
		books.push(book); // add item to books array
		localStorage.setItem('books', JSON.stringify(books)); // set item in lS
	}
	// It delete the book from the local storage
	static deleteItem(isbn) {
		const books = Store.getBook();
		books.forEach((x, index) => {
			// Delete the item from lS by getting the index
			if (x.isbn === isbn) {
				books.splice(index, 1);
			}
		});
		localStorage.setItem('books', JSON.stringify(books));
	}
}

// * Call the display item event
document.addEventListener('DOMContentLoaded', Store.displayItem);

// * Adding event to the form to get the value of input
document.querySelector('#book-form').addEventListener('submit', (e) => {
	// Get the input value

	const title = document.querySelector('#title').value,
		author = document.querySelector('#author').value,
		isbn = document.querySelector('#isbn').value;

	const book = new Book(title, author, isbn);
	const ui = new UI();

	// check validation
	if (title === '' || author === '' || isbn === '') {
		ui.showAlert('Please fill the info correctly.', 'error'); // show error message
	} else {
		ui.addBookToList(book); // Add book to the list
		Store.storeItem(book); // Store item in lS
		ui.showAlert('Book Added !', 'success'); // show success message
		ui.clearInput(); // Clear the input data
	}

	e.preventDefault();
});

// * event to remove the book from the list
document.querySelector('#book-list').addEventListener('click', (e) => {
	const ui = new UI();
	ui.removeBook(e.target); // remove the listed book from the front end
	Store.deleteItem(
		e.target.parentElement.parentElement.children[2].textContent
	); // select the isbn content
	ui.showAlert('Book Successfully removed !', 'success');
	e.preventDefault();
});
