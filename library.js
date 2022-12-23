/**
 * @type {Book[]}
 *  */
let library = [];

const modal = document.querySelector(".new-book-section");
const closebtn = document.querySelector(".close");
const openbtn = document.querySelector(".open");

closebtn.addEventListener('click', close);
openbtn.addEventListener('click', open);
window.addEventListener('click', outsideClick);


class Book {
  /**
   * @param {string} title
   * @param {string} author
   * @param {number} pages
   * @param {boolean} read
   *  */
  constructor(title, author, pages, read) {
    this.id = Math.random()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggle() {
    this.read = !this.read;
  }
}

function save(){
    localStorage.setItem('library', JSON.stringify(library));
}

function renderBooks() {
  const content = document.getElementById('content-book');
  content.innerHTML = library.map((book) => `
    <div class="book">
      <dl>
          <dd class="first-dd">${book.title}</dd>                                                                                       
          <dd>Author: ${book.author}</dd>
          <dd>Pages: ${book.pages}</dd>
          <dd><label for="read">Read? </label><input type="checkbox" ${book.read ? 'checked' : ''} onclick="toggleRead(${book.id})"></dd>
          <dd><button onclick="deleteBook(${book.id})">remove</button></dd>
      </dl>
    </div>
  `).join('')
}

function init(){
  const cache = localStorage.getItem('library');
  if(cache){
    library.push(...JSON.parse(cache).map(item => {
      return new Book(item.title, item.author, item.pages, item.read);
    }));
  }
  console.log(library);
  renderBooks()
}



/**
 * @param {number} bookId
*/
function toggleRead(bookId) {
  const book = library.find((book) => book.id === bookId);
  console.log('book', book)
  if (book) {
    book.toggle()
    renderBooks()
  }
}


function addBookToLibrary(event) {
  event.preventDefault();
  const form = document.getElementById("new-book-form");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const read = document.querySelector("[name=read]:checked");

  let read_state = read.value === 'yes';

  const book = new Book(title.value, author.value, Number(pages.value), read_state);

  library.push(book);
  form.reset();
  renderBooks();
  save();
  console.log(library)
}

/**
 * @param {number} id 
 */
function deleteBook(id) {
  library = library.filter(book => book.id !== id);
  renderBooks();
  save();
}

function close(){
  const modal = document.querySelector(".new-book-section");
  modal.style.display = "none";
}
function outsideClick(e){
  if(e.target == modal){
    close();
  }
}
function open(){
  const modal = document.querySelector(".new-book-section");
  modal.style.display = "flex";

}

init();