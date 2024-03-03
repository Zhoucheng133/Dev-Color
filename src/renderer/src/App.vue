<template>
  <div class="titleBar"></div>
  <div class="content">
    <div class="leftSide">
      <div class="colorCircle" :style="{'background-color': colorGet}"></div>
    </div>
    <div class="rightSide">

    </div>
  </div>
</template>

<script>
export default {
  computed: {
    colorGet(){
      return `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, ${this.colorAlpha})`
    }
  },
  data() {
    return {
      colorR: 255,
      colorG: 255,
      colorB: 255,
      colorAlpha: 1,
    }
  },
}
</script>

<style>
body{
  margin: 0;
}
</style>

<style scoped>
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