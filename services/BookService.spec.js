const assert = require('assert');

const BookService = require('./BookService');

describe('BookService.js', () => {
    it('Meu primeiro teste!', () => {
        let a = 1;
        let b = 2;
        let c = a + b;
 
        assert.equal(c, 3);
    });

    it('Requisição válida', () => {
        //GIVEN
        const ISBN = '0345391802';
        const bookService = new BookService();

        //WHEN
        const result = bookService.getBookByIsbn(ISBN);
        
        //THEN
        return result.then(book => {
            assert.equal(book.title, 'The hitchhiker\'s guide to the galaxy');
        });
    }); 
 });
 