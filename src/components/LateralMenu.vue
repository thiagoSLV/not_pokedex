<template>
    <div id='lateral_menu'>
        <input type="text" id="search_bar" v-model="pokemonName" @input="filter($event.target)"/>
        <div id="types_search">
            <div id='types_search_title' v-on:click="showTypesSearch = !showTypesSearch;">
                <p> Types </p>
            </div>
            <div id='types_search_btns' v-show="showTypesSearch">
                <Type v-for="type in types"
                    :isLocked="false"
                    :key="type" 
                    :name='type' 
                    :id='type'
                    class='type_btn'
                    :disabled="true"
                    :ref="type"
                    @click.native="filter($event.target)"
                />
            </div>
        </div>
    </div>
</template>

<script>

import Type from './Type.vue'
import {eventBus} from '../main'

export default {
    name: 'LateralMenu',
    components:{
        Type
    },
    data(){
        return {
            pokemonName: '',
            showTypesSearch: true,
            types:[
                'normal',
                'fire',
                'water',
                'grass',
                'electric',
                'ice',
                'fighting',
                'poison',
                'ground',
                'flying',
                'psychic',
                'bug',
                'rock',
                'ghost',
                'dark',
                'dragon',
                'steel',
                'fairy',
            ]
        }
    }, 
    methods: {
        toggle(){
            console.log(this.showTypesSearch);
            
        },

        filter(target){
            let filter = {};
            filter.pokemon_name = this.pokemonName;
            if(this.$refs[target.id] && !this.$refs[target.id][0].isLocked){
                this.$refs[target.id][0].isActive = !this.$refs[target.id][0].isActive;
                filter.type_name = this.$refs[target.id][0].name;
                filter.isActive = this.$refs[target.id][0].isActive;
            }
            eventBus.$emit('filterChanged',filter);
        },
    },
}
</script>

<style scoped>
    #type_list{
        overflow: hidden;
        list-style: none;
    }

    #lateral_menu {
        overflow: hidden;
        padding: 20px;

    }

    #types_search{
        border: 5px solid;
        border-image: linear-gradient(to bottom right, #587e77, #bee4dd);
        border-image-slice:1;
        border-image-slice:5;
        border-radius: 10px;
    }

    #types_search_title{
        background: url('../assets/images/doted_bg.jpeg');
        background-size: contain;
        align-self:center;
        font-family: 'Pixel';
        color: white;
        flex-basis:100%;
        text-align: center;
        border-radius: 4px;
    }

    #types_search_btns {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        padding: 0 0 4% 4%;
        background: linear-gradient(to bottom right, #bee4dd, #587e77);
    }


    .type_btn{
        flex: 1 0 21%;
        margin-right: 4%;
        margin-top: 4%;
    }

</style>