<template>
  <div class="tab-nav" ref="tabnav">

    <div v-if="paginationNeeded" ref="arrow">
      <div class="tab-nav-arrow tn-left"
        :class="{'tn-active': holderPos!==0}" v-on:click="goBack"
      >
        <img src="/img/arrow-left.svg">
      </div>
      <div class="tab-nav-arrow tn-right"
        v-if="paginationNeeded"
        :class="{'tn-active': holderPos < holderWidth-containerWidth}" v-on:click="goForward"
      >
        <img src="/img/arrow-right.svg">
      </div>
    </div>

    <div class="tab-nav-cont" ref="container" :class="{'tn-paginated': paginationNeeded}">

      <div class="tab-nav-holder" ref="holder"
        :class="{'tn-inactive': noTransition}"
        :style="{transform: 'translateX(-'+holderPos+'px)'}"
      >
        <span v-for="(tab,index) in tabs" ref="tab" :key="tab.title" class="tab-item"
          :class="{
            selected:tabIndex===index,
            'tn-left': tabIndex===index && isLeftDirection,
            'tn-right': tabIndex===index && !isLeftDirection,
          }"
          v-on:click="selectTab(index)"
        >
          <div class="tab-item-title">
            <span>{{tab.title}}</span>
            <span v-if="tabsWithWarnings.indexOf(tab.route) >= 0" class="tab-item-warning">!</span>
          </div>
        </span>
      </div>

    </div>

  </div>
</template>

<script>
// needs the outputsService for the tabsWithWarnings
import * as outputsService from '../outputsService.js';

export default {
  name: 'TabNavigation',
  props: ['tabs', 'tabIndex', 'callback'],
  data() {
    return {
      paginationNeeded: undefined,
      noTransition: true,
      holderPos: undefined,
      containerWidth: undefined,
      holderWidth: undefined,
      isLeftDirection: undefined,
      tabsWithWarnings: outputsService.tabsWithWarnings
    }
  },
  methods: {
    selectTab(index) {
      clearTimeout(this.panTimerId);

      if(index < this.tabIndex) {
        this.isLeftDirection = true;
      } else {
        this.isLeftDirection = false;
      }

      // check wether item is fully visible, if not make it fully visible
      let item = this.tabItems[index];

      // item was clicked, so no need to check weather it is inside the visible portion
      if(item.left < this.holderPos) {
        if(index === 0) {
          this.holderPos = 0;
        } else {
          this.holderPos = item.left
        }
      }

      if(item.right > this.holderPos + this.containerWidth) {
        this.holderPos = item.right - this.containerWidth;
      }

      this.activeHolderPos = this.holderPos;
      this.callback(index);

    },
    autoPanBack() {
      clearTimeout(this.panTimerId);
      this.panTimerId = setTimeout(() => {
        this.holderPos = this.activeHolderPos;
      }, 4000);
    },
    updateActiveHolderPos() {
      // check if active item is still visible
      let itemLeft = this.tabItems[this.tabIndex].left;
      let itemRight = this.tabItems[this.tabIndex].right;
      let holderLeft = this.holderPos;
      let holderRight = this.holderPos + this.containerWidth;
      if(
          (itemLeft > holderLeft && itemLeft < holderRight) ||
          (itemRight > holderLeft && itemRight < holderRight)
        ) {
            this.activeHolderPos = this.holderPos;
      }
    },
    goBack() {
      this.autoPanBack();

      let newStartingItem;

      // find first item, that starts on the left side of current portion
      for(let i=this.tabItems.length-1; i >= 0; i--) {
        if(this.tabItems[i].left < this.holderPos) {
          newStartingItem = this.tabItems[i];
          break;
        }
      }

      if(!newStartingItem) {
        return;
      }

      if(newStartingItem.right >= this.containerWidth) {
        this.holderPos = newStartingItem.right-this.containerWidth;
      } else {
        this.holderPos = 0;
      }

      this.updateActiveHolderPos();
    },
    goForward() {
      this.autoPanBack();
      // find the next element which rightPosition is bigger than holderPos,
      // make this elements leftPos the new holderPos if the remaining space is bigger than containerWidth
      // if remaining space is smaller
      let newStartingItem;

      // Array.find() not supported by Internet Explorer
      this.tabItems.some((item) => {
         if(item.right > this.holderPos + this.containerWidth) {
           newStartingItem = item;
           return true;
         }
      });

      if(!newStartingItem) {
        return;
      }

      if(newStartingItem.remainingSpace >= this.containerWidth) {
        this.holderPos = newStartingItem.left;
      } else {
        this.holderPos = this.holderWidth - this.containerWidth;
      }

      this.updateActiveHolderPos();
    },
    getPositions() {
      this.tabItems = [];

      if(this.$refs.container) {
        this.containerWidth = this.$refs.container.getBoundingClientRect().width;
      }

      // if pagination is needed but the pagination-arrows are not rendered yet
      if(!this.$refs.arrow && this.paginationNeeded) {
        this.containerWidth -= this.paginationWidth;
      }

      let itemLeft = 0;
      this.$refs.tab.forEach((tab, ind) => {
        let itemWidth = tab.getBoundingClientRect().width;
        let itemMarginLeft = parseInt(window.getComputedStyle(tab).getPropertyValue('margin-left'));
        let itemMarginRight = parseInt(window.getComputedStyle(tab).getPropertyValue('margin-right'));

        itemWidth += itemMarginLeft + itemMarginRight;

        this.tabItems.push({
          left: itemLeft,
          width: itemWidth,
          right: itemLeft + itemWidth,
          title: this.tabs[ind].title,
          remainingSpace: this.holderWidth - itemLeft
        });
        itemLeft += itemWidth;
      });
    },
    findPosOfActiveTab() {

      // go find in which portion the activeTab starts
      // if it ends in the next portion add the difference in px

      // check if activeTab is fully inside one portion
      let numPortions = Math.ceil(this.holderWidth / this.containerWidth);
      let leftOfActive = this.tabItems[this.tabIndex].left;
      let rightOfActive = this.tabItems[this.tabIndex].right;

      for(let i=1; i<=numPortions; i++) {
        if(leftOfActive < this.containerWidth*i) {
          if(i<numPortions) {
            this.holderPos = this.containerWidth*(i-1);
            // before last Portion, overlap possible
            if(rightOfActive > this.containerWidth*i) {
              // if active Element overlaps its portion, add the overlap to the holderPos
              this.holderPos += rightOfActive - this.containerWidth*i;
            }
          }
          if(i === numPortions) {
            // last Portion, no overlap possible
            // the last portion can be smaller than the containerWidth, so this assignment is safe:
            this.holderPos = this.holderWidth - this.containerWidth;
          }

          break;
        }
      }

      this.activeHolderPos = this.holderPos;

    },
    checkPagination() {
      this.paginationNeeded = false;
      if(this.$refs.holder) {
        this.holderWidth = this.$refs.holder.getBoundingClientRect().width;
      }
      if(this.$refs.tabnav.getBoundingClientRect().width < this.holderWidth) {
        this.paginationNeeded = true;
      }
    },
    showTabs() {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          this.noTransition = false;
        });
      });
    },
    redraw() {
      // only redraw when resizing is complete, not on every single resize event
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.checkPagination();
        if(this.paginationNeeded) {
          this.getPositions();
          this.findPosOfActiveTab();
        } else {
          // reset to beginning if no pagination needed
          this.holderPos = 0;
          this.getPositions();
        }
      }, 100);
    }
  },
  created() {
    // needed for automatically panning back after inactivity after scrolling
    this.activeHolderPos = undefined;

    this.panTimerId = undefined;

    // hardcoded, well..
    this.paginationWidth = 40;

    this.timerId = undefined;
    window.addEventListener('resize', this.redraw);
  },
  mounted() {
    this.checkPagination();
    this.getPositions();
    this.findPosOfActiveTab();
    this.showTabs();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.redraw);
  }
}
</script>

<style>
.tab-nav {
  width: 100%;
  /*height needs to be set by containing element (outer container that holds this component)*/
  height: 100%;
  position: relative;
  background-color: white;
  overflow: hidden;
}
.tab-nav-arrow {
  height: 100%;
  width: 20px;
  position: absolute;
  top: 0px;
  z-index: 10;
}
.tab-nav-arrow::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 5px;
  background-color: white;
}
.tab-nav-arrow.tn-left {
  left: 0px;
  background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 80%, rgba(255, 255, 255, 0) 100%);
}
.tab-nav-arrow.tn-right {
  right: 0px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 1) 100%);
}
.tab-nav-arrow img {
  position: absolute;
  height: 16px;
  display: block;
  top: 40%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.tab-nav-arrow.tn-right img {
  right: 0px;
}
.tab-nav-arrow.tn-left img {
  left: 0px;
}
.tab-nav-arrow.tn-active img {
  opacity: 1;
  cursor: pointer;
}

.tab-nav-cont {
  /*can't use flex with flex-grow, because on page-load .tab-nav-cont doesn't take up full width,
  only after 150ms it would. Use as normal block-div works,
  but then the arrows need to use position absolute */
  height: 100%;
  margin: 0px;
  position: relative;

}
.tab-nav-cont.tn-paginated {
  margin: 0px 20px;
}
.tn-mask {
  flex: none;
  width: 10px;
  align-self: stretch;
  z-index: 2;
  pointer-events: none;
}
.tn-mask-left {
  background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}
.tn-mask-right {
  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}

.tab-nav-holder {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  display: flex;
  align-items: center;
  transition: transform 1s cubic-bezier(0.35, 0, 0.25, 1);
}
.tab-nav-holder.tn-inactive {
  transition-duration: 0s;
}

</style>
