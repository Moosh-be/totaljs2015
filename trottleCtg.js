Function.prototype.throttle = function(duration) {
  var f = this;
  
  var start = new Date.now() ;
  var end = start + duration;

  return function() {
  	var now = new Date.now();
	if (end < now)     
    return f.apply(this, arguments);
  };
};

// Protocole de test

function sayHi() { console.log(Date.now(), "Hiiiii…"); }

console.log(Date.now());
hiCoquine = setInterval(sayHi.throttle(1000), 100);

setTimeout(function() { clearInterval(hiCoquine); }, 10000);