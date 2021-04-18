<script>
  import { extent, max } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import { line as d3line, curveCardinal } from 'd3-shape';

  export let width;
  export let height;
  export let data;
  export let selectedIso;
  export let radius;

  let dataArr, xScale, yScale, line, yLabels;

  function updateScalesAndGenerators(radius) {
    xScale = scaleLinear()
      .domain(extent([].concat(...data.map(d => d.dataArr)).map(d => d.year)))
      .range([-radius / 1.5, radius / 1.5]);

    yScale = scaleLinear()
      .domain([-10, max([].concat(...data.map(d => d.dataArr)).map(d => d.value))])
      .range([radius / 2, -radius / 2]);
      
    line = d3line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.value))
      .curve(curveCardinal);

    yLabels = [
      {
        x: xScale(dataArr[0].year) * 1.05,
        y: yScale(dataArr[0].value) + Math.min(width, height) / 200,
        text: Math.round(dataArr[0].value),
        textAnchor: 'end'
      },
      {
        x: xScale(dataArr[dataArr.length - 1].year) * 1.05,
        y: yScale(dataArr[dataArr.length - 1].value) + Math.min(width, height) / 200,
        text: Math.round(dataArr[dataArr.length - 1].value),
        textAnchor: 'start'
      }
    ];
  }

  $: if (data && selectedIso) dataArr = data.find(d => d.iso === selectedIso).dataArr.filter(d => !isNaN(d.value));
  $: if (data && dataArr) updateScalesAndGenerators(radius);
</script>

{#if (data && selectedIso)}
  <g transform="translate({width / 2} {height / 2})">
    <text class="title"
          transform="translate(0 {yScale.range()[1]})">Tonnes of CO2 per person</text>
    <path d={line(dataArr)}
          stroke="rgb(120, 60, 60)"
          stroke-width="2"
          fill="none"></path>
    {#each yLabels as yLabel}
      <text class="y-label"
            transform="translate({yLabel.x} {yLabel.y})"
            text-anchor={yLabel.textAnchor}>{yLabel.text}</text>
    {/each}
    <line x1={xScale.range()[0]}
          y1={yScale.range()[0]}
          x2={xScale.range()[1]}
          y2={yScale.range()[0]}></line>
    {#each xScale.domain() as xLabel, i}
      <text class="x-label"
            transform="translate({xScale(xLabel)} {yScale.range()[0] * 1.25})"
            text-anchor={i % 2 === 0 ? 'start' : 'end'}>{xLabel}</text>
    {/each}
  </g>
{/if}

{#if (data && !selectedIso)}
  <g transform="scale(.3) translate({1.45*width} {1.35*height})" opacity=".05">
    <path style="fill:#000000;" d="M441.374,79.519l-26.485,17.656l-44.141-8.828l-26.485-8.828l-35.313,8.828l-26.485-8.828
      l17.656-35.313h35.313l34.607-17.303C396.73,40.101,420.875,57.916,441.374,79.519z"/>
    <path style="fill:#000000;" d="M238.325,44.206l-8.828,26.485l-26.485,8.828l-26.485,44.141l-44.141,26.485l-61.797,8.828v26.485
      l17.656,17.656v35.313L61.762,220.77l-26.485-17.656l-15.361-46.171C46.356,93.935,96.898,44.126,160.284,18.604l25.072,16.774
      L238.325,44.206z"/>
    <polygon style="fill:#000000;" points="255.982,291.395 247.154,335.536 211.841,370.849 211.841,397.334 176.528,423.818 
      176.528,467.959 150.044,459.131 132.387,414.99 132.387,326.708 88.246,317.88 70.59,282.567 70.59,256.082 88.246,238.426 
      114.731,211.941 132.387,247.254 194.184,247.254 220.669,291.395 	"/>
    <path style="fill:#000000;" d="M479.335,130.987c48.193,85.978,42.702,191.996-14.125,272.526l-23.836-23.836v-35.313
      l-17.656-35.313l-17.656-35.313v-35.313l-26.485-17.656l-35.313,8.828l-61.797-26.485l-8.828-61.797l26.485-26.485h52.969
      l17.656,26.485l52.969,8.828l52.969-17.656L479.335,130.987z"/>
    <path style="fill:#FFFFFF;" d="M308.951,88.347l35.313-8.828l26.485,8.828l44.141,8.828l26.485-17.656
    c14.787,15.476,27.544,32.77,37.961,51.468l-2.648,1.501l-52.969,17.656l-52.969-8.828l-17.656-26.485h-52.969l-26.485,26.485
    l8.828,61.797l61.797,26.485l35.313-8.828l26.485,17.656v35.313l17.656,35.313l17.656,35.313v35.313l23.836,23.836
    c-81.528,115.526-241.275,143.079-356.792,61.55C10.311,395.815-26.494,267.691,19.916,156.942l15.361,46.171l26.485,17.656
    l26.485,17.656L70.59,256.082v26.485l17.656,35.313l44.141,8.828v88.282l17.656,44.141l26.485,8.828v-44.141l35.313-26.485v-26.485
    l35.313-35.313l8.828-44.141h-35.313l-26.485-44.141h-61.797l-17.656-35.313l-26.485,26.485v-35.313L70.59,185.457v-26.485
    l61.797-8.828l44.141-26.485l26.485-44.141l26.485-8.828l8.828-26.485l-52.969-8.828l-25.072-16.774
    c67.889-27.341,144.235-24.322,209.758,8.299l-34.607,17.303h-35.313l-17.656,35.313L308.951,88.347z"/>
  </g>
  <g transform="translate({width / 2} {height / 2})">
    <text class="default">
      <tspan x="0" dy="-1.2em">Mouse over to see</tspan>
      <tspan x="0" dy="1.2em">emissions per person</tspan>
      <tspan x="0" dy="1.2em">and overall (2018)</tspan>
    </text>
  </g>
  
{/if}

<style>
  text.title {
    font-size: calc(0.4rem + 0.5vmin);
    text-anchor: middle;
    fill: rgb(109, 109, 109);
  }

  text.default {
    font-size: calc(.6rem + 0.5vmin);
    text-anchor: middle;
    fill: rgb(65, 65, 65);
  }

  text.y-label {
    font-size: 0.7rem;
    fill: rgb(109, 109, 109);
  }
  
  line {
    stroke: rgb(109, 109, 109);
    stroke-width: 1;
  }

  text.x-label {
    font-size: 0.6rem;
    fill: rgb(109, 109, 109);
  }

</style>
