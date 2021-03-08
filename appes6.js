// jshint esversion:6

class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.Isbn = isbn;
	}
}

class UI {
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

	clearInput() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}

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

	removeBook(target) {
		// if click target contain "delete" class then it target its parent and remove it
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
		}
	}
}

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
		ui.showAlert('Book Added !', 'success'); // show success message
		ui.clearInput(); // Clear the input data
	}

	e.preventDefault();
});

// * event to remove the book from the list
document.querySelector('#book-list').addEventListener('click', (e) => {
	const ui = new UI();
	ui.removeBook(e.target);
	ui.showAlert('Book Successfully removed !', 'success');
	e.preventDefault();
});
