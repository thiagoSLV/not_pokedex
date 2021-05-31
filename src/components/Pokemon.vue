<template>
  <div id="pokemon">
    <figure id="pokemon_card" :style="style">
      <img :src="pokemon.sprites.front_default">
    </figure>
    <div id="pokemon_information" :style="style">
      <h1>{{pokemonTitle}}</h1>

      <Type v-for="(type) in pokemon.types" 
        :key="type" 
        :name="type"
        class="type_item"
      />

    </div>
  </div>
</template>

<script>

import Type from './Type.vue'
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
      return this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1);
    },

    pokemonTitle: function(){
      return this.pokemon.entryNumber + ' - ' + this.capitalizeName
    }
  },
}

</script>

<style scoped>
  #pokemon{
    display: flex;
    border: 2px solid;
    border-radius: 5px;  
  }

  #pokemon_card {
    background: url("../assets/images/pokeball_bg.png");
    background-size: cover;
    border: 3px solid #fff;
    border-radius: 5px;
    flex-grow: 1;
    justify-content: center;
    display: flex;
  }

  img{
    flex-grow: 1;
  }

  #pokemon_information{
    padding: 2%;
    flex: 5;
    display: grid;
    grid-template-columns: 1fr 1fr 3fr;
    grid-template-rows: auto 1fr 4fr;
    gap: 15px;
    font-family: Pixel;
    color:#ffffff;
    background: linear-gradient(to bottom right, var(--type1),var(--type2));
  }

  h1{
    grid-column: 1/4;
  }
</style>