<template>
	<div id="arrows_container" ref="arrows_container">
		<figure class="arrow_figure" @click="$emit('home')">
			<img id="home" class="arrow" src="../assets/images/double_arrow_up_white.png" alt="" />
		</figure>
		<figure class="arrow_figure" @click="$emit('pgUp')">
			<img id="pg_up" class="arrow" src="../assets/images/single_arrow_up_white.png" alt="" />
		</figure>
		<figure class="arrow_figure" @click="$emit('pgDown')">
			<img id="pg_down" class="arrow" src="../assets/images/single_arrow_down_white.png" alt="" />
		</figure>
		<figure class="arrow_figure" @click="$emit('end')">
			<img id="end" class="arrow" src="../assets/images/double_arrow_down_white.png" alt="" />
		</figure>
	</div>
</template>

<script>
export default {
	name: 'ScrollMenu',
}
</script>

<style scoped>
#arrows_container {
	margin: 0 10px 10px 0;
	align-self: flex-end;
	display: flex;
	box-sizing: border-box;
}

.arrow_figure {
	background: #0d61c2;
	border-bottom: 10px solid #07366b;
	padding: 10px 0 10px 0;
	filter: blur(1px);
	flex: 1;
	display: flex;
	margin: -1px;
	justify-content: center;
	align-items: center;
}

.arrow_figure>img {
	max-width: 20px;
}

.arrow_figure:nth-last-child(n+2) {
	border-right: 4px solid #a8a8a8;
}

.arrow_figure:first-child {
	border-radius: 50px 0 0 50px;
}

.arrow_figure:last-child {
	border-radius: 0 50px 50px 0;
}

.arrow_figure:active {
	align-self: flex-end;
	border-bottom: none;
}
</style>