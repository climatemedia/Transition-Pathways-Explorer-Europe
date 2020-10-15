<template>
  <div>
    <div v-if="appState.pathwayIndex < 0" class="subtab-error">
      <p>
        Data for this tab is only available for example pathways.<br>
        Please choose an example pathway.
      </p>
    </div>
    <div v-if="appState.pathwayIndex > -1 && noData" class="subtab-error">
      <p v-if="appState.pathwayIndex > 0">
        There is no data yet available for this example pathway.
      </p>
      <p v-if="appState.pathwayIndex === 0">
        There is no data for the EU reference (EUREF) pathway since it is coherent with the economic global baseline scenario against which the transboundary effects are simulated.
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NoPathwayNotification',
  props: ['appState', 'noData']
}

</script>

<style>
</style>
