<template>
<div>
  <div v-if="alwaysRendered">
    <transition name="modal-fade">

      <!-- using v-show instead of v-if, so for instance the scroll position is kept between toggles -->
      <div v-show="open" class="modal" v-on:click.self="closeModal">
        <div class="modal-content">
          <slot/>
          <img v-if="hasCloseButton" class="modal-close" src="/img/close-round.svg" v-on:click="closeModal"/>
        </div>
      </div>
    </transition>
  </div>
  <div v-if="!alwaysRendered">
    <transition name="modal-fade">
      <!-- using v-if here -->
      <div v-if="open" class="modal" v-on:click.self="closeModal">
        <div class="modal-content">
          <slot/>
          <img v-if="hasCloseButton" class="modal-close" src="/img/close-round.svg" v-on:click="closeModal"/>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>

export default {
  name: 'Modal',
  props: ['closingCallback', 'hasCloseButton', 'isOpen', 'alwaysRendered'],
  data() {
    return {
      open: false
    }
  },
  methods: {
    openModal() {
      // called from outside of this component, not good practice
      this.open = true;
    },
    closeModal() {
      this.open = false;
      if(this.closingCallback) {
        this.closingCallback();
      }
    }
  },
  created() {
    if(this.isOpen) {
      this.openModal();
    }
  },
  watch: {
    isOpen: function(newValue) {
      if(newValue) {
        this.openModal();
      } else {
        this.closeModal();
      }
    }
  }
}
</script>

<style>
.modal {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 100%;
  min-height: -webkit-fill-available;
  background-color: rgba(0,0,0,0.35);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  flex: none;
  width: calc(100% - 10px);
  max-width: 900px;
  height: calc(100% - 10px);
  position: relative;
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
}
.modal-close {
  display: block;
  width: 20px;
  position: absolute;
  top: 8px;
  right: 6px;
  cursor: pointer;
}

</style>
