<template>
  <div>
    <div id="header">
      <div id="header-main">
        <div id="page-logo" style="padding-left: 10px;">
          <img src="/img/eucalc_logo-alt5.svg">
          <div id="page-title" class="cursor-pointer">
            EU<span>CALC </span><br>
          </div>
        </div>
      </div>
    </div>
    <div id="exception-content">
      <span>Sorry, EUCALC doesn't yet support Safari or Internet Explorer. Please use a different browser.</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BrowserNotSupported'
}
</script>

<style>
#exception-content {
  position: relative;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
