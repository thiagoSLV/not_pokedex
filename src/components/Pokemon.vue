<template>
  <div id="pokemon">
    <!-- <img :src="sprites.front_default" alt=""> -->
    <figure id="pokemon_card" class="image is-128x128" :style="style">
      <img :src="pokemon.sprites.front_default">
    </figure>
    <div id="pokemon_information" :style="style">
      <h1>{{pokemon.entryNumber + ' - ' + capitalizeName }}</h1>

      <Type v-for="(type) in pokemon.types" 
        :key="type" 
        :name="type"
        :disabled="false"
        class="type_item"
      />

    </div>
  </div>
</template>

<script>

import Type from './Type.vue'
// import {color} from 'color';
// var Color = require('color');
export default {
  name: 'Pokemon',
  components: {
    Type,
  },
  props: {
    pokemon: {}
  },
  data(){
    return {

      style: {
        '--type1': `var(--${this.pokemon.types[0]}_darker)`,
        '--type2': `var(--${this.pokemon.types[1]}_lighter, #fff)`,
      }
    }
  },
  computed: {
    capitalizeName: function() {
        // return this.name.replace(/^\w/, c => c.toUpperCase());
        return this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1);
    },
  },
}

</script>

<style scoped>
  #pokemon{
    display:flex;
    margin: 10px 10px 0 10px ;
    border: 2px solid;
    border-radius: 5px;  
  }

  #pokemon_card {
    background: url("../assets/images/pokeball_bg.png");
    background-size: cover;
    border: 3px solid #fff;
    border-radius: 5px;
  }

  #pokemon_information{
    padding: 2%;
    display: flex;
    flex-grow: 1;
    align-items: flex-start;
    flex-wrap: wrap;
    font-family: Pixel;
    color:#ffffff;
    background: linear-gradient(to bottom right, var(--type1),var(--type2));
  }

  .type_item{
    flex:0 0 15%;
    margin-right: 2%;
    margin-top: 2%;
  }

  h1{
    flex:0 0 100%;
  }
</style>