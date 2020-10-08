// book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// ui constructor
function Ui() {}

Ui.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  // create tr elemenet
  const row = document.createElement("tr");
  // insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.aurhor}</td>
  <td>${book.isbn}</td>
  <td><a href ="#" class="delete">X<a></td>`;

  list.appendChild(row);
};
// show alert
Ui.prototype.showAlert = function (message, className) {
  // create div
  const div = document.createElement("div");
  // add classname
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector(".container");
  // get form
  const form = document.querySelector("#book-form");
  // insert alert
  container.insertBefore(div, form);
  // timout after 3s
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};
// delete book
Ui.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};
// clear fields

Ui.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
// event listeners for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // get form values
  const title = document.getElementById("title").value,
    aurhor = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // initiate book
  const book = new Book(title, aurhor, isbn);

  // initiate UI
  const ui = new Ui();

  // valudate
  if (title === "" || aurhor === "" || isbn === "") {
    // error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // add book to list
    ui.addBookToList(book);
    // show success
    ui.showAlert("Book Added!", "success");

    // clear fields

    ui.clearFields();
  }

  e.preventDefault();
});
// event listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  // instantiate ui
  const ui = new Ui();
  // delete book
  ui.deleteBook(e.target);
  // show message
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});
