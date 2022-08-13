<template>
    <div id='lateral_menu'>

        <div id="search">
            <input type="text" id="search_bar" v-model="pokemonName" @input="changeFilter($event.target)"/>
        </div>

        <div id="types_search">
            <div id='types_search_title' >
                <FilterButton 
                    class="flex_item" 
                    @click.native="$emit('exclusiveFilterToggle');"
                />
                <p class="flex_item" v-on:click="showTypesSearch = !showTypesSearch;"> Types </p>
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
                    @click.native="changeFilter($event.target)"
                />
            </div>

        </div>
    </div>
</template>

<script>

import Type from './Type.vue'
import FilterButton from './FilterButton.vue'

export default {
    name: 'LateralMenu',
    components:{
        Type,
        FilterButton,
    },
    emits: [
        'filterChanged',
        'exclusiveFilterToggle'
    ],
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
        changeFilter($event){
            let filter = {};
            filter.pokemon_name = this.pokemonName;
            if(this.$refs[$event.id] && !this.$refs[$event.id][0].isLocked){
                this.$refs[$event.id][0].isActive = !this.$refs[$event.id][0].isActive;
                filter.type_name = this.$refs[$event.id][0].name;
                filter.isActive = this.$refs[$event.id][0].isActive;
            }
            this.$emit('filterChanged',filter);
        },
    },
    created (){
        this.emitter.on('spliceFilters', (types) => {
            this.types.forEach((type) => {
               if(type != types[0] && type != types[1]){
                   this.$refs[type][0].isActive = false;
               }
            })
        })
    }
}
</script>

<style scoped>
    #lateral_menu {
        overflow: hidden;
        padding: 20px;
    }

    #search{
        padding: 5px;
        display: flex;
        border-radius: 10px;
        background-image: linear-gradient(#ff0000 50%, #fff 50%);
        border: 1px solid #000;
        margin-bottom: 5px;
    }

    #search_bar {
        flex: 5;
        min-width: 0;
        border-radius: 10px;
        border: 1px solid #000;
    }

    #types_search{
        border: 2px solid #000;
        border-radius: 10px;
        overflow: hidden;
    }

    #types_search_title{
        padding: 5px;
        display: flex;
        background: linear-gradient(170deg, #ff0000 70% , #fc6f6f );
        background-size: contain;
        align-self:center;
        color: white;
        flex-basis:100%;
        text-align: center;
    }

    #types_search_title > .flex_item:first-child{
        flex: 1;
    }

    #types_search_title > .flex_item:last-child{
        font-family: 'Pixel';
        flex: 5;
    }

    #types_search_btns {
        display: grid;
        padding: 5px;
        grid-template-columns: repeat(auto-fit, minmax(82px, 1fr));
        grid-gap: 5px;
        overflow: none;
        background: linear-gradient(170deg, #d6d6d6 70% , #ffffff );
    }

</style>