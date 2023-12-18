import * as d3 from 'd3';
import dataWorld from '../data/world.json';

const widthMap = window.innerWidth;
const heightMap = window.innerHeight;

let svg = d3
  .select('section #map')
  .attr('viewBox', [50, 400, widthMap, heightMap])
  .attr('width', widthMap)
  .attr('height', heightMap)
  .attr('style', 'max-width: 100%; height: 100%;');

const g = svg.append('g');

const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', zoomed);

svg.call(zoom);

const projection = d3.geoEquirectangular().fitSize([widthMap, heightMap], dataWorld);
const path = d3.geoPath().projection(projection);

g.selectAll('path').data(dataWorld.features).join('path').attr('stroke', 'black').attr('d', path).attr('fill', 'white');

function zoomed(event) {
  const { transform } = event;
  g.attr('transform', transform);
  g.attr('stroke-width', 1 / transform.k);
}
