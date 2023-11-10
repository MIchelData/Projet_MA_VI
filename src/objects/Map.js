import * as d3 from "d3";

import dataWorld from '../data/world.json'


const widthMap = window.innerWidth
const heightMap = window.innerHeight

let svg = d3.select("section #map")
    .attr("width", widthMap)
    .attr("height", heightMap); 

const projection = d3.geoEquirectangular()
    .fitSize([widthMap, heightMap], dataWorld);

const path = d3.geoPath().projection(projection);

svg.selectAll("path")
    .data(dataWorld.features)
    .enter()
    .append("path")
    .attr('stroke', 'black')
    .attr("d", path)
    .attr('fill', 'white')
