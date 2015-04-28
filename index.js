
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
};

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
  var info = [];
  for(var hour in tabs){
    info.push({
      Hour: hour,
      Opened: tabs[hour]['O'],
      Closed: tabs[hour]['C']
    });
  };
  return info;
};


var input = getStorage('hourly');
var data = hourAvg(input);
console.log(data);


var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%H").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.Hour); })
    .y(function(d) { return y(d["Opened"]); });

var area = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.Hour); })
    .y1(function(d) { return y(d["Opened"]); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


data.forEach(function(d) {
  console.log(d);
  d.Hour = parseDate(d.Hour);
  d["Opened"]= +d["Opened"];
  d["Closed"] = +d["Closed"];
});

x.domain(d3.extent(data, function(d) { return d.Hour; }));

y.domain([
  d3.min(data, function(d) { return Math.min(d["Opened"], d["Closed"]); }),
  d3.max(data, function(d) { return Math.max(d["Opened"], d["Closed"]); })
]);

svg.datum(data);

svg.append("clipPath")
    .attr("id", "clip-below")
  .append("path")
    .attr("d", area.y0(height));

svg.append("clipPath")
    .attr("id", "clip-above")
  .append("path")
    .attr("d", area.y0(0));

svg.append("path")
    .attr("class", "area above")
    .attr("clip-path", "url(#clip-above)")
    .attr("d", area.y0(function(d) { return y(d["Closed"]); }));

svg.append("path")
    .attr("class", "area below")
    .attr("clip-path", "url(#clip-below)")
    .attr("d", area);

svg.append("path")
    .attr("class", "line")
    .attr("d", line);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Tabs");

