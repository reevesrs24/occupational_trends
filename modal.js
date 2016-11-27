

$('#modalButton').click(function() {


    var year = $('#inputYear').val();
    setBarChartIncome(year);
    $('#toggleData').prop('checked', true).change();

});


$('#toggleData').change(function() {

    var year = $('#inputYear').val();

    if ($(this).prop('checked'))
        setBarChartIncome(year);
    else
        setBarChartEmployed(year);

});



function setBarChartIncome(year) {

    $('#myModalLabel').text(year + " Income Data");

    d3.select('#modal-body').selectAll('svg').remove();

    var marginBar = {top: 20, right: 20, bottom: 110, left: 40},
        width = 600 - marginBar.left - marginBar.right,
        height = 400 - marginBar.top - marginBar.bottom;


    var xBar = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var yBar = d3.scale.linear().range([height, 0]);

    var xAxisBar = d3.svg.axis()
        .scale(xBar)
        .orient("bottom")
        .ticks(10);

    var yAxisBar = d3.svg.axis()
        .scale(yBar)
        .orient("left")
        .ticks(10);

    var svgBar = d3.select("#modal-body").append("svg")
        .attr("width", width + marginBar.left + marginBar.right)
        .attr("height", height + marginBar.top + marginBar.bottom)
        .append("g")
        .attr("transform",
            "translate(" + marginBar.left + "," + marginBar.top + ")");

    d3.json("occupations.json", function (error, data) {

        data.forEach(function (d) {

            d.occupation = d.occupation;

            var i;
            for (i = 0; i < 53; i++) {
                if (+d.income[i][0] == year)
                    d.value = +d.income[i][1];
            }

            console.log(d);

        });

        xBar.domain(data.map(function (d) {
            return d.occupation;
        }));
        yBar.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

        svgBar.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxisBar)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-40)");

        svgBar.append("g")
            .attr("class", "y axis")
            .call(yAxisBar)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("dy", "-3em")
            .attr("dx", "-15em")
            .style("text-anchor", "end")
            .text("Income ($)");

        svgBar.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .style("fill", "steelblue")
            .attr("x", function (d) {
                return xBar(d.occupation);
            })
            .attr("width", xBar.rangeBand())
            .attr("y", function (d) {
                return yBar(d.value);
            })
            .attr("height", function (d) {
                return height - yBar(d.value);
            }).on('mouseover', function(d){
                d3.select(this).style({fill:'brown'});

                 div.transition()
                    .duration(200)
                    .style("opacity", .9);
                 div.html("<p>" + d.value + "</p>")
                     .style("left", (d3.event.pageX) + "px")
                     .style("top", (d3.event.pageY) + "px");


                //Show the tooltip
                d3.select("#tooltip").classed("hidden", false);

            }).on('mouseout', function(d){
                d3.select(this).style({fill:'steelblue'});

                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                d3.select("#tooltip").classed("hidden", true);

            });

    });
}


function setBarChartEmployed(year) {

    $('#myModalLabel').text(year + " Employment Data");

    d3.select('#modal-body').selectAll('svg').remove();

    var marginBar = {top: 20, right: 0, bottom: 110, left: 80},
        width = 600 - marginBar.left - marginBar.right,
        height = 400 - marginBar.top - marginBar.bottom;


    var xBar = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var yBar = d3.scale.linear().range([height, 0]);

    var xAxisBar = d3.svg.axis()
        .scale(xBar)
        .orient("bottom")
        .ticks(10);

    var yAxisBar = d3.svg.axis()
        .scale(yBar)
        .orient("left")
        .ticks(10);

    var svgBar = d3.select("#modal-body").append("svg")
        .attr("width", width + marginBar.left + marginBar.right)
        .attr("height", height + marginBar.top + marginBar.bottom)
        .append("g")
        .attr("transform",
            "translate(" + marginBar.left + "," + marginBar.top + ")");


    d3.json("occupations.json", function (error, data) {

        data.forEach(function (d) {

            d.occupation = d.occupation;

            var i;
            for (i = 0; i < 53; i++) {
                if (+d.employed[i][0] == year)
                    d.value = +d.employed[i][1];
            }

            console.log(d);

        });

        xBar.domain(data.map(function (d) {
            return d.occupation;
        }));
        yBar.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

        svgBar.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxisBar)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-40)");

        svgBar.append("g")
            .attr("class", "y axis")
            .call(yAxisBar)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("dy", "-5em")
            .attr("dx", "-10em")
            .style("text-anchor", "end")
            .text("Employed (Thousands)");

        svgBar.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .style("fill", "steelblue")
            .attr("class", "bar")
            .attr("x", function (d) {
                return xBar(d.occupation);
            })
            .attr("width", xBar.rangeBand())
            .attr("y", function (d) {
                return yBar(d.value);
            })
            .attr("height", function (d) {
                return height - yBar(d.value);
            }).on('mouseover', function(d){
                d3.select(this).style({fill:'brown'});

                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("<p>" + d.value + "</p>")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px");

            }).on('mouseout', function(d){
                d3.select(this).style({fill:'steelblue'});

                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                d3.select("#tooltip").classed("hidden", true);

            });

    });
}