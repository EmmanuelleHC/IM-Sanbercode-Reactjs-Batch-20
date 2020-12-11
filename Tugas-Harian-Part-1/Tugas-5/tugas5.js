/*
soal 1
Tulislah sebuah function dengan nama halo() yang mengembalikan nilai “Halo Sanbers!” yang kemudian dapat ditampilkan di console.

*/

/*jawaban  no 1 */
function halo()
{
	return "Halo Sanbers!" ;
}
 
console.log(halo());

/* 
soal 2
Tulislah sebuah function dengan nama kalikan() yang mengembalikan hasil perkalian dua parameter yang di kirim.
*/
/*
    jawaban soal no 2
*/
function kalikan (num1,num2)
{
	return num1*num2;
}
var num1 = 12;
var num2 = 4;
 
var hasilKali = kalikan(num1, num2);
console.log(hasilKali); 

/*
soal 3
Tulislah sebuah function dengan nama introduce() yang memproses paramater yang dikirim menjadi sebuah kalimat perkenalan seperti berikut: “Nama saya [name], umur saya [age] tahun, alamat saya di [address], dan saya punya hobby yaitu [hobby]!”
*/
var name = "John";
var age = 30;
var address = "Jalan belum jadi";
var hobby = "Gaming";

/* 
    Jawaban soal no 3
*/

function introduce(name,age,address,hobby)
{
  return ("Nama saya "+name+", umur saya "+age+" tahun, alamat saya di "+address+", dan saya punya hobby yaitu "+hobby+"!");

}

var perkenalan = introduce(name, age, address, hobby)
console.log(perkenalan) // Menampilkan "Nama saya John, umur saya 30 tahun, alamat saya di jalan belum jadi, dan saya punya hobby yaitu Gaming!" 


/*soal no 4 
ubahlah array di bawah ini menjadi object dengan property nama, jenis kelamin, hobi dan tahun lahir (var arrayDaftarPeserta harus di olah menjadi object)

*/

/* jawaban soal no 4*/

var arrayDaftarPeserta = ["Asep", "laki-laki", "baca buku" , 1992];
var arrayDaftarPeserta = [{nama: "Asep",jenis_kelamin:"laki-laki",hobi: "baca buku",tahun_lahir: 1992}];
console.log(arrayDaftarPeserta);


/* soal no 5 
anda diberikan data-data buah seperti di bawah ini

1.nama: strawberry
  warna: merah
  ada bijinya: tidak
  harga: 9000 
2.nama: jeruk
  warna: oranye
  ada bijinya: ada
  harga: 8000
3.nama: Semangka
  warna: Hijau & Merah
  ada bijinya: ada
  harga: 10000
4.nama: Pisang
  warna: Kuning
  ada bijinya: tidak
  harga: 5000
uraikan data tersebut menjadi array of object dan munculkan data pertama
*/

/* jawaban soal no 5 */
var buah = [{
			 nama: "strawberry",
			 warna:"merah",
			 ada_bijinya: "tidak",
			 harga: 9000
			},
			{
			 nama: "jeruk",
			 warna:"oranye",
			 ada_bijinya: "ada",
			 harga: 8000
			},
			{
			 nama: "semangka",
			 warna:"Hijau & Merah",
			 ada_bijinya: "ada",
			 harga: 10000
			},
			{
			 nama: "Pisang",
			 warna:"Kuning",
			 ada_bijinya: "tidak",
			 harga: 5000
			},
			 ];
console.log(buah[0]);

/*soal no 6

buatlah variable seperti di bawah ini

var dataFilm = []
buatlah fungsi untuk menambahkan dataFilm tersebut yang itemnya object adalah object dengan property nama, durasi , genre, tahun (fungsi menambahkan data film hanya bisa menambah satu data saja jadi jika ingin menambahkan lebih dari satu data panggil fungsi nya lebih dari satu kali). lalu tampilkan dalam output console.log(dataFilm)*/

/* jawaban soal no 6*/
var dataFilm=[];
var element={
	nama:"test",
	durasi:90,
	genre:"thriller",
	tahun:2020
};
function addDataFilm(element){

   return dataFilm.push(element);

}
addDataFilm(element);
addDataFilm(element);
console.log(dataFilm);