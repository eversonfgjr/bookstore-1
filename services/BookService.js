const rp = require('request-promise');
const API_KEY = 'SPNROBO0';

class BookService {
 getBookByIsbn(isbn) {
   if (!isbn) {
     throw new Error('ISBN deve ser informado!');
   }

   let options = {
     uri: `http://isbndb.com/api/v2/json/${API_KEY}/book/${isbn}`,
     json: true
   };

   return rp.get(options).then((response) => {
     if (response.error) {
       return {};
     }

     let { title, author_data, publisher_name, language } = response.data[0];

     return {
       titulo: title,
       autores: author_data.map(author => author.name).join(';'),
       editora: publisher_name,
       idioma: language,
     };
   });
 }
}

module.exports = BookService;