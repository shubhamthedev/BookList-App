//Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI constructor
function UI() {

}
UI.prototype.addBookToList = function (book) {
    //get tbody
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //inner cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td> 
    <td><a href="#" class="delete">X</a></td> 

    `;
    //append child
    list.appendChild(row);
}
//delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function (msg, className) {
    //create div
    const div = document.createElement('div');
    //add class name
    div.className = `alert ${className}`;
    //add text node
    div.appendChild(document.createTextNode(msg));
    //insert into dom
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);
    //timeout 3s
    setTimeout(function () { document.querySelector('.alert').remove(); }, 2000);
}
//Event listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
    //Get Form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    //instantiate a book
    const book = new Book(title, author, isbn);
    //instantiate ui
    const ui = new UI();
    //Validate 
    if (title === '' || author === '' || isbn === '') {
        //Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        //Add book to list
        ui.addBookToList(book);
        //validate book added
        ui.showAlert('Successfully added the book to the list', 'success')
        //clear inputs
        ui.clearFields();
    }


    e.preventDefault();
});
//Event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    //delete book
    ui.deleteBook(e.target);
    //alert
    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
});