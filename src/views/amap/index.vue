<template>
  <div class="amap-wrap">
      <el-amap vid="amapDEmo" :center="center" :zoom="zoom" class="amap-demo"></el-amap>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap';
export default {
    name:"Amap",
    data(){
        return{
            zoom:12,
            center:[118.831312,33.55782],
            events: {
                init(o) {
                let marker = new AMap.Marker({
                    position: [121.59996, 31.197646]
                });

                marker.setMap(o);
                }
            }
        }
    }
}
</script>

<style lang="scss">
.amap-wrap{
    height: 100vh;
}
</style>