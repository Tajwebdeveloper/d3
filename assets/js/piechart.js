var Piedata = [
  {name: "New Users", value: 40, color: "#fcbd88"},
  {name: "Page Views", value: 20, color: "#f87eb9"},
  {name: "Page Sessions", value: 30, color: "#7fbcff"},
  {name: "Bounce Rate", value: 10, color: "#7ee5e4"},
];
var thickness = 60;
var duration = 750;
var radius = 120;
var pie = d3.select("#pie-chart");

var inner = pie.append('g')
.attr('transform', 'translate(130,130)');

var arc = d3.arc()
.innerRadius(radius - thickness)
.outerRadius(radius);

var pie = d3.pie()
.value(function(d) { return d.value; })
.sort(null);

var path = inner.selectAll('path')
.data(pie(Piedata))
.enter()
.append("g")
  .append('path')
  .transition()
  .attr('fill', function(d){ return d.data.color; })
  .transition().delay(function(d,i) {
    return i * 100; }).duration(100)
    .attrTween('d', function(d) {
      var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
      return function(t) {
        d.endAngle = i(t); 
        return arc(d)
        }
      })
  .attr("stroke", "white")
  .style("stroke-width", "2px");
 