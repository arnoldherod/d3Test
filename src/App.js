import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3'
import d3tip from 'd3-tip'
import database from './Toronto_apartment_rentals_2018.csv'

class App extends Component {
  componentDidMount(){
 
    var margin = {top: 40, right: 20, bottom: 30, left: 40},
        // width = 1800 - margin.left - margin.right,
        height = 725 - margin.top - margin.bottom;

    var formatMoney = d3.format("$");

    // var x = d3.scaleBand()
    //     .rangeRound([0, width])
    //     .padding(0.1);

    var y = d3.scaleLinear()
        .range([height, 0]);

    // var xAxis = d3.axisBottom(x)

    var yAxis = d3.axisLeft(y).tickFormat(formatMoney)

    const chart = d3.select('.App').append('svg').attr('width', 1800).attr('height', 700).append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svg = d3.select('svg')       
    var tool_tip = d3tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) { return "Address: " + d['Address']; });
    svg.call(tool_tip);
    
    d3.csv(database)
    .then(data => {
      // x.domain(data.map(function(d) { return d['Address']; }));
      y.domain([0, d3.max(data, function(d) { return d['Price'] + 0; })]);

      // chart.append("g")
      //     .attr("class", "x axis")
      //     .attr("transform", "translate(0," + height + ")")
      //     .call(xAxis);

      chart.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price");

      const yScale = d3.scaleLinear()
          .domain([0, 8000])
          .range([0, 700])
    
      chart.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .style('fill',(d) => {
              if(d['Bedroom'] === '1') {
                  return 'blue'
              }
              else if(d['Bedroom'] === '2'){
                  return 'green'
              }
              else{
                  return 'red'
              }
          })
          .attr('x', (d, i) => {
              return i * 25
          })
          .attr('y', (d) => {
              return 700 - yScale(d['Price'])
          })
          .attr('width', 20)
          .attr('height', (d) => {
              return yScale(d['Price'])
              }
          )
          .attr('value', (d) => {
              return d['Address']
          })
          .on('mouseover', tool_tip.show)
          .on('mouseout', tool_tip.hide);
    })
  }
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
