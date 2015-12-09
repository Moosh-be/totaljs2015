Function.prototype.throttle = function(duration) {
	var f = this,
		end = 0;

	return function() {
		var now = Date.now();
		if (end < now) {
			end = now + duration;
			return f.apply(this, arguments);
		}
		return;
	};
};

// Protocole de test



function sayHi() {
	console.log(Date.now(), "Hiiiii…");
}

console.log(Date.now());
hiCoquine = setInterval(sayHi.throttle(1000), 100);

setTimeout(function() {
	clearInterval(hiCoquine);
}, 10000);