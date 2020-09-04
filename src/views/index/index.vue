<template>
    <div>
        <div id="children-view" :class="{open:show}">
            <router-view></router-view>
        </div>
        <!-- <Cars /> -->
        <Map />
        <Navbar />
    </div>
</template>

<script>
import Map from "../amap/index";
import Cars from "../cars/index";
import Navbar from "../../components/navbar/index";
export default {
    name:"Index",
    components:{
        Map,
        Cars,
        Navbar
    },
    data(){
        return{
            
        }
    },
    computed:{
        show(){
            const rotuer = this.$route;
            return rotuer.name === "Index" ? false:true;
        }
    },
    mounted(){
        document.addEventListener('mouseup', (e) => {
            const userCon = document.getElementById("children-view");
            if(userCon && !userCon.contains(e.target)) {
                this.$router.push({
                    name: "Index"
                })
            }
        })
    },
    watch: {}
}
</script>

<style lang="scss">
#children-view{
    position: fixed;
    top: 0;
    bottom: 0;
    right: -600px;
    z-index: 101;
    width: 410px;
    background-color: #34393f;
    -webkit-transition: all .3s ease 0s;
    -moz-transition: all .3s ease 0s;
    -o-transition: all .3s ease 0s;
    transition: all .3s ease 0s;
    &.open{
        right: 0;
    }
}
</style>