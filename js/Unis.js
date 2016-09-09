/* 
 *
 * DOUGNUT DIAGRAM STUB
 *
 */

// Load data and start main worker function
    d3.json("php/getData.php", function(error, dataset) {
//     d3.json("testdata/unis.json", function(error, dataset) {

// Set SVG Container dimensions in px
    var h = 220,  w = 295;

// Set doughnut parameters in px
    var outerRadius = h / 2, innerRadius = h / 3;

// Establish the color pallet
    var color = d3.scale.category20b();

// Attach an SVG container object to the div
    var svg= d3.select("#uniswidget")
                .append("svg")
                .data([dataset])
                .attr("width", w)
                .attr("height", h)
                .append("svg:g")
                .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

// Set the radius (length) of slices (arcs)
    var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

// Calculate the width (fatness) of slices
    var pie = d3.layout.pie()
                .value(function(d,i) { return +dataset[i].anzahl; });

// Group all the slices (arcs) together for convenience
    var arcs = svg.selectAll("g.slice")
                .data(pie)
                .enter()
                .append("svg:g")
                .attr("class", "slice");

// Calculate the census total of all slice
    var syssum = d3.sum(dataset, function(d,i) { return +dataset[i].anzahl; });

// Setup the tooltips
    var tip = d3.tip()
                .attr("class", "d3-tip")
                .html(String);

// Format percentages in tooltips
    var formatter = d3.format(".1%");

// Setup the labels in the center of the doughnut hole
    svg.append("text")
            .attr("id", "unis")
            .attr("class", "label")
            .attr("y", -10)
            .attr("x", 0)
            .html("Gesamtzahl Registranten"); // Default label text
    svg.append("text")
            .attr("id", "anzahl")
            .attr("class", "census")
            .attr("y", 40)
            .attr("x", 0)
            .html(syssum); // Default label value

// Draw the slices (arcs)
    arcs.append("svg:path")
        .call(tip) // Initialize the tooltip in the arc context
        .attr("fill", function(d,i) { return color(i); }) // Color the arc
        .attr("d", arc)
        .on("mouseover", function(d,i) {
// Show the tooltip
                tip.show( formatter(dataset[i].anzahl/syssum) );
// Update the doughnut hole label with slice meta data
                svg.select("#unis").remove();
                svg.select("#anzahl").remove();
                svg.append("text")
                    .attr("id", "unis")
                    .attr("class", "label")
                    .attr("y", -10)
                    .attr("x", 0)
                    .html(dataset[i].unis);
                svg.append("text")
                    .attr("id", "anzahl")
                    .attr("class", "census")
                    .attr("y", 40)
                    .attr("x", 0)
                    .html(+dataset[i].anzahl);
                })

        .on("mouseout", function(d) {
// Remove the tooltip
                tip.hide();
// Return the doughnut hole label to the default label
                svg.select("#unis").remove();
                svg.select("#anzahl").remove();
                svg.append("text")
                    .attr("id", "unis")
                    .attr("class", "label")
                    .attr("y", -10)
                    .attr("x", 0)
                    .html("Gesamtzahl Registranten");
                svg.append("text")
                    .attr("id", "anzahl")
                    .attr("class", "census")
                    .attr("y", 40)
                    .attr("x", 0)
                    .html(syssum);
                })

}); // END CALLBACK FUNCTION
