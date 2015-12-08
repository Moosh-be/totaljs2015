Function.prototype.throttle = function(delay) {
  var f = this;
  var last = 0;

  return function() {
    var current = Date.now();
    var diff = current - last;

    if ( diff > delay ) {
    	last = current;
    	return f.apply(this, arguments);
	}
  };
};

// Protocole de test

function sayHi() { console.log(Date.now(), "Hiiiii…"); }

console.log(Date.now());
hiCoquine = setInterval(sayHi.throttle(1000), 100);

setTimeout(function() { clearInterval(hiCoquine); }, 10000);