function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
};

var input = getStorage('hourly');
console.log("input: " + input);