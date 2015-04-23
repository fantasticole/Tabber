var tabcount = 0;
var tabsclosed = 0;
var tracker = {
	'Opened': {},
	'Closed': {}
};

if (getStorage('tracker') !== undefined){
	tracker = getStorage('tracker');
};

if (getStorage('tabcount') !== undefined){
	tabcount = getStorage('tabcount');
};

if (getStorage('tabsclosed') !== undefined){
	tabsclosed = getStorage('tabsclosed');
};


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
});


