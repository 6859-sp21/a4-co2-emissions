<script>

  import { extent } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import { line as d3line, curveCardinal } from 'd3-shape';
  import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { onMount } from 'svelte';

	onMount(() => {

		let camera, scene, renderer;

		init();
		render();

		function init() {

			const container = document.getElementById( 'four' );

			const backgroundColor = 0xfbfbfb;
			camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 2000);	
			camera.position.set(12, 10, 7);

			scene = new THREE.Scene();

			const loader = new GLTFLoader()
					loader.load( 'https://cdn.glitch.com/b914b490-bea8-4c55-b512-f1c164f636ef%2Fco2.glb?v=1618710206768', function ( gltf ) {
            gltf.scene.scale.set(2,2,2);
            gltf.scene.position.y -= 5.5;
						scene.add( gltf.scene );
						render();
					} );
      
			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( 400, 300 );
      renderer.setClearColor(backgroundColor); 
			renderer.outputEncoding = THREE.sRGBEncoding;
			container.appendChild( renderer.domElement );

			const controls = new OrbitControls( camera, renderer.domElement );
			controls.addEventListener( 'change', render );
			controls.target.set( 0, 0, - 0.2 );
			controls.update();

			window.addEventListener( 'resize', onWindowResize );

			var lightPoint = new THREE.PointLight(0xffffff, 0.5);
			lightPoint.position.set(0, 50, 40);

			scene.add(lightPoint);

			var lightAmb = new THREE.AmbientLight(0xffffff);

			scene.add(lightAmb);

			const light = new THREE.DirectionalLight(0xffffff, 0.8, 100);
			light.position.set(0, 100, 40);
			light.castShadow = true;
			scene.add(light);

		}

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
			render();

		}

		function render() {
			renderer.render( scene, camera );
		}
	});

  export let data;
  export let scEmRate;

  let width = 0;
  let height = 0;
  let emissionCircles = [];
  let titleHeight = 0;

  let scalesSet = false;
  let xScale, yScale, reductionPath;

  $: emissionCircles = [60, 30, 10].map((d, i, a) => {
      return {
        emissionRate: d,
        r: scEmRate(d),
        cx: scEmRate(a.slice(0, i + 1).reduce((a, c) => a + c)) + scEmRate(a.slice(0, Math.max(i, 1)).reduce((a, c) => a + c)) - (i === 0 ? scEmRate(d) : 0) + i * 20,
        cy: height / 1.5
      };
    });

  function setupScales(width, height) {
    if (width === 0 || height === 0) return;

    xScale = scaleLinear()
      .domain([0, 10])
      .range([emissionCircles[emissionCircles.length - 1].cx + width / 15, width - width / 20]);

    yScale = scaleLinear()
      .domain(extent(reductionData.map(d => d.reduction)))
      .range([height * 2/3, height / 3]);

    reductionPath = d3line()
      .x((_, i) => xScale(i))
      .y(d => yScale(d.reduction))
      .curve(curveCardinal);
  }

  $: titleHeight = emissionCircles[0].cy - emissionCircles[0].r - 30;
  $: reductionData = [...data.slice(55, 65), data[55]];
  $: if (emissionCircles && reductionData) setupScales(width, height);
  $: if (xScale && yScale && reductionPath) scalesSet = true;

</script>

<div class="container" bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg width="100%" height="100%">
    {#if scalesSet}
      <g class="titles" transform="translate(0 {titleHeight})">
        <text>Tonnes of CO2 per person</text>
      </g>
      <g class="emission-circles" transform="translate(0 0)">
        {#each emissionCircles as d}
          <circle class="emission-circle"
                  cx={d.cx}
                  cy={d.cy}
                  r={d.r}></circle>
          <text class="emission-labels" transform="translate({d.cx} {d.cy - d.r - 10})">{d.emissionRate}</text>
        {/each}
      </g>
    {/if}
  </svg>
</div>
<div class='titles'>
  <br>
  How much is 1 kilo tonne (kT) of CO2?<br>
  <em>Zoom out the Eiffel tower to find out!</em>
  <div id="four"></div>
  
</div>

<style>
  #four {
    height:380px !important;
    width: 300px !important;
    overflow: hidden;
    padding-top: 10px;
  }

  .container {
    max-width: 800px;
    margin-top: 12px;
  }

  text {
    fill: var(--dark);
  }

  .titles {
    font-size: 0.8rem;
  }

  circle.emission-circle {
    fill: var(--gray);
    stroke: none;
    opacity: .7;
  }

  text.emission-labels {
    font-size: 0.7rem;
    text-anchor: middle;
  }

</style>
