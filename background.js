var tabcount = 0;
var tabsclosed = 0;
var tracker = {
	'Opened': {},
	'Closed': {}
};
var opens = [];
var closures = [];

if (getStorage('tracker') !== undefined){
	tracker = getStorage('tracker');
};

if (getStorage('tabcount') !== undefined){
	tabcount = getStorage('tabcount');
};

if (getStorage('tabsclosed') !== undefined){
	tabsclosed = getStorage('tabsclosed');
};

if (getStorage('opens') !== undefined){
	opens = getStorage('opens');
};

if (getStorage('closures') !== undefined){
	closures = getStorage('closures');
};

// function average(obj){
// 	obj['Opened'].forEach()
// 	time.getMilliseconds();
// };


function setStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
};
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
};

chrome.tabs.onCreated.addListener(function(tab){
	tabcount++;
	setStorage('tabcount', tabcount);
	var data = new Date(Date.now()).toLocaleString();
	var date = data.slice(0, data.indexOf(','));
	setStorage('date', date);
	var time = data.slice(data.indexOf(' ') + 1);
	setStorage('tabtime', time);
	if (tracker['Opened'][date] !== undefined){
		tracker['Opened'][date].push(time);
	}
	else {
		tracker['Opened'][date] = [time];
	};
	setStorage('tracker', tracker);
	opens.push(Date.now());
	setStorage('opens', opens);
});

chrome.tabs.onRemoved.addListener(function(tab){
	tabsclosed++;
	setStorage('tabsclosed', tabsclosed);
	var data = new Date(Date.now()).toLocaleString();
	var date = data.slice(0, data.indexOf(','));
	setStorage('cDate', date);
	var time = data.slice(data.indexOf(' ') + 1);
	setStorage('cTabtime', time);
	if (tracker['Closed'][date] !== undefined){
		tracker['Closed'][date].push(time);
	}
	else {
		tracker['Closed'][date] = [time];
	};
	setStorage('tracker', tracker);
	closures.push(Date.now());
	setStorage('closures', closures);
});


