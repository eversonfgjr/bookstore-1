const rp = require('request-promise');
const assert = require('assert');
const {expect} = require('chai');
const sinon = require('sinon');

const BookService = require('./BookService');

describe('BookService.js', () => {
    it('Meu primeiro teste!', () => {
        let a = 1;
        let b = 2;
        let c = a + b;
 
        assert.equal(c, 3);
    });

    it('Requisição válida e título do livro', () => {
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

    it('Requisição válida e título do livro V2', (done) => {
        //GIVEN
        const ISBN = '0345391802';
        const bookService = new BookService();

        //WHEN
        const result = bookService.getBookByIsbn(ISBN);
        
        //THEN
        result.then(book => {
            assert.equal(book.title, 'The hitchhiker\'s guide to the galaxy');
            done();
        });
    });

    it('Válida e retorno com expect', () => {
        //GIVEN
        const ISBN = '0345391802';
        const bookService = new BookService();
        const expected = {
            "authors": "Adams, Douglas",
            "language": "eng",
            "publisher": "Harmony Books",
            "title": "The hitchhiker's guide to the galaxy"
        };

        //WHEN
        const result = bookService.getBookByIsbn(ISBN);
        
        //THEN
        return result.then(book => {
            expect(book).to.be.deep.equal(expected);
        });
    });

    it('Válida e retorno com expect e mock', () => {
        //GIVEN
        const API_KEY = 'SPNROBO0';
        const ISBN = '0345391802';
        const bookService = new BookService();
        const expected = {
            "authors": "Adams, Douglas",
            "language": "eng",
            "publisher": "Harmony Books",
            "title": "The hitchhiker's guide to the galaxy"
        };

        // preparando o stub/mock
        const stubRpGet = sinon.stub(rp, 'get');
        stubRpGet.resolves({
            data: [{
                author_data: [{name:"Adams, Douglas"}],
                language: "eng",
                publisher_name: "Harmony Books",
                title: "The hitchhiker's guide to the galaxy"
            }]
        });

        //WHEN
        const result = bookService.getBookByIsbn(ISBN);
        
        //THEN
        return result.then(book => {
            // podemos melhorar
            expect(
                stubRpGet.calledWith({
                    uri: `http://isbndb.com/api/v2/json/${API_KEY}/book/${ISBN}`,
                    json: true
                })
            ).to.be.equal(true);

            expect(book).to.be.deep.equal(expected);
            // restaurando o método original
            stubRpGet.restore();
        });
    });
 });
 