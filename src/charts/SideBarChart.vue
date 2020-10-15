<template>
  <div class="side-bar-chart">
    <div class="side-bar-chart-header">
      <span class="side-bar-chart-title">{{chartData.title}}</span>
      <span class="side-bar-chart-total">total: {{total}}</span>
      <span class="side-bar-chart-unit" v-html="chartData.unit"></span>
    </div>

    <div class="side-bar-chart-entries-cont"
      :style="{transform: 'translateX('+Math.abs(offset/span)*100+'%)'}"
    >
      <div v-for="entry in chartData.series" class="side-bar-chart-entry" :key="entry.id">
        <span v-if="entry.hasParts" class="side-bar-entry-title side-bar-has-parts" v-on:click="goDeeper(entry.id)"><b>{{entry.name}}</b></span>
        <span v-if="!entry.hasParts" class="side-bar-entry-title">{{entry.name}}</span>
        <span class="side-bar-entry-value">{{entry.value}}</span>
        <div class="side-bar-entrybar"
          :class="{'side-bar-has-parts': entry.hasParts}"
          v-on:click="entry.hasParts ? goDeeper(entry.id): null"
          :style="{
            'transform': 'scaleX('+(entry.value/span)+')',
            }"
        ></div>
      </div>
    </div>

    <div v-if="goBack" class="side-bar-chart-back" v-on:click="goBack()">back</div>
  </div>
</template>

<script>

export default {
  name: 'SideBarChart',
  props: ['chartData', 'goBack', 'goDeeper'],
  //chartData.title, chartData.unit, chartData.series

  data() {
    return {
      min: undefined,
      span: undefined,
      offset: undefined,
      total: undefined
    }
  },
  watch: {
    chartData: {
      handler() {
        this.updateChart();
      }
      //doesn't need to be a deep watch, because the whole object gets replaced
    }
  },
  methods: {
    updateChart() {

      if(!this.chartData) {
        return;
      }

      this.total = 0;
      this.min = Infinity;
      let max = -Infinity;
      for(let i=0, len=this.chartData.series.length; i<len; i++) {
        let val = this.chartData.series[i].value;
        this.total += val;
        if(val > max) {
          max = val;
        }
        if(val < this.min) {
          this.min = val;
        }
      }

      this.span = max - (this.min < 0 ? this.min : 0 );
      this.offset = this.min < 0 ? this.min : 0;

    }
  },
  beforeMount() {
    this.updateChart();
  }
}
</script>

<style>
.side-bar-chart-header {
  display: flex;
  margin-bottom: 20px;
}
.side-bar-chart-title {
  margin-right: auto;
  font-weight: bold;
}
.side-bar-chart-total {

}
.side-bar-chart-unit {
  margin-left: 2px;
}

.side-bar-chart-entries-cont {
  border-left: 1px solid grey;
  transition: transform 0.2s ease;
}

.side-bar-chart-entry {
  margin: 10px 0px;
  position: relative;
}

.side-bar-entry-title {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  left: 5px;
}

.side-bar-entry-value {
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  z-index: 1;
  right: calc(100% + 8px);
}

.side-bar-entrybar {
  width: 100%;
  height: 24px;
  background-color: lightblue;
  transform-origin: left;
  transition: transform 0.3s ease;
}
.side-bar-entrybar.side-bar-has-parts, .side-bar-entry-title.side-bar-has-parts {
  cursor: pointer;
}
.side-bar-chart-back {
  text-align: right;
  text-decoration: underline;
  cursor: pointer;
}
</style>
