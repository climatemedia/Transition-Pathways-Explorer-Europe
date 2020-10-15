<template>
  <div id="loading-screen">
    <div class="loading-screen-icon">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="30px" height="60px" viewBox="-3 -3 30 36" style="enable-background:new 0 0 50 50;" xml:space="preserve">
        <rect x="0" y="13" width="4" height="5" fill="#333">
          <animate attributeName="height" attributeType="XML"
            values="5;21;5"
            begin="0s" dur="1s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML"
            values="13; 5; 13"
            begin="0s" dur="1s" repeatCount="indefinite" />
        </rect>
        <rect x="10" y="13" width="4" height="5" fill="#333">
          <animate attributeName="height" attributeType="XML"
            values="5;21;5"
            begin="0.15s" dur="1s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML"
            values="13; 5; 13"
            begin="0.15s" dur="1s" repeatCount="indefinite" />
        </rect>
        <rect x="20" y="13" width="4" height="5" fill="#333">
          <animate attributeName="height" attributeType="XML"
            values="5;21;5"
            begin="0.3s" dur="1s" repeatCount="indefinite" />
          <animate attributeName="y" attributeType="XML"
            values="13; 5; 13"
            begin="0.3s" dur="1s" repeatCount="indefinite" />
        </rect>
      </svg>
    </div>
    <div class="loading-screen-text">
      Calculating
    </div>
  </div>
</template>

<script>

/*
this and other icons:
https://codepen.io/aurer/pen/jEGbA
*/

export default {
  name: 'Loading',
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style>
#loading-screen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  width: 160px;
  height: 50px;
  background-color: rgba(160, 160, 160, 0.3);
}

.loader{
  margin: 0 0 2em;
  height: 100px;
  width: 20%;
  text-align: center;
  padding: 1em;
  margin: 0 auto 1em;
  display: inline-block;
  vertical-align: top;
}

.loading-screen-icon {
  display: flex;
  align-items: center;
}

.loading-screen-icon svg path,
.loading-screen-icon svg rect{
  fill: #FF6700;
}

.loading-screen-text {
  font-size: 20px;
  margin-left: 10px;
}
</style>
