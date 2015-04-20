var tabcount = 0;
var tabsclosed = 0;
// var tracker = {
// 	'Open Tabs': 0,
// 	'Closed Tabs': 0
// };

var tracker = [];

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
	// tracker['Open Tabs'] = {}
	tracker.push([date, time]);
	// setStorage('tracker', tracker);
	console.log(tracker);
});

chrome.tabs.onRemoved.addListener(function(tab){
	tabsclosed++;
	setStorage('tabsclosed', tabsclosed);
	var data = new Date(Date.now()).toLocaleString();
	var date = data.slice(0, data.indexOf(','));
	setStorage('cDate', date);
	var time = data.slice(data.indexOf(' ') + 1);
	setStorage('cTabtime', time);
});