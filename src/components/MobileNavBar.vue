<template>
    <div >
        <ul id="options" ref="tnc">
            <div id="filter" class="menu_btn" @click="active($event);$emit('showFilters')">
                <img src="../assets/images/filter_pixel_white.png" alt="">
            </div>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'MobileNavBar',
        data(){
            return {
                showFilters: false
            }
        },
        emits:[
            'showFilters'
        ],
        methods:{
            active(event){
                Array.from(this.$refs.tnc.children).forEach(element=>{
                    if(event.target == element){                        
                        element.style.filter == '' 
                        ? element.style.filter = 'invert(1)' 
                        : element.style.filter = ''
                    }
                    else{
                        element.style.filter = ''
                    }
                })
            }
        }
    }
</script>
<style scoped>

    #options{
        display:flex;
        background-color: dimgray;
        padding: 5px;
        align-content: center;
        align-items: center;
    }
    .menu_btn{
        text-align: center;
        flex:1;
        border: 2px solid rgb(228, 223, 223);
        background-color: dimgrey;
    }


</style>