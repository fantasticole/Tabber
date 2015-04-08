
var what = document.getElementsByTagName('input');
var how = what[0];
console.log(what);
console.log(how);

function cap(){
  var newWords = document.getElementById('output');
  newWords.innerText = how.value.toUpperCase();
};

how.addEventListener("keyup", cap);