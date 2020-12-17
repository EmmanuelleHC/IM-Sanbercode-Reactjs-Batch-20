/* soal no 1 

Soal 1
Kita mempunyai tumpukan buku untuk dibaca. Setiap buku memiliki waktu yang dibutuhkan untuk menghabiskan buku tersebut. Sudah disediakan function readBooks yang menerima tiga parameter: waktu, buku yang dibaca, dan sebuah callback. Salin code berikut ke dalam sebuah file bernama callback.js .

// di callback.js
function readBooks(time, book, callback ) {
    console.log("saya membaca " + book.name )
    setTimeout(function(){
        let sisaWaktu = 0
        if(time >= book.timeSpent) {
            sisaWaktu = time - book.timeSpent
            console.log("saya sudah membaca " + book.name + ", sisa waktu saya " + sisaWaktu)
            callback(sisaWaktu) //menjalankan function callback
        } else {
            console.log('waktu saya habis')
            callback(time)
        }   
    }, book.timeSpent)
}
 
module.exports = readBooks 
Masih satu folder dengan file callback.js, buatlah sebuah file dengan nama index.js lalu tuliskan code seperti berikut.

// di index.js
var readBooks = require('./callback.js')
 
var books = [
    {name: 'LOTR', timeSpent: 3000}, 
    {name: 'Fidas', timeSpent: 2000}, 
    {name: 'Kalkulus', timeSpent: 4000},
    {name: 'komik', timeSpent: 1000}
]
 
// Tulis code untuk memanggil function readBooks di sini
lanjutkan code pada index.js untuk memanggil function readBooks. Buku yang akan dihabiskan adalah buku-buku di dalam array books. Pertama function readBooks menerima input waktu yang dimiliki yaitu 10000 ms (10 detik) dan books pada indeks ke-0. Setelah mendapatkan callback sisa waktu yang dikirim lewat callback, sisa waktu tersebut dipakai untuk membaca buku pada indeks ke-1. Begitu seterusnya sampai waktu habis atau semua buku sudah terbaca. Untuk melihat output, jalankan file index.js dengan node js :

 $ node index.js
*/

// jawaban no 1
var readBooks = require('./callback.js')
 
var books = [
    {name: 'LOTR', timeSpent: 3000}, 
    {name: 'Fidas', timeSpent: 2000}, 
    {name: 'Kalkulus', timeSpent: 4000},
    {name: 'komik', timeSpent: 1000}
]

const baca=(books,time,i)=>{

readBooks(time ,books[i], function(check) {
    if(check!==0) {
       i++
       baca(books,check,i)  
    } 
}) 
}

baca(books,10000,0)