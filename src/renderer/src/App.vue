<template>
  <div class="titleBar"></div>
  <div class="content">
    <div class="leftSide">
      <div class="colorCircle" :style="{'background-color': colorGet()}"></div>
    </div>
    <div class="rightSide">
      <div class="inputArea">
        <input type="color" v-model="colorHEX" id="colorPicker">
        <a-button type="primary" @click="selectColor">选择颜色</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

var colorR=ref('255');
var colorG=ref('255');
var colorB=ref('255');
var colorAlpha=ref('1');

var colorHEX=ref('#FFFFFF')

function selectColor(){
  document.getElementById("colorPicker").click();
}

function colorGet(){
  return `rgba(${colorR.value}, ${colorG.value}, ${colorB.value}, ${colorAlpha.value})`
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');

  // 将RR、GG、BB分量提取并转换为十进制数
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  colorR.value=r;
  colorG.value=g;
  colorB.value=b;
}

watch(colorHEX, (newVal)=>{
  hexToRgb(newVal);
})

</script>

<style>
body{
  margin: 0;
}
</style>

<style scoped>
#colorPicker{
  position: absolute;
}
.inputArea{
  padding-right: 10px;
}
.colorCircle{
  height: 120px;
  width: 120px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 60px;
  transition: background-color .2s linear;
}
.rightSide{
  height: calc(100vh - 60px);
  width: 50vw;
  /* background-color: blue; */
}

.leftSide{
  height: calc(100vh - 60px);
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
}

.titleBar{
  height: 30px;
  width: 100%;
  -webkit-app-region: drag;
}

.content{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>