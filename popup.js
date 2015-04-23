
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
};
var newTabCount = document.getElementById('opened');
newTabCount.innerText = "Opened: " + getStorage('tabcount');

var tabOpen = document.getElementById('oDate');
tabOpen.innerText = getStorage('date');

var tabTime = document.getElementById('oTime');
tabTime.innerText = getStorage('tabtime');

var newCount = document.getElementById('closed');
newCount.innerText = "Closed: " + getStorage('tabsclosed');

var tabClose = document.getElementById('closeDate');
tabClose.innerText = getStorage('cDate');

var tabCloseTime = document.getElementById('cTime');
tabCloseTime.innerText = getStorage('cTabtime');

document.getElementById('down').addEventListener('click', function(){
	debugger;
	base64 = window.btoa(localStorage.getItem('tracker'));
	var url = 'data:application/octet-stream;base64,' + base64;
	chrome.downloads.download({
	    url: url,
	    filename: 'tab_activity.json'
	});
});

document.getElementById('tsv').addEventListener('click', function(){
	debugger;
	base64 = window.btoa(localStorage.getItem('opens'));
	var url = 'data:application/octet-stream;base64,' + base64;
	chrome.downloads.download({
	    url: url,
	    filename: 'hourly.tsv'
	});
});


