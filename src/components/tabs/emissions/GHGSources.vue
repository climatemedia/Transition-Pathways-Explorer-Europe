<template>
  <div class="subtab-content">

    <transition name="modal-fade" mode="out-in">
      <SideBarChart :key="currentChart" class="emissions-chart"
        :chart-data="chartsData[currentChart]"
        :go-back="isToplevel ? null: goBack"
        :go-deeper="goDeeper"
      />
    </transition>


  </div>
</template>

<script>
import SideBarChart from '../../../charts/SideBarChart.vue';

export default {
  name: 'GHGSources',
  props: ['subtab','outputs', 'chartDefinitions', 'appState'],
  components: {
    SideBarChart
  },
  data() {
    return {
      chartsData: {},
      currentChart: undefined, // id
      isToplevel: undefined
    }
  },
  methods: {
    goBack() {
      //setting state var that determines animation direction
      if(this.chartChain.length > 1) {
        this.chartChain.pop();
        this.currentChart = this.chartChain[this.chartChain.length-1];
        if(this.chartChain.length > 1) {
          this.isToplevel = false;
        } else {
          this.isToplevel = true;
        }
      }
    },
    goDeeper(target) {
      this.chartChain.push(target)  //strings only! not using references here
      this.currentChart = target;
      this.isToplevel = false;
    },
    buildData() {
      let currChart = this.chartDefinitions[this.subtab.charts[0]];
      let country = 'EU';

      this.chartsData = {};
      Object.keys(currChart.structure).forEach( (chartkey)=> {
        let title;
        if(currChart.structure[chartkey].title) {
          title = currChart.structure.title
        }
        else if (this.outputs[chartkey] && this.outputs[chartkey].title) {
          title = this.outputs[chartkey].title;
        }
        else if (this.outputs[chartkey] && !this.outputs[chartkey].title) {
          title = this.outputs[chartkey]
        }


        let series = [];
        currChart.structure[chartkey].series.forEach((outputId) => {
          if(outputId && this.outputs[outputId] && this.outputs[outputId].data && this.outputs[outputId].data[country]) {
            let data = this.outputs[outputId].data[country];
            series.push({
              name: (this.outputs[outputId] && this.outputs[outputId].title) ? this.outputs[outputId].title : outputId,
              id: outputId,
              value: Math.round(data[data.length-1])
            })
          }
        });

        this.chartsData[chartkey] = {
          title: title,
          unit: currChart.unit,
          series: series
        }
      });

      this.currentChart = this.currentChart ? this.currentChart : "root";
      this.chartChain = this.chartChain ? this.chartChain : [this.currentChart];
      this.isToplevel = this.chartChain.length < 2;

      //check for parts
      Object.keys(this.chartsData).forEach((seriesKey) => {
        this.chartsData[seriesKey].series.forEach((entry) => {
          if(this.chartsData[entry.id]) {
            entry.hasParts = true;
          }
        });
      });

    }
  },
  watch: {
    'appState.lastAPIResponse': function() {
      //console.log('lastAPIResponse changed');
      this.buildData();
    }
  },
  created() {
    this.buildData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.emissions-chart {
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 100px;
  border: 1px solid darkgrey;
}
</style>
