<script>
  import { range, max, extent } from 'd3-array';
  import { scaleLinear, scaleOrdinal } from 'd3-scale';

  import CanvasVisual from './CanvasVisual.svelte';
  import CircleVizBelow from './SVGVisualBelow.svelte';
  import CircleVizAbove from './SVGVisualOver.svelte';
  import CountrySearch from './CountrySearch.svelte';

  import Legend from './Legend.svelte';

  export let data;
  export let years;

  const offset = 10;
  const angleOffset = 0;

  let selectedIso;

  // Dimensions
  let rawWidth = offset;
  let rawHeight = offset;

  // Scales
  let scYearColor, scCountryAngle, scYearRadius, scEmRate, scReduction;

  function initScales(minDim) {
    scYearColor = scaleOrdinal()
      .domain(years)
      .range(['#B4B8BB', '#A9AEB1', '#9FA4A8']);

    scCountryAngle = scaleOrdinal()
      .domain(data.map(d => d.iso))
      .range(range(angleOffset, 2 * Math.PI - angleOffset, (2 * Math.PI - 2 * angleOffset) / data.length));

    scYearRadius = scaleLinear()
      .domain([years[0], years[years.length - 1]])
      .range([minDim / 5, minDim / 2.4 - padding]);

    scEmRate = scaleLinear()
      .domain([0,1.7 * max([].concat(...data.map(d => d.dataArr.filter(d => years.includes(d.year)).map(d => d.value))))])
      .range([0, minDim / 9]);

    scReduction = scaleLinear()
      .domain(extent(data.map(d => d.reduction)))
      .range([Math.min(scYearRadius(years[years.length - 1]) + reductionOffset, minDim / 2 - padding), minDim/1.4]);
  }

  $: width = rawWidth - offset;
  $: height = rawHeight - offset;
  $: minDim = Math.min(width, height);
  $: padding = minDim / 40;
  $: reductionOffset = minDim / 40;

  $: if (data && years) initScales(minDim);
</script>

<svelte:body on:click={() => selectedIso = undefined}/>
<div class="fill">
  <div class="info">
    <div class="intro">
      <div class="text">
        CO<sub>2</sub> emissions trap heat on earth like a blanket, keeping in excess heat that would otherwise be radiated out into space.
      </div>
      {#if (width > 600)}
        <div class="search">
          <CountrySearch data={data} on:isochanged={(e) => selectedIso = e.detail}/>
        </div>
      {/if}
    </div>
    <div class="legend">
      <Legend data={data} scEmRate={scEmRate} />
    </div>
    {#if (width <= 600)}
      <div class="search small">
        <CountrySearch data={data} on:isochanged={(e) => selectedIso = e.detail}/>
      </div>
    {/if}
  </div>
  <div class="wrapper" bind:offsetWidth={rawWidth} bind:offsetHeight={rawHeight}>
    {#if (minDim > 0)}
    <CircleVizBelow width={width}
                    height={height}
                    offset={offset}
                    data={data}
                    years={years}
                    scCountryAngle={scCountryAngle}
                    scYearRadius={scYearRadius}
                    scReduction={scReduction} />
    <CanvasVisual width={width}
                height={height}
                offset={offset}
                data={data}
                years={years}
                scYearColor={scYearColor}
                scCountryAngle={scCountryAngle}
                scYearRadius={scYearRadius}
                scEmRate={scEmRate}
                selectedIso={selectedIso} />
    <CircleVizAbove width={width}
                  height={height}
                  offset={offset}
                  data={data}
                  years={years}
                  scCountryAngle={scCountryAngle}
                  scYearRadius={scYearRadius}
                  scReduction={scReduction}
                  scEmRate={scEmRate}
                  selectedIso={selectedIso}
                  on:isochanged={(e) => selectedIso = e.detail} />
    {/if}
  </div>
</div>

<style>
  .fill{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 80%;
  }

  .info {
    padding-left: 15%;
    padding-top: 5%;
    height: 50%;
    width: 20%;
    color: var(--dark);
  }

  .legend {
    height: 100%;
  }

  @media (max-width: 600px) {
    .info > div {
      width: 100%;
      margin-bottom: 1.5rem;
    }
  }

  .text {
    text-align: justify;
    line-height: 1.7;
  }

  .search {
    flex-direction: column;
    margin: 1rem 0 0 0;
  }

  .search.small {
    align-items: center;
  }

  .wrapper {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 80vmin;
    margin-left: -5%;
  }
</style>
