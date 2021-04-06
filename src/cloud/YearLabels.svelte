<script>
  export let width;
  export let height;
  export let years;
  export let scYearRadius;
</script>

<g transform="translate({width / 2} {height / 2})">
  {#each years as year}
    <text transform="translate(0 {-scYearRadius(year) -32 + Math.min(width, height) / 22})">{year}</text>
  {/each}
</g>

<style>
  text {
    fill: var(--dark);
    font-size: .6rem;
    text-anchor: middle;
  }
</style>
