<script>
  import Defs from './Defs.svelte';
  import YearLabels from './YearLabels.svelte';
  import CenterChart from './CentralLineChart.svelte';
  import CountryLabels from './CountryLabels.svelte';
  import CountryOverlay from './CountryOverlay.svelte';
  import IsoDetector from './IsoDetector.svelte';

  export let width;
  export let height;
  export let offset;
  export let data;
  export let years;
  export let scCountryAngle;
  export let scYearRadius;
  export let scReduction;
  export let scEmRate;
  export let selectedIso;

  $: innerRadius = scYearRadius(years[0]) * 0.62;
  $: countryRadius = scReduction.range()[1];
</script>

<svg class="svg-visual"
    width={width}
    height={height}
    style="margin: {offset / 2}px;">
  <Defs scReduction={scReduction} />
  <YearLabels width={width}
              height={height}
              years={years}
              scYearRadius={scYearRadius} />
  <CenterChart width={width}
                    height={height}
                    data={data}
                    selectedIso={selectedIso}
                    radius={innerRadius} />
  <CountryLabels width={width}
                height={height}
                data={data.map(d => ({iso: d.iso, country: d.country, reduction: d.reduction}))}
                scCountryAngle={scCountryAngle}
                radius={countryRadius}
                selectedIso={selectedIso} />
  <CountryOverlay width={width}
                      height={height}
                      data={data}
                      years={years}
                      scCountryAngle={scCountryAngle}
                      scYearRadius={scYearRadius}
                      scEmRate={scEmRate}
                      scReduction={scReduction}
                      selectedIso={selectedIso} />
  <IsoDetector width={width}
              height={height}
              radius={scReduction.range()[1]}
              scCountryAngle={scCountryAngle}
              selectedIso={selectedIso}
              on:isochanged />
</svg>

<style>
  svg {
    position: absolute;
  }
</style>
