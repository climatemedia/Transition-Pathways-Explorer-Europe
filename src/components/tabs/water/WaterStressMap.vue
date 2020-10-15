<template>
  <div class="subtab-content">
    <h2>{{subtab.longTitle}}</h2>
    <div id="water-maps-container">
      <WaterMap :last-api-response="appState.lastAPIResponse" :data="chart1Data" :ranges="chart1Ranges" :title="chart1Title"/>
      <WaterMap :last-api-response="appState.lastAPIResponse" :data="chart2Data" :ranges="chart2Ranges" :title="chart2Title"/>
    </div>
    <div class="chart-info">
      <p>
        The Water Exploitation Index (WEI) is an indicator of the level of pressure that human activity exerts on the natural water resources of a particular territory.         It helps to identify the regions that have high demand in relation to their resources and therefore prone to suffer from water stress.
      </p>
      <p>
      </p>
      <p>
        Traditionally, the WEI has been defined as the ratio between the annual total water abstraction and the available long-term freshwater resources.
      </p>
      <p>
        In EUCalc, we use the Water Exploitation Index “normal” (WEI-normal), defined as the ratio between water consumption and local water availability (locally produced runoff and subsurface runoff, does not include the water that is entering and leaving one region within a particular period of time).
      </p>
      <p>
        Consequently, WEI-normal will be higher for regions that hardly generate local water. Note that the WEI-normal indicator does not provide information on extreme events, such as floods or droughts, that generally occur in localized areas and during short period of time. You can find information on the exposure to droughts and floods in the Climate tab.
      </p>
    </div>
  </div>
</template>

<script>
import WaterMap from './WaterMap.vue';

export default {
  name: 'WaterStressMap',
  components: {
    WaterMap
  },
  // countrycode is not needed but still listed, so it doesn't appear as an attribute in the html
  props: ['subtab','outputs','chartDefinitions','appState', 'countrycode'],
  data() {
    return {
      chart1Data: undefined,
      chart2Data: undefined
    }
  },
  methods: {
    getDataChart1() {
      if(this.outputs[this.chart1Output] && this.outputs[this.chart1Output].data) {
        this.chart1Data = this.outputs[this.chart1Output].data
      }
    },
    getDataChart2() {
      if(this.outputs[this.chart2Output] && this.outputs[this.chart2Output].data) {
        this.chart2Data = this.outputs[this.chart2Output].data
      }
    }
  },
  created() {

    let chart1 = this.chartDefinitions[this.subtab.charts[0]];
    let chart2 = this.chartDefinitions[this.subtab.charts[1]];

    // range colors in JSON
    // colors: base color: #ffeee6, for blue complementary colors are used, like E6F7FF, and monochromatic variations of them
    // https://www.color-hex.com/color/b4e7ff

    this.chart1Ranges = chart1.ranges;
    this.chart2Ranges = chart2.ranges;
    this.chart1Title = chart1.title;
    this.chart2Title = chart2.title;

    this.chart1Output = chart1.outputs[0].id;
    this.chart2Output = chart2.outputs[0].id;

    this.getDataChart1();
    this.getDataChart2();
  },
  watch: {
    'appState.lastAPIResponse': function() {
      this.getDataChart1();
      this.getDataChart2();
    }
  }
}
</script>

<style>
#water-maps-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
