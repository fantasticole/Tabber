var tabcount = 0;
var tabsclosed = 0;
var tracker = {
	'Opened': [],
	'Closed': []
};

// {"Opened":[["4/21/2015","11:26:44 AM"],["4/21/2015","11:26:46 AM"],["4/21/2015","11:26:53 AM"],["4/21/2015","11:26:55 AM"],["4/21/2015","11:26:57 AM"]],"Closed":[["4/21/2015","11:27:06 AM"],["4/21/2015","11:27:07 AM"],["4/21/2015","11:27:07 AM"],["4/21/2015","11:27:08 AM"],["4/21/2015","11:27:08 AM"]]}

// ancestry.forEach(function(person) {
//   byName[person.name] = person;
// });

// var tracker = [];



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
	tracker['Opened'].push([date, time]);
	// tracker.push([date, time]);
	setStorage('tracker', tracker);
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
	tracker['Closed'].push([date, time]);
	setStorage('tracker', tracker);
});