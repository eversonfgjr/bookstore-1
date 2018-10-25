const assert = require('assert');

describe('BookService.js', () => {
 it('Meu primeiro teste!', () => {
   const a = 1;
   const b = 2;
   const c = a + b;

   assert.equal(c, 3);
 });

 it('Meu segundo teste!', () => {
    const a = 1;
    const b = 2;
    const c = a + b;
 
    assert.equal(c, 3);
  });

  it('Meu terceiro teste!', () => {
    const a = 1;
    const b = 2;
    const c = a + b;
 
    assert.equal(c, 4);
  });
});