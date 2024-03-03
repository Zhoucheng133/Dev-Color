<template>
  <div class="titleBar"></div>
  <div class="content">
    <div class="leftSide">
      <div class="colorCircle"></div>
    </div>
    <div class="rightSide"></div>
  </div>
</template>

<style>
body{
  margin: 0;
}
</style>

<style scoped>
.rightSide{
  height: calc(100vh - 30px);
  width: 50vw;
  /* background-color: blue; */
}

.leftSide{
  height: calc(100vh - 30px);
  width: 50vw;
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