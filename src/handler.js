const { nanoid } = require('nanoid');
const books = require('./books');

// Tambahan: Validasi tipe data
const isNotValidDataType = (name, author, summary, publisher, year, pageCount, readPage, reading) => typeof name !== 'string'
    || (author !== undefined && typeof author !== 'string')
    || (summary !== undefined && typeof summary !== 'string')
    || (publisher !== undefined && typeof publisher !== 'string')
    || (year !== undefined && typeof year !== 'number')
    || (pageCount !== undefined && typeof pageCount !== 'number')
    || (readPage !== undefined && typeof readPage !== 'number')
    || (reading !== undefined && typeof reading !== 'boolean');

// Kriteria 3 : API dapat menyimpan buku
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading = false,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Tambahan: Validasi tipe data
  if (isNotValidDataType(name, author, summary, publisher, year, pageCount, readPage, reading)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku.Terdapat Tipe data yang tidak sesuai',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

// Kriteria 4 : API dapat menampilkan seluruh buku & Menerapkan Saran
const getAllBooksHandler = (request, h) => {
  const {
    name,
    reading,
    finished,
    year,
    author,
  } = request.query;

  let filterBook = books;

  if (name !== undefined) {
    filterBook = filterBook.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    const isReading = reading === '1';
    filterBook = filterBook.filter((book) => book.reading === isReading);
  }

  if (finished !== undefined) {
    const isFinished = finished === '1';
    filterBook = filterBook.filter((book) => book.finished === isFinished);
  }

  // Tambahan: Jika Ada Query Year atau Author
  const queryYear = year !== undefined;
  const queryAuthor = author !== undefined;

  if (queryYear) {
    filterBook = filterBook.filter((book) => book.year === parseInt(year, 10));
  }

  if (queryAuthor) {
    filterBook = filterBook.filter((book) => book.author.toLowerCase().includes(author.toLowerCase()));
  }

  const mappedBooks = filterBook.map((book) => {
    const response = {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };
    if (queryYear) {
      response.year = book.year;
    }
    if (queryAuthor) {
      response.author = book.author;
    }
    return response;
  });

  const response = h.response({
    status: 'success',
    message: `Berhasil mendapatkan buku, jumlah buku yang di dapatkan ${mappedBooks.length}`,
    data: {
      books: mappedBooks,
    },
  });
  response.code(200);
  return response;
};

// Kriteria 5 : API dapat menampilkan detail buku
const getDetailBookHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((n) => n.id === bookId);

  if (!book) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      book,
    },
  });
  response.code(200);
  return response;
};

// Kriteria 6 : API dapat mengubah data buku
const editBookHandler = (request, h) => {
  const { bookId } = request.params;
  const updatedAt = new Date().toISOString();

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Tambahan: Validasi tipe data
  if (isNotValidDataType(name, author, summary, publisher, year, pageCount, readPage, reading)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal mengedit buku.Terdapat Tipe data yang tidak sesuai',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const updatedBook = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };

  books[bookIndex] = updatedBook;

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};

// Kriteria 7 : API dapat menghapus buku
const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;

  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  books.splice(bookIndex, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getDetailBookHandler,
  editBookHandler,
  deleteBookHandler,
};
