<template>
  <div id="app">
    <Pokedex id="pokedex"/>
  </div>
</template>

<script>

import Pokedex from './components/Pokedex.vue'
export default {
  name: 'App',
  components: {
    Pokedex
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}
@-webkit-keyframes backgroundScroll {
    from {background-position: 0 0;}
    to {background-position: -340px -428px;}
}
#app {
  background-image: url('./assets/images/bg_img_small.png');
  width: auto;
  background-repeat: repeat;
  min-height: 100%;
  max-height: auto;
  -webkit-animation: backgroundScroll 15s linear infinite;
  -webkit-animation-fill-mode: forwards;
}

#pokedex{
  min-width: 400px;
  max-width: 75%;
  margin:auto
}
</style>
