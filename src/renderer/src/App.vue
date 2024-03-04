<template>
  <div class="titleBar"></div>
  <div class="content">
    <div class="leftSide">
      <div class="fixColorPicker">
        <input type="color" v-model="colorHEX" id="colorPicker">
        <a-button type="primary" @click="selectColor">选择颜色</a-button>
      </div>
      <div class="colorCircle" :style="{'background-color': colorGet()}"></div>
    </div>
    <div class="rightSide">
      <div class="inputArea">
        <a-select v-model:value="selectLan" style="width: 150px;">
          <a-select-option value="CSS">CSS</a-select-option>
          <a-select-option value="Flutter">Flutter</a-select-option>
        </a-select>

        <div class="code">
          <div>{{ codeContent() }}</div>
          <div class="copyIcon">
            <CopyOutlined />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { CopyOutlined } from '@ant-design/icons-vue';

var colorR=ref('255');
var colorG=ref('255');
var colorB=ref('255');
var colorAlpha=ref('1');

var colorHEX=ref('#FFFFFF')

var selectLan=ref("CSS")

function codeContent(){
  if(selectLan.value=="CSS"){
    return `rgb(${colorR.value}, ${colorG.value}, ${colorB.value})`
  }else if(selectLan.value=="Flutter"){
    return `Color.fromRGB(${colorR.value}, ${colorG.value}, ${colorB.value})`
  }
}

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
.copyIcon:hover{
  border: 1px solid black;
}
.copyIcon{
  margin-left: auto;
  padding: 5px 5px 5px 5px;
  border: 1px solid rgb(240, 240, 240);
  transition: border .2s linear;
  cursor: pointer;
  border-radius: 5px;
}
.code{
  margin-top: 30px;
  background-color: rgb(240, 240, 240);
  padding: 15px 10px 15px 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  color: rgb(70, 70, 70);
}
.fixColorPicker{
  position: absolute;
  left: 20px;
  top: 50px;
}
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