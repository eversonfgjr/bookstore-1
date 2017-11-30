/* global describe, it */
const assert = require('assert');
const BookService = require('./BookService');

describe('BookService.js', () => {
  it('Meu primeiro teste!', () => {
    const a = 1;
    const b = 2;
    const c = a + b;

    assert.equal(c, 3);
  });

  it('Requisição válida e título do livro', () => {
    // Given
    const ISBN = '0345391802';

    // When
    const result = BookService.getBookByIsbn(ISBN);

    // Then
    return result.then((book) => {
      assert.equal(book.title, 'The hitchhiker\'s guide to the galaxy');
    });
  });

  it('Requisição válida e título do livro com done()', (done) => {
    // Given
    const ISBN = '0345391802';

    // When
    const result = BookService.getBookByIsbn(ISBN);

    // Then
    result.then((book) => {
      assert.equal(book.title, 'The hitchhiker\'s guide to the galaxy');
      done(); // meu teste terminou;
    });
  });
});
