<script>
  import { csv } from 'd3-fetch';
  import Cloud from './cloud/Cloud.svelte';

  const years = [2002, 2006, 2010, 2014, 2018];

  let data;

  async function load() {
    data = await csv('co2.csv', d => {
      const dataArr = [];
      const returnObj = {
        iso: d.iso,
        country: d.country,
        reduction: +d.reduction,
        continent: d.continent,
        label: d.label
      };
      for (let key in d) {
        if (key.match('^20')) dataArr.push({year: +key, value: +d[key]});
      }
      returnObj['dataArr'] = dataArr;
      return returnObj;
    });
  }

  load();
</script>

<div class="wrapper">
  <div class="header">
    <h1>CO<sub>2</sub> emissions around the world</h1>
  </div>
  <div id="visual">
    {#if data}
      <Cloud {data} {years} />
    {/if}
  </div>
  <div class="footer">
    Data from <a href="https://www.gapminder.org/data/">GapMinder</a><br>
    Library / code credit: <a href="https://github.com/vincentarelbundock/countrycode">Vincent Arel-Bundock</a>, <a href="https://github.com/Rich-Harris">Rich Harris</a>, <a href="https://github.com/higsch">Matthias Stahl</a>, <a href="https://github.com/mrdoob">Mr.doob</a>, <a href="https://blendswap.com/profile/122633">Johnson Martin</a>, and <a href="https://www.flaticon.com/authors/turkkub">turkkub</a>
  </div>
</div>

<style>
  .wrapper {
    height: 100%;
    margin: 0;

  }

  .header {
    width: 100%;
    margin: 1.5rem 0;
    color: var(--dark);
  }

  .header h1 {
    font-family: 'Crimson Text', serif;
    font-weight: 600;
    font-size: calc(3rem + 7px);
    text-align: center;
  }

  #visual {
    position: relative;
    width: 100%;
  }

  .footer {
    text-align:center;
    font-size:12px;
    color: gray;
    line-height:180%;
    margin-top: -20px;
  }
</style>
