import * as d3 from 'd3';
import dataWorld from '../data/world.json';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import getPriceIndex from '../utils/price_index';

const widthMap = window.innerWidth;
const heightMap = window.innerHeight;

let svg = d3
  .select('section #map')
  .attr('viewBox', [0, 300, widthMap, heightMap])
  .attr('width', widthMap)
  .attr('height', heightMap)
  .attr('style', 'max-width: 100%; height: 100%;')
  .style('background-color', 'rgba(23, 106, 198, 0.2)');
// .style('opacity', '0.3');

const g = svg.append('g');

const zoom = d3.zoom().scaleExtent([1, 12]).on('zoom', zoomed);

let priceInd = getPriceIndex();
console.log(priceInd);

let IndexPriceDollar = { petit: '$', regular: '$$', large: '$$$' };

svg.call(zoom);

const projection = d3.geoEquirectangular().fitSize([widthMap, heightMap], dataWorld);
const path = d3.geoPath().projection(projection);

let mouseOver = function (d) {
  d3.selectAll('path').transition().duration(200).style('opacity', 0.5);
  d3.select(this).transition().duration(200).style('opacity', 1);
  div.transition().duration(50).style('opacity', 1);
  console.log(this);
  d3.select(div);
  tippy(this, {
    content: `${this.__data__.properties.admin}</br> Budget: ${
      IndexPriceDollar[priceInd.find((element) => element.country == this.__data__.properties.admin)?.indexPrice]
        ? IndexPriceDollar[priceInd.find((element) => element.country == this.__data__.properties.admin)?.indexPrice]
        : 'No data'
    }`,
    allowHTML: true,
    // duration: 100,
    // arrow: false,
    delay: [30, 40],
    theme: 'mytheme',
    color: 'blue',
    arrow: false,
  });
  // div
  //   .html(this.__data__.properties.admin)
  //   .style('left', event.pageX + 10 + 'px')
  //   .style('top', event.pageY - 15 + 'px');
  // div
  //   .html(d.properties)
  //   .style('left', event.pageX + 10 + 'px')
  //   .style('top', event.pageY - 15 + 'px');
};

let mouseLeave = function (d) {
  d3.selectAll('path').transition().duration(200).style('opacity', 0.5);
  d3.select(this).transition().duration(200);
  div.transition().duration('50').style('opacity', 0);
};

g.selectAll('path')
  .data(dataWorld.features)
  .join('path')
  .attr('stroke', 'black')
  .attr('d', path)
  .attr('fill', 'white')
  .on('mouseover', mouseOver)
  .on('mouseleave', mouseLeave);

function zoomed(event) {
  const { transform } = event;
  g.attr('transform', transform);
  g.attr('stroke-width', 1 / transform.k);
}

let div = d3.select('body').append('div').attr('class', 'tooltip-donut').style('opacity', 0);
