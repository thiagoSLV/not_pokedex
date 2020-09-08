<template>
  <div
    id='type' 
    :class="[{disabled: !isActive}]"
    :style="style"
  >
        {{capitalizeName}}
    <!-- <input type="button" :value='capitalizeName'> -->
  </div>
</template>

<script>
import {eventBus} from '../main'
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
        return{
            isActive: false,
            style: {
                'background': `var(--${this.name})`,
            }
        }
    },
    computed: {
        capitalizeName: function() {
            // return this.name.replace(/^\w/, c => c.toUpperCase());
            return this.name.charAt(0).toUpperCase() + this.name.slice(1);
        },
    },
    methods: {
        toggler(){
            if(!this.isLocked){
                this.isActive = !this.isActive; 
                eventBus.$emit('filterChanged', {
                    'name': this.name,
                    'isActive': this.isActive
                });
            }
        }
    },
    mounted: function() {
        this.isActive = !this.disabled;
    }
}
</script>

<style scoped>
    @import '../assets/styles/style.css';
    div {
        display:flex;
        color: #fff;
        border-radius: 7px;
        justify-content: center;
        cursor: pointer;
        font-family: Pixel;
        padding: 5px;
        font-size: 12px;
    }

    .disabled{          
        filter: brightness(50%);
    }

    
</style>