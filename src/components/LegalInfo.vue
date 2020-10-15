<template>
  <div id="legal-info-cont">
    <div id="legal-info">
      <a :href="appState.mainScreenRouteString">
        <img src="/img/arrow-left.svg">
        <span>return to main screen</span>
      </a>


<h1>LEGAL NOTICE</h1>
<p>
  <b> Responsible for the content of this website</b>
</p>
<p>
  Climate Media Factory UG (haftungsbeschränkt)<br>
  Friedrich-Ebert-Straße 82, 14467 Potsdam (Germany)<br>
  Phone: +49 331 288 2606 <br>
  Email: info at climatemedia.de<br><br>
  Trade Register:  Amtsgericht Potsdam, HRB 24590 P<br>
  <!--  Managing Directors: Jürgen P. Kropp<br>-->
  VAT No.: DE 279271100
</p>

<p><b>Limitation of liability for internal content</b></p>

<p>
  The content of our website has been compiled with meticulous care and to the best of our knowledge. However, we cannot assume any liability for the up-to-dateness, completeness or accuracy of any of the pages.
  Pursuant to section 7, para. 1 of the TMG (Telemediengesetz – Tele Media Act by German law), we as service providers are liable for our own content on these pages in accordance with general laws. However, pursuant to sections 8 to 10 of the TMG, we as service providers are not under obligation to monitor external information provided or stored on our website. Once we have become aware of a specific infringement of the law, we will immediately remove the content in question. Any liability concerning this matter can only be assumed from the point in time at which the infringement becomes known to us.
</p>

<p><b>Limitation of liability for external links</b></p>

<p>
  Our website contains links to the websites of third parties (“external links”). As the content of these websites is not under our control, we cannot assume any liability for such external content. In all cases, the provider of information of the linked websites is liable for the content and accuracy of the information provided. At the point in time when the links were placed, no infringements of the law were recognisable to us. As soon as an infringement of the law becomes known to us, we will immediately remove the link in question.
</p>

<p><b>Copyright</b></p>

<p>
  The content and works published on this website are governed by the copyright laws of Germany. Any duplication, processing, distribution or any form of utilisation beyond the scope of copyright law shall require the prior written consent of the author or authors in question.
</p>

<p><b>Data protection</b></p>

<p>
  A visit to our website can result in the storage on our server of information about the access (date, time, page accessed). This does not represent any analysis of personal data (e.g., name, address or e-mail address). If personal data are collected, this only occurs – to the extent possible – with the prior consent of the user of the website. Any forwarding of the data to third parties without the express consent of the user shall not take place.
  We would like to expressly point out that the transmission of data via the Internet (e.g., by e-mail) can offer security vulnerabilities. It is therefore impossible to safeguard the data completely against access by third parties. We cannot assume any liability for damages arising as a result of such security vulnerabilities.
  The use by third parties of all published contact details for the purpose of advertising is expressly excluded. We reserve the right to take legal steps in the case of the unsolicited sending of advertising information; e.g., by means of spam mail.
</p>

<div class="funding-info">
  <div>
    <div>
    The EUCalc project has received funding from the European Union's Horizon 2020 research and innovation programme under grant agreement No 730459.
    </div>
    <div style="margin-top: 10px">
      This tool, the Transition Pathways Explorer (TPE) reflects the author's views. The European Commission is not liable for any use that may be made of the information contained therein.
    </div>
  </div>

  <img src="/img/eu-flag.svg">
</div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'LegalInfo',
  props: ['appState'],
  components: {
  },
  data() {
    return {
    }
  }
}
</script>

<style>
#legal-info-cont {
  width: 100%;
  overflow: auto;
  padding-top: 10px;
}
#legal-info {
  max-width: 1200px;
  margin: 0px auto;
  padding: 10px;
}

#legal-info a {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
}

#legal-info a img {
  height: 15px;
  margin-right: 10px;
}

#legal-info h1 {
  text-align: center;
  margin-top: 0px;
}

</style>
