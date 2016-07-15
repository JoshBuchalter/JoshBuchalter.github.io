formatDate = d3.time.format("%Y");

// parameters
var margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  },
  width = 850 - margin.left - margin.right,
  height = 80 - margin.bottom - margin.top;
  
// scale function
var timeScale = d3.time.scale()
  .domain([new Date('2006'), new Date('2016')])
  .range([0, width])
  .clamp(true);


// initial value
var startValue = timeScale(new Date('2006'));
startingValue = new Date('2012-03-20');

//////////

// defines brush
var brush = d3.svg.brush()
  .x(timeScale)
  .extent([startingValue, startingValue])
  .on("brush", brushed);

var svg = d3.select(".main-chart")
// console.log(svg);
  // .attr("width", width + margin.left + margin.right)
  // .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("class", "sliderArea")
  // classic transform to position g
  .attr("transform", "translate("  +25+ "," +425+ ")")

svg.append("g")
  .attr("class", "t axis")
// put in middle of screen
.attr("transform", "translate(0," + height / 2 + ")")
// inroduce axis
.call(d3.svg.axis()
  .scale(timeScale)
  .orient("bottom")
  .tickFormat(function(d) {
    return formatDate(d);
  })
  .tickSize(0)
  .tickPadding(12)
  .tickValues([timeScale.domain()[0], timeScale.domain()[1]]))
  .select(".domain")
  .select(function() {
    console.log(this);
    return this.parentNode.appendChild(this.cloneNode(true));
  })
  .attr("class", "halo");

var slider = svg.append("g")
  .attr("class", "slider")
  .call(brush);

slider.selectAll(".extent,.resize")
  .remove();

slider.select(".background")
  .attr("height", height);

var handle = slider.append("g")
  .attr("class", "handle")

handle.append("path")
  .attr("transform", "translate(0," + height / 2 + ")")
  .attr("d", "M 0 -20 V 20")

handle.append('text')
  .text(startingValue)
  .attr("transform", "translate(" + (-18) + " ," + (height / 2 - 25) + ")");

slider
  .call(brush.event);


function brushed() {
  var value = brush.extent()[0];

  if (d3.event.sourceEvent) { // not a programmatic event
    value = timeScale.invert(d3.mouse(this)[0]);
    brush.extent([value, value]);
  }

  handle.attr("transform", "translate(" + timeScale(value) + ",0)");
  handle.select('text').text(formatDate(value));
  console.log(d3.select(".handle").text());
}
