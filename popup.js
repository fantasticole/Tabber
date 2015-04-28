
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

function hourAvg(arr){
	var tabs = {
		0: {'O': [], 'C': []}, 1: {'O': [], 'C': []}, 2: {'O': [], 'C': []}, 3: {'O': [], 'C': []}, 4: {'O': [], 'C': []}, 5: {'O': [], 'C': []}, 6: {'O': [], 'C': []}, 7: {'O': [], 'C': []}, 8: {'O': [], 'C': []}, 9: {'O': [], 'C': []}, 10: {'O': [], 'C': []}, 11: {'O': [], 'C': []}, 12: {'O': [], 'C': []}, 13: {'O': [], 'C': []}, 14: {'O': [], 'C': []}, 15: {'O': [], 'C': []}, 16: {'O': [], 'C': []}, 17: {'O': [], 'C': []}, 18: {'O': [], 'C': []}, 19: {'O': [], 'C': []}, 20: {'O': [], 'C': []}, 21: {'O': [], 'C': []}, 22: {'O': [], 'C': []}, 23: {'O': [], 'C': []}
	}
	var days = [];
	arr.forEach(function(obj){
		var time = new Date(obj.Date).toLocaleString('en-US')
		var newTime = time.slice(time.indexOf(' ') + 1);
		var date = time.slice(0, time.indexOf(',') );
		var hour = parseInt(newTime.slice(0, newTime.indexOf(':')));
		if (newTime[newTime.length-2] === 'A' && hour === 12){
			hour = 0;
		}
		else if (newTime[newTime.length-2] === 'P' && hour < 12){
			hour +=12;
		}
		tabs[hour]['O'].push(obj.Opened);
		tabs[hour]['C'].push(obj.Closed);
		if (days.indexOf(date) < 0){
			days.push(date);
		}
	});
	for (var x = 0; x < 24; x++){
		if (tabs[x]['O'].length > 0){
			tabs[x]['O'] = (tabs[x]['O'].reduce(function(a,b){return a+b}))/days.length;
		} else if (tabs[x]['O'].length === 0){
			tabs[x]['O'] = 0;
		}
		if (tabs[x]['C'].length > 0){
			tabs[x]['C'] = (tabs[x]['C'].reduce(function(a,b){return a+b}))/days.length;
		} else if (tabs[x]['C'].length === 0){
			tabs[x]['C'] = 0;
		}	
	};
	var str = "Hour" + "\t" + "Opened" + "\t" + "Closed"
	for(var hour in tabs){
	  str = str.concat("\n" + hour + "\t" + tabs[hour]['O'] + "\t" + tabs[hour]['C']);
	};
	return str;
};


document.getElementById('tsv').addEventListener('click', function(){
	debugger;
	var input = getStorage('hourly');
	var str = hourAvg(input);
	base64 = window.btoa(str);
	var url = 'data:application/octet-stream;base64,' + base64;
	chrome.downloads.download({
	    url: url,
	    filename: 'stats.tsv'
	});
});


