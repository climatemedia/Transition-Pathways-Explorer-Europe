export default {
  methods: {
    addSeries() {
      this.chartData.series.forEach((ser) => {
        this.chart.addSeries(ser);
      });
    },
    updateChart() {
      // if no series was set until now
      if(!this.chart.series.length) {
        this.addSeries();
        return;
      }

      this.chart.update({
        series: this.chartData.series
      });
    }
  }
}
