/* global describe, it */
const assert = require('assert');
const { expect } = require('chai');
const sinon = require('sinon');
const rp = require('request-promise');
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

  it('Requisição válida e retorno com expect', () => {
    // Given
    const ISBN = '0345391802';
    const expected = {
      authors: 'Adams, Douglas',
      language: 'eng',
      publisher: 'Harmony Books',
      title: 'The hitchhiker\'s guide to the galaxy',
    };

    // When
    const result = BookService.getBookByIsbn(ISBN);

    // Then
    return result.then((book) => {
      expect(book).to.be.deep.equal(expected); // Usando 'expect' do Chai
    });
  });

  it('Válida e retorno com expect e mock', () => {
    // Given
    const ISBN = '0345391802';
    const expected = {
      authors: 'Adams, Douglas',
      language: 'eng',
      publisher: 'Harmony Books',
      title: 'The hitchhiker\'s guide to the galaxy',
    };

    // Preparando o Stub/Mock
    const stubRpGet = sinon.stub(rp, 'get');
    stubRpGet.resolves({
      data: [{
        author_data: [{ name: 'Adams, Douglas' }],
        language: 'eng',
        publisher_name: 'Harmony Books',
        title: 'The hitchhiker\'s guide to the galaxy',
      }],
    });

    // When
    const result = BookService.getBookByIsbn(ISBN);

    // Then
    return result.then((book) => {
      expect(book).to.be.deep.equal(expected);

      // Podemos melhorar!
      const API_KEY = 'SPNROBO0';
      expect(stubRpGet.calledWith({
        uri: `http://isbndb.com/api/v2/json/${API_KEY}/book/${ISBN}`,
        json: true,
      })).to.be.equal(true);

      // Restaurando o método original
      stubRpGet.restore();
    });
  });
});
