<template>
	<div id="pokedex">
		<img id="top" src="../assets/images/pokedex_top.png" />
		<div id="wrapper">
			<div id="mobile_nav_bar">
				<MobileNavBar @filtersActive="showFilters=!showFilters" v-show="mobilePort" />
			</div>
			<div id="screen">
				<div id="list" v-show="!mobilePort || (mobilePort && !showFilters)" ref="list">
					<ul id="pokemon_list">
						<li class="list-item" v-for="(pokemon) in filteredList" :key="pokemon.name">
							<Pokemon v-if="resolved" :pokemon="pokemon" />
						</li>
					</ul>
					<div id="scroll_menu">
						<ScrollMenu @home="home" @pgUp="pgUp" @pgDown="pgDown" @end="end" />
					</div>
				</div>
	
				<div id="lateral_menu_container" v-show="showFilters">
					<LateralMenu @filterChanged="filterChanged($event)" @exclusiveFilterToggle="exclusiveFilterActive = !exclusiveFilterActive" />
				</div>
			</div>
		</div>
	
		<img id="bottom" src="../assets/images/pokedex_bottom.png" />
	</div>
</template>

<script>
import axios from 'axios';
import LateralMenu from './LateralMenu.vue'
import Pokemon from './Pokemon.vue'
import ScrollMenu from './ScrollMenu.vue'
import MobileNavBar from './MobileNavBar.vue'

export default {
	name: 'Pokedex',
	components: {
		Pokemon,
		LateralMenu,
		ScrollMenu,
		MobileNavBar
	},

	data() {
		return {
			showFilters: false,
			mobilePort: false,
			pokemons: [],
			filteredList: [],
			filters: {
				pokemonName: String,
				types: [],
			},
			exclusiveFilterActive: false,
			root: {},
			resolved: false,
		}
	},

	watch: {
		exclusiveFilterActive: function() {
			this.spliceFilters();
			this.filterChanged(Object({ isActive: false, pokemon_name: this.filters.pokemonName }));
		},
	},

	methods: {
		checkScreenSize() {
			if (window.innerWidth <= 768) {
				this.mobilePort = true
				this.showFilters = false
			} else {
				this.mobilePort = false;
				this.showFilters = true
			}
		},

		spliceFilters() {
			this.filters.types.splice(0, this.filters.types.length - 2);
			this.emitter.emit('spliceFilters', this.filters.types);
		},

		filterChanged(filter) {
			this.filters.pokemonName = (filter['pokemon_name']);
			if (filter['isActive']) {
				this.filters.types.push(filter['type_name']);
			} else if (filter['type_name']) {
				var index = this.filters.types.indexOf(filter['type_name']);
				this.filters.types.splice(index, 1);
			}

			if (this.exclusiveFilterActive && this.filters.types.length > 2)
				this.spliceFilters();
			console.log(this.filters)
			if (this.filters.types.length || this.filters.pokemonName) {
				this.filteredList = this.pokemons.filter((pokemon) => {
					if (!this.filters.types.length && this.filters.pokemonName) {
						if (pokemon.name.search(this.filters.pokemonName) >= 0)
							return pokemon;
					} else {
						if (this.exclusiveFilterActive) {
							if ((pokemon.types[0] == this.filters.types[0] || pokemon.types[0] == this.filters.types[1]) &&
								(pokemon.types[1] == this.filters.types[0] || pokemon.types[1] == this.filters.types[1])) {
								if (this.filters.pokemonName) {
									if (pokemon.name.search(this.filters.pokemonName) >= 0)
										return pokemon;
								} else {
									return pokemon
								}
							}
						} else {
							for (var i = 0; i < this.filters.types.length; i++) {
								for (var j = 0; j < pokemon.types.length; j++) {
									if (pokemon.types[j] == this.filters.types[i]) {
										if (this.filters.pokemonName) {
											if (pokemon.name.search(this.filters.pokemonName) >= 0)
												return pokemon;
										} else {
											return pokemon
										}
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

		home() {
			this.$refs.list.scrollTo(0, 0);
		},

		pgUp() {
			let heigth = this.$refs.list.clientHeight;
			this.$refs.list.scrollBy(0, -heigth);
		},

		pgDown() {
			let heigth = this.$refs.list.clientHeight;
			this.$refs.list.scrollBy(0, heigth);

		},
		end() {
			let heigth = this.$refs.list.scrollHeight;
			this.$refs.list.scrollTo(0, heigth);
		}
	},

	beforeCreate: function() {
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
							result.data.types.forEach(function(type, index) {
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
	mounted() {
		addEventListener('resize', this.checkScreenSize);
		this.checkScreenSize();
	}
}
</script>

<style>
#pokedex {
	display: flex;
	flex-direction: column;
	margin: 0;
}

#wrapper {
	height: 70vh;
	display: flex;
	flex-direction: column;
	background: url("../assets/images/pokedex_screen.png");
	background-size: cover;
}

#top,
#bottom {
	max-height: 15vh;
}

#screen {
	display: flex;
	overflow-y: scroll;
	height: inherit;
}

#list {
	align-items: flex-start;
	flex: 2;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 90%;
	position: relative;
	overflow-y: scroll;
	list-style: none;
	align-tracks: top;
}

#pokemon_list {
	padding: 10px;
	display: grid;
	gap: 10px;
	grid-column-start: 1;
	grid-row-start: 1;
}

#scroll_menu {
	position: sticky;
	grid-column-start: 1;
	grid-row-start: 2;
	z-index: 1;
	width: 33%;
	top: 90%;
	left: 66%;
}

#lateral_menu_container {
	flex: 1;
	background: linear-gradient(170deg, #0197d3 50%, #ffffff);
	overflow-y: scroll;
	animation-delay: 3s;
}

@keyframes toggle_menu {
	from {
		height: 70vh;
	}
	to {
		height: 0;
	}
}

@media screen and (max-width: 768px) {
	#scroll_menu {
		display: none;
	}
	#lateral_menu_container {
		width: 100vw;
	}
	.active_lateral_menu {
		animation: 3s toggle_menu reverse;
	}
}

@media screen and (min-width: 1025px) {
	#pokedex {
		width: 75vw;
		margin: auto;
	}
}

@media screen and (min-width: 1921px) {
	#pokemon_list {
		font-size: 2em;
	}
}
</style>