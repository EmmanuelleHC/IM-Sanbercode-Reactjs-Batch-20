/* soal no 1
soal 1
Terdapat sebuah class Animal yang memiliki sebuah constructor name, default property legs= 4 dan cold_blooded = false.

Release 0

Buatlah class Animal yang menerima satu parameter constructor berupa name. Secara default class Animal akan memiliki property yaitu legs (jumlah kaki) yang bernilai 4 dan cold_blooded bernilai false.

Gunakan method getter untuk mengakses property di dalam class

class Animal {
    // Code class di sini
}
 
var sheep = new Animal("shaun");
 
console.log(sheep.name) // "shaun"
console.log(sheep.legs) // 4
console.log(sheep.cold_blooded) // false
Release 1

Buatlah class Frog dan class Ape yang merupakan inheritance dari class Animal. Perhatikan bahwa Ape (Kera) merupakan hewan berkaki 2, hingga dia tidak menurunkan sifat jumlah kaki 4 dari class Animal. class Ape memiliki function yell() yang menampilkan “Auooo” dan class Frog memiliki function jump() yang akan menampilkan “hop hop”.

// Code class Ape dan class Frog di sini
 
var sungokong = new Ape("kera sakti")
sungokong.yell() // "Auooo"
 
var kodok = new Frog("buduk")
kodok.jump() // "hop hop" 


*/
/*jawban soal no 1 */
class Animal {
    constructor(name) {
        this.name = name
        this.legs = 4
        this.cold_blooded = false
    }
    get name() {
    	return this._name;
  	}
  	set name(x) {
    	this._name = x;

  	}
  	get legs() {
    	return this._legs;
  	}
  	set legs(legs) {
    	this._legs = legs;

  	}
  	get cold_blooded() {
    	return this._cold_blooded;
  	}
  	set cold_blooded(cold_blooded) {
    	this._cold_blooded = cold_blooded;

  	}


}

class Ape extends Animal {
  constructor(name) {
    super(name);
    this.legs = 2;
  }
  yell() {
    return 'Auooo';
  }
}
class Frog extends Animal {
  constructor(name) {
    super(name);
    this.legs = 4;
  }
  jump() {
    return 'hop hop';
  }
}

	sheep = new Animal("shaun")
	console.log(sheep.name) // "shaun"
	console.log(sheep.legs) // 4
	console.log(sheep.cold_blooded) // false

 	sungokong = new Ape("kera sakti")
 	console.log(sungokong.name) // "shaun"
	console.log(sungokong.legs) // 4
	console.log(sungokong.cold_blooded)
	console.log(sungokong.yell()) // "Auooo"

	var kodok = new Frog("buduk")
	console.log(kodok.jump()) // "hop hop" 
 /* soal no 2 
soal 2
Terdapat sebuah class dengan nama Clock yang ditulis seperti penulisan pada function, ubahlah fungsi tersebut menjadi class dan pastikan fungsi tersebut tetap berjalan dengan baik. Jalankan fungsi di terminal/console Anda untuk melihat hasilnya. (tekan tombol Ctrl + C pada terminal untuk menghentikan method clock.start())

Hint: Fokus soal ini hanya pada kegiatan mengubah struktur function Clock menjadi class. Jangan lupa menambahkan constructor di dalam class, dan ubah function di dalam Clock menjadi method pada class.

function Clock({ template }) {
  
  var timer;

  function render() {
    var date = new Date();

    var hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    var mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    var secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    var output = template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  this.stop = function() {
    clearInterval(timer);
  };

  this.start = function() {
    render();
    timer = setInterval(render, 1000);
  };

}

var clock = new Clock({template: 'h:m:s'});
clock.start(); 
function di atas diubah menjadi struktur class seperti berikut:

class Clock {
    // Code di sini
}

var clock = new Clock({template: 'h:m:s'});
clock.start();  
 */

/* jawban soal no 2 */

class Clock {
   
    timer;
 constructor({template}) {
    
    this.template= template;
  }
   
  render = () => {
    var date = new Date();

    var hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    var mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    var secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    var output = this.template
    			.replace('h', hours)
    			.replace('m', mins)
    			.replace('s', secs);

    console.log(output);
  };

  stop = () =>{
    clearInterval(timer);
  };

  start = () => {
    this.render();
    this._timer = setInterval(this.render, 1000);
  };

}
//{template: 'h:m:s'}
var clock = new Clock({template: 'h:m:s'});
clock.start(); 