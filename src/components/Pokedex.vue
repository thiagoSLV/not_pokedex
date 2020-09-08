<template>
  <div id="pokedex">
    <img id="top" src="../assets/images/pokedex_top.png"/>
    <div id="screen">
      <div id='list'>
        <ul id="pokemon_list" >
          <li v-for="(pokemon) in filteredList" :key="pokemon.name">  
            <Pokemon v-if="resolved"
              :pokemon="pokemon"
            />
          </li>
        </ul>
      </div>
      <div id='lateral_menu_container'>
        <LateralMenu/>
      </div>

    </div>
    <img id="bottom" src="../assets/images/pokedex_bottom.png"/>
  </div>
</template>

<script>

// import _ from 'lodash'; 

import {eventBus} from '../main'
import axios from 'axios';
import LateralMenu from './LateralMenu.vue'
import Pokemon from './Pokemon.vue'

export default {
  name: 'Pokedex',
  components:{
    Pokemon,
    LateralMenu,
  },

  data() {
    return {
      pokemons: [],
      filteredList: [],
      filters: {
        pokemonName: String,
        types: [],
      },
      resolved: false,
    }
  },

  watch:{
    filters: {
      handler(){
        if(this.filters.types.length || this.filters.pokemonName){
          this.filteredList = this.pokemons.filter((pokemon) => {
            if (!this.filters.types.length && this.filters.pokemonName ) {
              return pokemon.name == this.filters.pokemonName;
            } else {
              for(var i = 0; i < this.filters.types.length; i++){
                for(var j = 0; j < pokemon.types.length; j++){
                  if(pokemon.types[j] == this.filters.types[i]){
                    if (this.filters.pokemonName){
                      return pokemon.name == this.filters.pokemonName;
                    } else {
                      return pokemon
                    }
                  }
                }
              }
            }

          });

        } else {
          this.filteredList = this.pokemons;        
        }
      },
      deep:true
    },
    
  },

  methods:{
  },

  created: function(){
    eventBus.$on('filterChanged', filter => {
      this.filters.pokemonName = (filter['pokemon_name']);
      if (filter['isActive']){
        this.filters.types.push(filter['type_name']);
      } else if(filter['type_name']){
        var index = this.filters.types.indexOf(filter['type_name']);
        this.filters.types.splice(index, 1);
      }
    });
  },

  beforeCreate: function(){
    let promises = []; 
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((pokemons) => {
      this.pokemons = pokemons.data.results;
      this.pokemons.forEach((pokemon, index) => {
        pokemon.entryNumber = index + 1;
        pokemon.types = [];
        pokemon.sprites = {};
        promises[index] = axios.get(pokemon.url)
          .then(result => {
            result.data.types.forEach(function(type, index){
              pokemon.types[index] = type.type.name;
            });
            pokemon.sprites = result.data.sprites;
          }).
          catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          })
      }) 
    })
    .finally(() => {
      Promise.all(promises)
      .then(() => {
        this.resolved = true;
        this.filteredList = this.pokemons;
      });
    });
    
  },

}
</script>

<style scoped>
  img{
    margin-top: -2px;
    margin-bottom: -2px;
  }

  #pokedex{
    display: flex;
    flex-direction: column;
  }

  #top, #bottom{
    min-height: 100px;
    max-height: 15vh;
  }

  #screen{
    display: flex;
    align-items: stretch;

    background: url("../assets/images/pokedex_screen.png");
    background-size: cover;
    height: 70vh;
  }

  #list{
    flex: 2;
    list-style: none;
    overflow-y: scroll;
  }

  #lateral_menu_container::-webkit-scrollbar, #list::-webkit-scrollbar {
    display: none;
  }

  #lateral_menu_container{
    flex: 1;
    background: url('../assets/images/lateral_menu_bg.png');
    background-size: 5%;
    overflow-y: scroll;
  }
</style>