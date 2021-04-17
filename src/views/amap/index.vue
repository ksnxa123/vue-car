<template>
  <div class="amap-wrap">
      <el-amap vid="amapContainer" :amap-manager='amapManager' :events='events' :center="center" :zoom="zoom" class="amap-demo">
          <!-- 覆盖物圆 -->
          <!-- <el-amap-circle v-for="item in circles" :key='item.id' :center='item.center' :radius='item.radius' :fillColor='item.color' :strokeColor='item.color' :strokeOpacity='item.strokeOpacity' :strokeWeight ='item.strokeWeight' -->
          <!-- ></el-amap-circle> -->
          <el-amap-circle :center='[120.153576,30.287459]' :radius='8'></el-amap-circle>
          <!-- 覆盖物-停车场 -->
          <el-amap-marker v-for="(item,index) in parking" :key='item.id' :offset='item.offset' :content='item.content' :position='item.position' :vid='index'></el-amap-marker>
          <!-- 覆盖物 -->
          <el-amap-marker v-for="(item,index) in parking" :key='index' :extData="item" :events='item.events' :offset='item.offsetText' :content='item.text' :position='item.position' :vid='index'></el-amap-marker>
          <!--覆盖物 - 停车场 - 距离信息-->
          <el-amap-marker v-for="(item, index) in parkingInfo" zIndex="1000" :key="item.id" :content="item.text" :offset="item.offset" :position="item.position" :vid="index"></el-amap-marker>
      </el-amap>
  </div>
</template>

<script>
import { AMapManager,lazyAMapApiLoaderInstance } from 'vue-amap';
import {SelfLocation} from './location';
import {Walking} from './walking';
import StyleCss from "./style";
let amapManager = new AMapManager();
export default {
    name:"Amap",
    data(){
        const _this = this;
        return{
            map:null,
            amapManager,
            center:[116.404765, 39.918052],
            zoom:9,
            self_lng: "",
            self_lat: "",
            events:{
                init(o){
                    lazyAMapApiLoaderInstance.load().then(() => {
                        _this.initMap();
                    });
                }
            },
            circles:[],
            // 停车场位置
            parkingData: {},
            // 停车场信息
            parkingInfo: []
        }    
    },
    methods:{
        initMap(){
            this.map = amapManager.getMap();
            // 地图初始化完成
            this.$emit('callbackComponent',{
                function:'loadMap'
            })
            // 自身定位
            this.selfLocatio();
        },
        selfLocatio(){
            // 定位自身
            SelfLocation({
                map:this.map,
                complete:(val)=>this.onComplete(val)
            })
        },
        onComplete(data){
            this.self_lng = data.position.lng;
            this.self_lat = data.position.lat;
            const json = {
                radius: 4,
                color: "#393e43",
                strokeOpacity: "0.2",
                strokeWeight: "30"
            }
            json.center = [this.self_lng, this.self_lat];
            this.circles.push(json)
        },
        /** 存储数据 */
        saveData(params){
            if(this[params.key]) {
                this[params.key] = params.value;
            }
        },
        /**
         * 步行路线规划
         */
        // 1、明确当前这个函数是做什么用的 2、只做一件事件
        handlerWalking(lnglat){
            // 步行路线规划
            Walking({
                map: this.map,
                position_start: [this.self_lng, this.self_lat],
                position_end: lnglat,
                complete: (val) => this.handlerWalkingComlete(val)
            })
        },
        handlerWalkingComlete(data){
            this.parkingInfo = [
                {
                    position: this.parkingData.lnglat.split(","),
                    text: `<div style='${StyleCss.parkingInfoWrap}'>
                        <span style="${StyleCss.parkingInfoNumber}">${this.parkingData.carsNumber}</span>
                        辆车<span style="${StyleCss.parkingInfoLine}"></span>距离您${data.routes[0].distance}米
                    </div>`,
                    offset: [-15, -54]
                }
            ]
        }
    },
    mounted(){

    },
    props:{
        parking:{
            type:Array,
            default:()=>([])
        }
    },
    watch:{
        '$store.state.location.selfLocation':{
            handler(){
                // 定位自身
                this.selfLocatio()
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