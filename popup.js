
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
};
var newTabCount = document.getElementById('opened');
newTabCount.innerText = "Tabs opened: " + getStorage('tabcount');

var tabOpen = document.getElementById('oDate');
tabOpen.innerText = "Date: " + getStorage('date');

var tabTime = document.getElementById('oTime');
tabTime.innerText = "Time: " + getStorage('tabtime');

var newCount = document.getElementById('closed');
newCount.innerText = "Tabs closed: " + getStorage('tabsclosed');

var tabClose = document.getElementById('closeDate');
tabClose.innerText = "Date: " + getStorage('cDate');

var tabCloseTime = document.getElementById('cTime');
tabCloseTime.innerText = "Time: " + getStorage('cTabtime');