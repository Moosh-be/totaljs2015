'use script';
var a, b;
if (a === b) {
	console.log(a);
}

function Car(maxSpeed) {
	this.maxSpeed = maxSpeed;
}

var ferrari = new Car(240);
var twingo = new Car(100);
console.log(ferrari, twingo);

//console.log(bmw);

if (a === null) {
	console.log('check null or undefined easily');
}