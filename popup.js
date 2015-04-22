
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





// // create a fake object
// var myData = {
// 	'a': 'a',
// 	'b': 'b',
// 	'c': 'c'
// };
// add it to our localstorage
// localStorage.setItem('data', JSON.stringify(myData));

// // encode the data into base64
// base64 = window.btoa(localStorage.getItem('tracker'));

// // create an a tag
// var a = document.createElement('a');
// a.href = 'data:application/octet-stream;base64,' + base64;
// a.innerHTML = 'Download';

// // add to the body
// document.body.appendChild(a);


// // create a fake object
// var myData = {
// 	'a': 'a',
// 	'b': 'b',
// 	'c': 'c'
// };
// // add it to our localstorage
// localStorage.setItem('data', JSON.stringify(myData));


// chrome.storage.local.get(null, function(items) { // null implies all items
//     // Convert object to a string.
//     var result = JSON.stringify(items);

//     // Save as file
// 	var url = window.btoa(localStorage.getItem('data'));
//     chrome.downloads.download({
//         url: url,
//         filename: 'filename_of_exported_file.json'
//     });
// });




// document.getElementById('down').addEventListener('click', alert("Hello"));
// function getStorage(key) {
//   return JSON.parse(localStorage.getItem(key));
// };
// var info = getStorage('tracker');
// getData.addEventListener('click', function(info){

    // var result = JSON.stringify(info);
    // var url = 'data:application/json;base64,' + btoa(result);
    // chrome.downloads.download({
    //     url: url,
    //     filename: 'tabactivity.json'
    // });
// });


