<script>
  export let scReduction;
</script>

<defs>
  <!-- gradient for the reduction path -->
  <radialGradient id="reduction-gradient"
                  gradientUnits="userSpaceOnUse"
                  cx="0"
                  cy="0"
                  r={scReduction.range()[1]}>
    <stop offset="0"
          stop-color="#A9ADB1"></stop>
    <stop offset={scReduction(0) / scReduction.range()[1]}
          stop-color="#fbfbfb"></stop>
    <stop offset={scReduction(0) / scReduction.range()[1]}
          stop-color="#fa4659"
          stop-opacity=".4"></stop>
    <stop offset="1"
          stop-color="#fa4659"></stop>
  </radialGradient>

  <!-- blur filter for the outer circle -->
  <filter id="reduction-shadow">
    <feDropShadow dx="0"
                  dy="0"
                  stdDeviation="30"
                  flood-color="#D4D6D8"></feDropShadow>
  </filter>
</defs>

<style>
</style>
