<template>
  <div
    class="drop-down"
    :class="{'dd-open': open===true, 'dd-disabled': disabled===true}"
    v-on:focus="handleFocus"
    v-on:focusout="handleFocusOut"
    v-on:keydown.enter="toggleOpen"
    v-on:click="toggleOpen"
    v-on:keydown.up.prevent="prevItem()"
    v-on:keydown.down.prevent="nextItem()"
    v-on:keydown="jumpToInput($event)"
    tabindex="0"
    ref="root"
  >
    <div class="drop-down-head" ref="head">
      <span>{{getHeadContent}}</span>

      <div class="drop-down-icon" :class="{'dd-open': open===true}">

        <svg
           xmlns="http://www.w3.org/2000/svg"
           width="5.3032866mm"
           height="4.7023478mm"
           viewBox="0 0 5.3032866 4.7023478"
           version="1.1">
          <path
            class="drop-down-icon-path"
            :class="{'dd-disabled': disabled===true}"
            shape-rendering="geometricPrecision"
            transform="matrix(0.99780887,0,0,1.0004305,5.3545276e-4,-0.00148827)"
            d="M 2.6516436,4.2935209 0.40883783,0.40886766 4.8944491,0.40886754 Z"
            style="opacity:1;vector-effect:none;fill:#5f5f5f;fill-opacity:1;stroke:#5f5f5f;stroke-width:0.81773525;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:fill markers stroke" />
        </svg>
      </div>

    </div>
    <div class="drop-down-inner-container" ref="container"
      v-show="open"
      :class="{
        'dd-open': open===true,
        'dd-up': yDir==='up',
        'dd-down': yDir==='down',
      }"
    >
      <div v-if="title && typeof selectedIndex !== 'undefined'" class="drop-down-title">{{this.title}}</div>
      <div class="drop-down-items-container" ref="itemscontainer">
        <div v-for="(item, ind) in items" ref="items" :key="ind"
          class="drop-down-item"
          :class="{'dd-selected': ind===selectedIndex}"
          v-on:click="selectItem(ind)"
        >
          <span>{{getItemName(ind)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DropDown',
  props: {
    items: Array,
    callback: Function,
    title: String, // if not set, the selected item will be used as the title
    nameProp: String, // should be set if items is an array of objects and not strings
    selected: Number, // one index of items, can also be undefined!! Is that possible with that type definition?
    headEmpty: Boolean,
    reset: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      selectedIndex: typeof this.selected !== 'undefined' && this.items[parseInt(this.selected)] ? parseInt(this.selected) : undefined,
      open: false,
      xDir: undefined,
      yDir: undefined
    }
  },
  computed: {
    getHeadContent() {

      if(typeof this.selectedIndex !== 'undefined') {
        return this.getItemName(this.selectedIndex);
      } else {
        if(this.title && !this.headEmpty) {
          return this.title;
        }
        return ''; //default
      }
    }
  },
  methods: {
    jumpToInput(event) {
      if(this.disabled) {
        return;
      }
      /*keyup is kind of a natural rate limiting, but keydown more consistent*/

      let keyPressed = event.key;

      // abort if no single character was pressed
      if(keyPressed.length > 1) {
        return;
      }

      // find index of first item that starts with this character, this means that the items should be sorted,
      // but sorting items is not responsibility of this component, it should be done outside
      let foundInd;
      let itemWasFound = this.items.some((item, ind) => {
        if(this.getItemName(ind)[0] === keyPressed) {//item is still a string!!
          foundInd = ind;
          return true;
        }
      });

      // console.log('jumpToInput ', itemWasFound, foundInd);
      if(itemWasFound && foundInd !== this.selectedIndex) {
        this.selectItem(foundInd);
        this.scrollToSelected();
      }
    },
    toggleOpen() {
      if(this.disabled) {
        return;
      }
      this.open = !this.open;

      if(!this.open) {
        this.$refs.root.blur();
        return;
      }
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setDirections();
          this.scrollToSelected();
        });
      });

      var setDirections = () => {

        let titleBCR = this.$refs.head.getBoundingClientRect();

        let itemsBCR = this.$refs.container.getBoundingClientRect(); //left, right, top, bottom are relative to the viewport!

        let viewPortHeight = window.innerHeight; // inner height of the viewport!
        let titleTop = titleBCR.top;
        let titleBottom = titleBCR.bottom;
        let itemsHeight = itemsBCR.height;

        //check if space is available to the bottom, preferred default direction
        if(titleTop  + itemsHeight <= viewPortHeight) {
          this.yDir = 'down';
        } else {

          //theoretical itemsLeft if items are overlapping to the left:
          let topValueIfItemsGoToTop = titleTop - itemsHeight;
          let bottomValueIfItemsGoToBottom = titleBottom + itemsHeight;

          //open in the direction where there is the most available space
          if(topValueIfItemsGoToTop > bottomValueIfItemsGoToBottom - viewPortHeight) {
            this.yDir = 'up';
          } else {
            this.yDir = 'down';
          }
        }
      }
    },
    selectItem(ind) {
      if(this.disabled) {
        return;
      }
      if(ind >= 0 && this.items[ind]) {
        this.selectedIndex = ind;
        if(this.callback) {
          this.callback(this.items[this.selectedIndex], ind);
        }
      }
    },
    prevItem() {
      if(this.disabled) {
        return;
      }
      if(typeof this.selectedIndex !== 'undefined') {
        this.selectItem(this.selectedIndex-1);
        this.scrollToSelected();
      }
    },
    nextItem() {
      if(this.disabled) {
        return;
      }
      if(typeof this.selectedIndex === 'undefined') {
        this.selectItem(0);
        this.scrollToSelected();
      } else {
        this.selectItem(this.selectedIndex+1);
        this.scrollToSelected();
      }
    },
    getItemName(ind) {
      if(this.nameProp && this.items[ind] && this.items[ind].hasOwnProperty(this.nameProp)) {
        return this.items[ind][this.nameProp];
      }
      return this.items[ind];
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
    handleFocus() {
    },
    handleFocusOut() {
      this.open = false;
    }
  },
  watch: {
    reset: function(newVal) {
      if(newVal) {
        this.selectedIndex = undefined;
      }
    },
    selected: function(newVal) {
      this.selectedIndex = newVal;
    }
  }
}
</script>

<style>
.drop-down {
  position: relative;
  display: inline-block;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
.drop-down.dd-disabled {
  opacity: 0.5;
  font-style: italic;
}
.drop-down-head {
  position: relative;
  overflow: hidden;
}
.drop-down-hidden-items {
  visibility: hidden;
  height: 0px;
}
.drop-down-icon {
  position: absolute;
  height: 10px;
  top: 50%;
  transform: translateY(-50%);
  right: -1px;
}
.drop-down-icon svg {
  display: block;
  height: 100%;
}
.drop-down-inner-container {
  position: absolute;
  min-width: 100%;
  margin: 0px;
  left: 0px;
  background-color: white;
}

.drop-down-inner-container.dd-up { bottom: 100%;}
.drop-down-inner-container.dd-down { top: 100%;}

.drop-down-item {
  white-space: nowrap;
}

.drop-down-item:hover {
  background-color: lightgrey;
}
.drop-down-item.dd-selected {
  background-color: grey;
}

.drop-down-items-container {
  max-height: 250px;
  overflow-y: auto;
}

</style>
