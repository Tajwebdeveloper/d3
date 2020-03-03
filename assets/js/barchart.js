var svg = d3.select("#audience-chart");
var margin = { top: 20, right: 20, bottom: 10, left: 40 };
var width = +svg.attr("width") - margin.left - margin.right;
var height = +svg.attr("height") - margin.top - margin.bottom;
var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var x0 = d3.scaleBand().padding(0.05).rangeRound([0, width]);
var x1 = d3.scaleBand().padding(0.05);
var y = d3.scaleLinear().rangeRound([height, 0]);
var z = d3.scaleOrdinal().range(["#fcbd88", "#f87eb9", "#7fbcff", "#7ee5e4"]);
var maxNumber = 0;
function updateData(limit, el){
  
  if(el!=null){
    document.querySelector('.chart-header-right .active').classList.remove("active")
    el.classList.add("active")
  }
  d3.json("usersData.json", function (response) {
    data = response.data.slice(0, limit);
    
    d3.selectAll('.group').remove()
    d3.selectAll('.axis').remove()
    d3.selectAll('.grid').remove()
    
    maxNumber = d3.max(data, function(d) {     
      return d3.max((Object.keys(data[0])).slice(1,5), function(key) { 
        return d[key]; 
        }); 
      })
    x0.domain(data.map(function (d) { return d.Date; }))
    x1.rangeRound([0, x0.bandwidth()]);
    x1.domain(Object.keys(data[0]).slice(1,5))
  
    y.domain([0, maxNumber]).nice();
  
    function make_y_gridlines() {
      return d3.axisLeft(y)
      .ticks(null, "s")
    }
  
    g.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
        .tickSize(-width)
        .ticks(null, "s")
        .tickFormat("")
      );
    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"));
  
    g.selectAll(".bars")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "group")
      .attr("transform", function (d, i) { return "translate(" + x0(d.Date) + ",0)"; })
      .selectAll("rect")
      .data(function (d) {
        delete d.Date;
        return Object.entries(d);
      })
      .enter()
      .append("rect")
      .attr("y", height)
      .attr("height", 0)
      .attr("x", function (d, i) {  return x1(d[0]); })
      .attr("fill", function (d, i) { return z(i); })
      .attr("width", x1.bandwidth())
      .transition()
      .attr("height", function (d) { return height - y(d[1]); })
      .delay(function (d) { return Math.random() * 1000; })
      .duration(1000)
      .attr("y", function (d) { return y(d[1]); });
  });
}
updateData(7, null);