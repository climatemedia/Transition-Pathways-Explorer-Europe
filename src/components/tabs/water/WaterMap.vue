<template>
  <div class="water-map">
    <div class="water-map-title">{{title}}</div>
    <object type="image/svg+xml" data="/maps/water-map2.svg" v-on:load="getRegions" ref="map"></object>

    <div class="water-map-legend">
      <div v-for="range in ranges" class="water-map-range" :key="range.title">
        <div class="range-color" v-bind:style="{'background-color': range.fillColor}"></div>
        <div class="range-limits">
          <div class="range-limit-left">
            <div v-if="range.from !== undefined">{{range.from}}</div>
          </div>
          <div class="range-limit-middle">
            <div v-if="range.delimiter">{{range.delimiter}}</div>
            <div v-else>-</div>
          </div>
          <div class="range-limit-right">
            <div v-if="range.to !== undefined">{{range.to}}</div>
          </div>
        </div>
        <div class="range-title">{{range.title}}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'WaterMap',
  props: ['appState', 'title', 'data', 'ranges'],
  computed: {
    lastRangeIndex() {
      return this.ranges.length-1;
    }
  },
  methods: {
    getRegions() {

      if(!this.data) {
        return;
      }

      let svgDoc = this.$refs.map.contentDocument;

      Object.keys(this.data).forEach((countryCode) => {

        let elem = svgDoc.getElementById(this.countryCodeMap[countryCode]);

        if(elem) {
          this.regions[countryCode] = {};
          this.regions[countryCode].elem = elem;
          this.regions[countryCode].elem.style.transition = "fill 1s ease";
          let titleElem = elem.getElementsByTagName('title'); //returns a HTMLCollection
          if(titleElem && titleElem.length) {
            this.regions[countryCode].title = titleElem.item(0).innerHTML;
          }
        }
      });
      this.setValues();
    },
    setValues() {
      // needs to be separate from getRegions, because on update only the values change, the references to elems should remain

      Object.keys(this.regions).forEach((countryCode) => {

        let valueSeries;
        if(this.data) {
          valueSeries = this.data[countryCode];
        }

        let value;
        if(valueSeries) {
          // last year of data by default
          value = valueSeries[valueSeries.length-1];
        }

        if(typeof value !== 'undefined') {
          this.regions[countryCode].value = value;
          let rangeInd = this.getRangeIndex(value);
          this.regions[countryCode].rangeIndex = rangeInd;
          this.regions[countryCode].elem.style.fill = this.ranges[rangeInd].fillColor;
        }
      });
    },
    getRangeIndex(value) {
      let rangeIndex = 0;
      let dummyFrom = -Infinity;

      this.ranges.some((range, index) => {

        // lower and upper boundaries are set if missing
        // can be missing for first or last range-entry
        let lower = typeof range.from !== 'undefined' ? range.from : dummyFrom;
        let upper = typeof range.to !== 'undefined' ? range.to : Infinity;

        if(index === this.lastRangeIndex && value >= lower) {
          rangeIndex = index;
          return true;
        }
        if(value >= lower && value < upper) {
          rangeIndex = index;
          return true;
        } else {
          // keep looking
          dummyFrom = upper;
          return false;
        }

      });

      return rangeIndex;
    }
  },
  created() {

    this.regions = {};

    this.countryCodeMap = {
      "AT_whole-country": "AT",
      "BE_whole-country": "BE",
      "BG_whole-country": "BG",
      "CH_whole-country": "CH",
      "CY_whole-country": "CY",
      "CZ_whole-country": "CZ",
      "DE_Danube": "DE-south",
      "DE_ElbeOder": "DE-east",
      "DE_Rhine": "DE-west",
      "DK_whole-country": "DK",
      "EE_whole-country": "EE",
      "EL_N": "GR-west",
      "EL_S": "GR-east",
      "ES_Ebro": "ES-east",
      "ES_NW": "ES-north",
      "ES_S": "ES-south",
      "FI_whole-country": "FI",
      "FR_N": "FR-north",
      "FR_S": "FR-south",
      "HR_whole-country": "HR",
      "HU_whole-country": "HU",
      "IE_whole-country": "IE",
      "IT_M": "IT-middle",
      "IT_N": "IT-north",
      "IT_S": "IT-south",
      "LT_whole-country": "LT",
      "LU_whole-country": "LU",
      "LV_whole-country": "LV",
      "MT_whole-country": "MT",
      "NL_whole-country": "NL",
      "PL_whole-country": "PL",
      "PT_whole-country": "PT",
      "RO_whole-country": "RO",
      "SE_whole-country": "SE",
      "SI_whole-country": "SI",
      "SK_whole-country": "SK",
      "UK_United Kingdom-M": "UK-middle",
      "UK_United Kingdom-N": "UK-north",
      "UK_United Kingdom-S": "UK-south"
    };
  },
  watch: {
    data: function() {
      // Don't use a watch on 'appState.lastAPIResponse',
      // because that watch is used in the parent component already and might fire here first.
      // Use a watch on the data prop instead.
      // Watch on data doesn't need to be deep, because the whole object gets replaced.
      this.setValues();
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
}

.water-map {
  min-width: 400px;
  flex-grow: 1;
  border: 1px solid lightgrey;
  position: relative;
  margin: 10px 25px;
}
.water-map-title {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: white;
  padding: 5px 8px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.water-map object {
  width: 100%;
}
.water-map svg path:hover {
  opacity: 0.5;
}

.water-map-legend {
  margin: 10px 25px;
}
.water-map-range {
  display: flex;
  align-items: center;
}
.range-color {
  width: 25px;
  height: 25px;
}
.range-limits {
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-weight: bold;
}
.range-limit-left {
  flex: none;
  width: 30px;
  text-align: right;
}
.range-limit-middle {
  flex: none;
  width: 30px;
  text-align: center;
}
.range-limit-right {
  flex: none;
  width: 30px;
  text-align: left;
}
.range-title {
  margin-left: 10px;
}

</style>
