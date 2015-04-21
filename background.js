var tabcount = 0;
var tabsclosed = 0;
// var tracker = {
// 	'Opened': {},
// 	'Closed': {}
// };


var tracker = {"Opened":{"4/21/2015":["1:05:35 PM","1:05:40 PM","1:05:49 PM","1:06:02 PM","1:09:07 PM","1:09:31 PM","1:14:18 PM","1:14:29 PM","1:52:59 PM","1:53:52 PM","1:53:54 PM","1:58:09 PM","2:09:42 PM","2:10:28 PM","2:10:31 PM","2:11:30 PM","2:13:36 PM","2:17:53 PM","2:22:56 PM","2:29:04 PM","2:43:51 PM","2:45:13 PM","2:47:03 PM","2:47:06 PM","2:47:33 PM","2:53:49 PM","3:18:19 PM","3:22:47 PM","3:24:21 PM","3:31:27 PM","3:32:07 PM","3:33:17 PM","3:36:02 PM","3:36:44 PM","3:56:20 PM","4:04:25 PM","4:42:57 PM","4:44:43 PM","4:44:55 PM","4:45:00 PM","4:45:14 PM","4:48:34 PM","4:48:39 PM","4:48:50 PM","4:48:59 PM","4:49:06 PM","4:49:10 PM","4:50:39 PM","4:52:13 PM","4:52:25 PM","4:52:39 PM","4:52:59 PM","4:53:35 PM","4:56:11 PM","4:56:11 PM","4:59:02 PM"]},"Closed":{"4/21/2015":["1:06:07 PM","1:06:08 PM","1:06:09 PM","1:06:09 PM","1:06:10 PM","1:09:26 PM","1:10:01 PM","1:13:41 PM","1:54:50 PM","1:58:42 PM","2:11:20 PM","2:15:10 PM","2:18:00 PM","2:21:26 PM","2:33:28 PM","2:44:29 PM","2:51:22 PM","2:54:08 PM","3:06:06 PM","3:13:28 PM","3:16:41 PM","3:22:52 PM","3:33:26 PM","3:33:28 PM","3:36:17 PM","3:36:22 PM","3:58:22 PM","3:58:27 PM","3:58:28 PM","3:58:28 PM","3:58:29 PM","3:58:30 PM","3:59:56 PM","4:05:14 PM","4:44:29 PM","4:44:32 PM","4:49:32 PM","4:50:01 PM","4:50:24 PM","4:51:02 PM","4:51:24 PM","4:51:54 PM","4:52:07 PM","4:53:08 PM","4:55:15 PM","4:55:17 PM","4:55:56 PM","4:56:05 PM","4:56:06 PM","4:56:25 PM","4:56:25 PM","4:59:57 PM","5:00:11 PM","5:00:11 PM"]}}


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


// var tracker = {
// 	'Opened': [],
// 	'Closed': []
// };

// {"Opened":[["4/21/2015","11:26:44 AM"],["4/21/2015","11:26:46 AM"],["4/21/2015","11:26:53 AM"],["4/21/2015","11:26:55 AM"],["4/21/2015","11:26:57 AM"]],"Closed":[["4/21/2015","11:27:06 AM"],["4/21/2015","11:27:07 AM"],["4/21/2015","11:27:07 AM"],["4/21/2015","11:27:08 AM"],["4/21/2015","11:27:08 AM"]]}