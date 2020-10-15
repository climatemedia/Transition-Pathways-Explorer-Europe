<template>
<div id="intro">
  <div class="intro-sheet">
    <h2>Intro</h2>

    <div class="intro-sheet-content">
      <p>
      <b>How would you decarbonise Europe?</b>
      </p>
      <p style="text-align: right">
      <b>Would your pathway be fast enough to meet the Paris accord goals?</b>
      </p>
      <p style="padding-left: 20px">
      <b>In which sector would you be most ambitious?</b>
      </p>
      <p style="text-align: right; padding-right: 50px; margin-bottom: 50px;">
      <b>Which levers do you consider most powerful?</b>
      </p>
      <p>
      This Transition Pathways Explorer allows you to run your own emission scenarios, powered by the <a target="_blank" href="http://www.european-calculator.eu" rel="noopener">EUCalc</a> model, and directly visualise its effects.
      </p>
      <p>
      Based on the ambition level you choose for each sector, The EUCalc model projects the energy and material use, greenhouse gas emissions and the consequent societal, environmental and land use impacts.
      </p>
      <p>
      Co-designed with scientific and societal actors, the model is fully transparent and open-source.
      </p>
      <p>
      You can start calculating right away or find out more in our <span id="how-to-opener" v-on:click="openHowToModal">How-to video</span>.
      </p>
      <div class="funding-info">
        <div>
          The EUCalc project has received funding from the European Union's Horizon 2020 research and innovation programme under grant agreement No 730459.
        </div>
        <img src="/img/eu-flag.svg">
      </div>
    </div>

  </div>
  <div id="intro-navigation">
    <span class="pill-button">
      <a href="/budget">choose warming and fairness</a>
    </span>
    <span class="pill-button" style="margin-left: 15px;">
      <a href="/app">skip</a>
    </span>
  </div>
</div>
</template>

<script>

export default {
  name: 'Intro',
  props: ['appState', 'openHowToModal'],
  mounted() {
    window.scroll(0, 0);
  }
}
</script>

<style>
#intro {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  max-height: 100%;
}
#intro h2 {
  text-align: center;
  margin-bottom: 30px;
}
#intro p {
  font-size: 16px;
  margin: 25px 0px;
}
.intro-sheet {
  width: 100%;
  max-width: 700px;
  padding: 50px 10px 30px 10px;
  box-sizing: border-box;
}
.intro-sheet a {
  color: black;
  font-weight: bold;
}
.intro-sheet-content {
  background-color: white;
  padding: 5px 30px;
  line-height: 24px;
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.06);

}
#intro-navigation {
  padding: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 0px auto;
}
#how-to-opener {
  cursor: pointer;
  font-weight: bold;
}
</style>
