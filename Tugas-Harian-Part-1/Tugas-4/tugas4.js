/*soal 1
Pada tugas ini kamu diminta untuk melakukan looping dalam JavaScript dengan menggunakan syntax while. Untuk membuat tantangan ini lebih menarik, kamu juga diminta untuk membuat suatu looping yang menghitung maju dan menghitung mundur. Jangan lupa tampilkan di console juga judul ‘LOOPING PERTAMA’ dan ‘LOOPING KEDUA’.”

Output:

LOOPING PERTAMA
2 - I love coding
4 - I love coding
6 - I love coding
8 - I love coding
10 - I love coding
12 - I love coding
14 - I love coding
16 - I love coding
18 - I love coding
20 - I love coding
LOOPING KEDUA
20 - I will become a frontend developer
18 - I will become a frontend developer                                                                              
16 - I will become a frontend developer
14 - I will become a frontend developer
12 - I will become a frontend developer
10 - I will become a frontend developer
8 - I will become a frontend developer
6 - I will become a frontend developer
4 - I will become a frontend developer
2 - I will become a frontend developer
*/
/* jawaban soal no 1 */
for (var i=2;i<=20;i+=2){
	console.log(i+'-'+' '+'I love coding');

}
for (var x=20;x>=2;x-=2){
	console.log(x+'-'+' '+'I will become a frontend developer');
}

/*
soal 2
Pada tugas ini kamu diminta untuk melakukan looping dalam JavaScript dengan menggunakan syntax for. Untuk membuat tantangan ini lebih menarik, kamu juga diminta untuk memenuhi syarat tertentu yaitu:

SYARAT:
A. Jika angka ganjil maka tampilkan Santai
B. Jika angka genap maka tampilkan Berkualitas
C. Jika angka yang sedang ditampilkan adalah kelipatan 3 DAN angka ganjil maka tampilkan I Love Coding.

Output:

1 - Santai
2 - Berkualitas
3 - I Love Coding 
4 - Berkualitas
5 - Santai
6 - Berkualitas
7 - Santai
8 - Berkualitas
9 - I Love Coding
10 - Berkualitas
11 - Santai
12 - Berkualitas
13 - Santai
14 - Berkualitas
15 - I Love Coding
16 - Berkualitas
17 - Santai
18 - Berkualitas
19 - Santai
20 - Berkualitas

/*Jawaban soal no 2*/
for(var x=1;x<=20;x++){
	if(x%2==1 && x%3!=0){
		console.log(x+'-'+' Santai');
	}

	if(x%2==0){
		console.log(x+'-'+' Berkualitas');
	}
	if(x%2==1 && x%3==0)
	{
		console.log(x+'-'+' I Love Coding');
	}
}
/*
soal 3
Kali ini kamu diminta untuk menampilkan sebuah segitiga dengan tanda pagar (#) dengan dimensi tinggi 7 dan alas 7. Looping boleh menggunakan syntax apa pun (while, for, do while).

Output:

#
##
###
####
#####
######
#######
*/
/*jawban no 3*/
var i='#';
for(var y=1;y<=7;y++)

{
	
	console.log(i);
	i+='#';
	

}
/*
soal 4
buatlah variabel seperti di bawah ini

var kalimat="saya sangat senang belajar javascript"
ubah kalimat diatas menjadi array dengan output seperti di bawah ini

["saya", "sangat", "senang", "belajar", "javascript"]

*/

/*jawaban no 4*/
var kalimat="saya sangat senang belajar javascript";
var wordArray = kalimat.split(' ');

console.log(wordArray);

/*
soal 5
buatlah variabel seperti di bawah ini

var daftarBuah = ["2. Apel", "5. Jeruk", "3. Anggur", "4. Semangka", "1. Mangga"];
urutkan array di atas dan tampilkan data seperti output di bawah ini (dengan menggunakan loop):

1. Mangga
2. Apel
3. Anggur
4. Semangka
5. Jeruk

*/
/*Jawaban no 5*/
var daftarBuah = ["2. Apel", "5. Jeruk", "3. Anggur", "4. Semangka", "1. Mangga"];
daftarBuah.sort();
for(var i=0;i<daftarBuah.length;i++){
	console.log(daftarBuah[i]);
}