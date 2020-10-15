export default {
  methods: {
    fixAxis() {
      let currMax = this.chart.yAxis[0].max;
      let currMin = this.chart.yAxis[0].min;

      this.axisFixed = true;

      // Highcharts still rounds to the next full values
      this.chart.yAxis[0].update({
        max: currMax,
        min: currMin
      });

    },
    freeAxis() {
      this.axisFixed = false;

      // Highcharts now automatically calculates the value
      this.chart.yAxis[0].update({
        max: null,
        min: null
      });
    }
  }
}
