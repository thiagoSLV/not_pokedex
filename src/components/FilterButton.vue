<template>
  <div id="container" href="#" @click="active = !active">

    <div id="fire_symbol" ref="fire" :class="[active ? 'fire_active' : 'fire_inactive','wrapper']">
      <img class="symbol" src="../assets/images/fire_symbol_raw.png" alt="">
    </div>

    <div id="water_symbol" ref="water" :class="[active ? 'water_active' : 'water_inactive','wrapper']">
      <img class="symbol" src="../assets/images/water_symbol_raw.png" alt="">
    </div>

  </div>
</template>

<script>

export default {
  name: 'FilterButton',
  components:{
  },
  data(){
    return{
      active:false,
    }
  },
  watch:{
    active: function(){
      if(this.active){
        this.$refs.fire.classList.remove('fire_inactive');
        this.$refs.fire.offsetWidth;
        this.$refs.fire.classList.add('fire_active');
        this.$refs.water.classList.remove('water_inactive');
        this.$refs.water.offsetWidth;
        this.$refs.water.classList.add('water_active');
      }
      else{
        this.$refs.fire.classList.remove('fire_active');
        this.$refs.fire.offsetWidth;
        this.$refs.fire.classList.add('fire_inactive');
        this.$refs.water.classList.remove('water_active');
        this.$refs.water.offsetWidth;
        this.$refs.water.classList.add('water_inactive');
      }

      this.$emit('filterChanged', {
          'isActive': this.active
      });

    }
  }
}
</script>

<style>
  .symbol {
    max-height: 100%;
  }

  #container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 25px;
  }

  .wrapper {
    border-radius: 10%;
  }

  .fire_active{
    animation: .3s fire forwards;
  }

  .fire_inactive{
    animation: .3s fire reverse forwards;
  }

  .water_active{
    animation: .3s water forwards;
  }

  .water_inactive{
    animation: .3s water reverse forwards;
  }

  #fire_symbol {
    margin-right: 50%;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    background-color: var(--fire);
  }

  #water_symbol {
    margin-left: 50%;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    background-color: var(--water);
  }

  @keyframes fire {
    0% {clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%, 0 100%)}
    100% {
      clip-path:  polygon(0 0, 100% 0, 100% 0, 50% 50%,0 100%, 0 100%);
      margin: 0;
    }
  }

  @keyframes water {
    0% {clip-path: polygon(0 0, 0 0, 0 0, 100% 0, 100% 100%, 0 100%)}
    100% { 
      clip-path:  polygon(0 100%, 50% 50%, 100% 0, 100% 0, 100% 100%, 0 100%); 
      margin: 0;
    }
  }
</style>