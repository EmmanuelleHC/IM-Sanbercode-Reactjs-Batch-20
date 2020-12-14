/*
Soal 1
buatlah fungsi menggunakan arrow function luas lingkaran dan keliling lingkaran dengan arrow function lalu gunakan let atau const di dalam soal ini
*/

/*jawaban soal no 1 */
const luasLingkaran = (r) => {
 const pi=3.14;
 return pi*r*r;
}
const kelilingLingkaran = (r) => {
 let pi=3.14;
 return 2*pi*r;
}

// panggil Function
luasLingkaran(10);

kelilingLingkaran(10);


/*
Soal 2
buatlah variable seperti di bawah ini:

let kalimat = ""
buatlah fungsi menambahkan kata di kalimat dan gunakan penambahan kata tersebut dengan template literal, berikut ini kata kata yang mesti di tambahkan.

saya
adalah
seorang
frontend
developer
perlu di ingat ini fungsi menambahkan perkata, jadi fungsi ini perlu di panggil beberapa kali untuk menghasil kan kalimat (kalo dengan kasus di atas berarti di panggil 5 kali)
*/

/*Jawaban soal no 2 */
let kalimat = "";
let hasil='';

const penambahKalimat = (kalimat) => {

	hasil += ' '+`${kalimat}`;
	console.log(hasil)

}
penambahKalimat('saya')
penambahKalimat('adalah')
penambahKalimat('seorang')
penambahKalimat('frontend')
penambahKalimat('developer')


/*
Soal 3
return dalam fungsi di bawah ini masih menggunakan object literal dalam ES5, ubahlah menjadi bentuk yang lebih sederhana di ES6.

const newFunction = function literal(firstName, lastName){
  return {
    firstName: firstName,
    lastName: lastName,
    fullName: function(){
      console.log(firstName + " " + lastName)
    }
  }
}
 
//Driver Code 
newFunction("William", "Imoh").fullName()


*/

/*jawban soal no 3 */

const newFunction = function literal(firstName, lastName){
  return {
    firstName: firstName,
    lastName: lastName,
    fullName: function(){
      const theString=`${firstName} ${lastName}`
      console.log(theString)
    }

  }
}
 
//Driver Code 
newFunction("William", "Imoh").fullName() 
/* 
Soal 4
Diberikan sebuah objek sebagai berikut:

const newObject = {
  firstName: "Harry",
  lastName: "Potter Holt",
  destination: "Hogwarts React Conf",
  occupation: "Deve-wizard Avocado",
  spell: "Vimulus Renderus!!!"
}
dalam ES5 untuk mendapatkan semua nilai dari object tersebut kita harus tampung satu per satu:

const firstName = newObject.firstName;
const lastName = newObject.lastName;
const destination = newObject.destination;
const occupation = newObject.occupation;
Gunakan metode destructuring dalam ES6 untuk mendapatkan semua nilai dalam object dengan lebih singkat (1 line saja)

// Driver code
console.log(firstName, lastName, destination, occupation)

/* jawban soal no 4 */


let newObject =[ "Harry", "Potter Holt", "Hogwarts React Conf", "Deve-wizard Avocado", "Vimulus Renderus!!!"]

const [firstName, lastName,destination,occupation,spell] = newObject

console.log(firstName, lastName, destination, occupation)
/*

soal 5
Kombinasikan dua array berikut menggunakan array spreading ES6

const west = ["Will", "Chris", "Sam", "Holly"]
const east = ["Gill", "Brian", "Noel", "Maggie"]
const combined = west.concat(east)
//Driver Code
console.log(combined)


*/
/*jawban soal no 5 */
const west = ["Will", "Chris", "Sam", "Holly"]
const east = ["Gill", "Brian", "Noel", "Maggie"]
 
let combined = [...west, ...east]
console.log(combined)