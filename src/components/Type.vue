<template>
	<div id='type' :class="[{disabled: !isActive}]" :style="style">
		{{capitalizeName}}
	</div>
</template>

<script>
export default {
	name: "Type",
	props: {
		name: String,
		isLocked: {
			type: Boolean,
			default: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		}
	},
	data() {
		return {
			isActive: false,
			style: {
				'background': `var(--${this.name})`,
			}
		}
	},
	computed: {
		capitalizeName: function() {
			return this.name.charAt(0).toUpperCase() + this.name.slice(1);
		},
	},
	mounted: function() {
		this.isActive = !this.disabled;
	}
}
</script>

<style scoped>
@import '../assets/styles/style.css';
div {
	display: flex;
	color: #fff;
	border-radius: 7px;
	justify-content: center;
	cursor: pointer;
	font-family: Pixel;
	padding: 5px;
	font-size: 1vw;
}

.disabled {
	filter: brightness(50%);
}

@media screen and (max-width: 768px) {
	div {
		font-size: 2em;
	}
}
</style>