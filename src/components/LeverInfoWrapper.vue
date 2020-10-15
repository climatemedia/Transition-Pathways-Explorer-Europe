<template>
  <component v-if="componentInstance" :is="componentInstance"/>
</template>

<script>

export default {
  name: 'LeverInfoWrapper',
  props: ['leverId'],
  data() {
    return {
      componentInstance: undefined
    }
  },
  methods: {
    loadComponent() {
      let fileName = this.leverId+'.vue';

      //import() only works with partial paths, it doesn't take a single variable, like import(filePath). import() is not a function!! It just looks like one
      //This rest is a bit hacky, but well.
      //The first import() looks if the file exists, if not the error is silently caught.
      //If it exists, a second import needs to be started because <component> cannot work directly with the answer of the
      //first succesful fetch. It can only work with a function like this (for dynamic imports):
      //componentInstance = () => import(`../content/${fileName}`)
      import(`./leverInfos/${fileName}`)
      .then(() => {
        this.componentInstance = () => import(`./leverInfos/${fileName}`);
      })
      .catch(() => {
        // console.log('component not found');
      });
    }
  },
  created() {
    this.componentInstance = this.loadComponent();
  }
}
</script>

<style>
#lever-info {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  min-height: 0px;
  flex-direction: column;
  overflow: hidden;
}
#lever-info-title {
  margin: 0px 0px 0px 0px;
  padding: 10px 0px;
  border-bottom: 2px solid lightgrey;
}
#lever-info-content {
  padding: 10px 30px;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
#lever-info h3 {
  text-align: center;
}
#lever-img-dummy {
  width: 300px;
  height: 180px;
  margin: 15px auto;
  border: 1px solid lightgrey;
}
.lever-info-amibitions {
  margin: 10px 0px;
}
.lever-info-amibitions p {
  margin: 10px 15px 20px 15px;
}
</style>
