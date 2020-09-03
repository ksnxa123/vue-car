<template>
  <div class="amap-wrap">
      <el-amap vid="amapDEmo" :center="center" :zoom="zoom" class="amap-demo"></el-amap>
  </div>
</template>

<script>
export default {
    name:"Index",
    data(){
        return{
            zoom:12,
            center:[118.831312,33.55782]
        }
    }
}
</script>

<style lang="scss">
.amap-wrap{
    height: 90vh;
}
</style>