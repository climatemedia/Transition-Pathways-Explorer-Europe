<template>
  <div class="burger-menu-icon" :class="{'bmi-open': open===true}" v-on:click="callback($event)">
    <span class="bmi-top"></span>
    <span class="bmi-middle1"></span>
    <span class="bmi-middle2"></span>
    <span class="bmi-bottom"></span>
  </div>
</template>

<script>

export default {
  name: 'BurgerMenuIcon',
  props: ['open', 'callback']
}
</script>

<style>

body
.burger-menu-icon {
  position: relative;
  z-index: 1;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  width: 24px;
  height: 28px;

  transform-origin: 50% 50%;
  transform: rotate(0deg);
  transition: transform 0.2s cubic-bezier(0.77,0.2,0.05,1.0);
}

.burger-menu-icon.bmi-open {
  transform: rotate(90deg);
}

.burger-menu-icon span {
  display: block;
  position: absolute;
  left: 0px;
  width: 100%;
  height: 2px;
  background-color: white;
  border-radius: 2px;
  transform-origin: 50% 50%;
  transition: transform 0.2s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.2s cubic-bezier(0.77,0.2,0.05,1.0);
}

.burger-menu-icon .bmi-top {
  top: 5px;
}

.burger-menu-icon .bmi-bottom {
  bottom: 5px;
}

.burger-menu-icon .bmi-middle1, .burger-menu-icon .bmi-middle2  {
  top: 50%;
  transform: translateY(-50%);
}

.burger-menu-icon.bmi-open .bmi-top {
  transform: translateY(20px);
  /*important, otherwise, with just scale(0), artefacts flash up after transition*/
  opacity: 0;
}

.burger-menu-icon.bmi-open .bmi-middle1 {
  transform: rotate(45deg);
}
.burger-menu-icon.bmi-open .bmi-middle2 {
  transform: rotate(-45deg);
}

.burger-menu-icon.bmi-open .bmi-bottom {
  transform: translateY(-20px);
  opacity: 0;
}

</style>
