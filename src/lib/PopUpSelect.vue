<template>
  <div
    class="popupselect"
    v-on:focusout="handleFocusOut"
    ref="popup"
    v-on:keydown.up="prevItem()"
    v-on:keydown.down="nextItem()"
    v-on:keydown.enter="selectItem(selectedIndex)"
    :tabindex="open ? 0 : -1"
  >
    <div class="popupselect-inner-container" ref="container"
      v-show="open"
    >
      <div v-if="title" class="popupselect-title">{{title}}</div>
      <div class="popupselect-items-container" ref="itemscontainer">
        <div v-for="(item, ind) in items" ref="items" :key="ind"
          class="popupselect-item"
          :class="{'ps-selected': ind===selectedIndex}"
          v-on:click="selectItem(ind)"
          v-on:mouseenter="selectedIndex = ind"
          v-on:mousemove="selectedIndex = ind"
        >
          <span>{{getItemName(ind)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PopUpSelect',
  props: ['toggleElem', 'items', 'nameProp', 'title', 'callback'],
  data() {
    return {
      open: false,
      selectedIndex: 0
    }
  },
  methods: {
    toggleOpen(value) {
      this.open = value;
      if(!this.open) {
        this.selectedIndex = 0;
        return;
      } else {
        this.$refs.popup.focus();
      }
    },
    prevItem() {
      if(this.selectedIndex > 0) {
        this.selectedIndex--;
        this.scrollToSelected();
      }
    },
    nextItem() {
      if(this.selectedIndex < this.items.length-1) {
        this.selectedIndex++;
        this.scrollToSelected();
      }
    },
    selectItem(ind) {
      if(ind >= 0 && this.items[ind]) {
        if(this.callback) {
          this.callback(this.items[ind], ind);
        }
      }
      this.toggleOpen(false);
    },
    getItemName(ind) {
      if(this.nameProp && this.items[ind] && this.items[ind].hasOwnProperty(this.nameProp)) {
        return this.items[ind][this.nameProp];
      }
      return '';
    },
    scrollToSelected() {
      let item = this.$refs.items[this.selectedIndex];
      if(!item) {
        return;
      }

      // the itemsHeight and itemsContHeight could also be cached, but well, there are no other expensive processes running in the background anyways
      let itemBCR = item.getBoundingClientRect();
      let itemsHeight = itemBCR.height; // all items have the same height

      let itemTop = itemsHeight*(this.selectedIndex);
      let itemBottom = itemsHeight*(this.selectedIndex+1);

      let itemsCont = this.$refs.itemscontainer;
      let itemsContHeight = itemsCont.getBoundingClientRect().height;

      if(itemBottom < itemsCont.scrollTop) {
        itemsCont.scrollTop = itemTop;
      }
      if(itemTop > itemsCont.scrollTop + itemsContHeight) {
        itemsCont.scrollTop = itemBottom - itemsContHeight;
      }
      if(itemBottom > itemsCont.scrollTop + itemsContHeight) {
        itemsCont.scrollTop = itemBottom-itemsContHeight;
      }
      if(itemTop < itemsCont.scrollTop) {
        itemsCont.scrollTop = itemTop;
      }

    },
    handleFocusOut() {
      this.toggleOpen(false);
    }
  }
}
</script>

<style>
.popupselect {
  position: absolute;
  top: 0px;
  right: 30px;
  z-index: 1001;
}
.popupselect:focus {
  border: none;
  outline: none;
}

.popupselect-inner-container {
  width: 268px;
  font-weight: normal;
  color: #2d2d2d;
  background-color: white;
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.4);
}
.popupselect-title {
  border-bottom: 1px solid #dcdcdc;
  padding: 8px;
}
.popupselect-items-container {
  max-height: 200px;
  overflow-y: auto;
}

.popupselect-item {
  padding: 6px 8px;
}

.ps-selected {
  background-color: #dcdcdc;
}
</style>
