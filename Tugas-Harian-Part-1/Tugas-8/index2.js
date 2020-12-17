var readBooksPromise = require('./promise.js')
 
var books = [
    {name: 'LOTR', timeSpent: 3000}, 
    {name: 'Fidas', timeSpent: 2000}, 
    {name: 'Kalkulus', timeSpent: 4000}
]
 
function readBooks(books,time,i) {
    readBooksPromise(time,books[i])
        .then(function (fulfilled) {
            if(fulfilled!==0)
            {
            	i++
            	readBooks(books,fulfilled,i)
            }
        })
        .catch(function (error) {
            // oops, mom don't buy it
            console.log('saya sudah selesai membaca ');
         // output: 'mom is not happy'
        });
}

readBooks(books,10000,0)