// currently not in use, because the "content" folder needs to be hardcoded and
// the components do not always share the same content-path

export default {
  methods: {
    loadInfoComponent() {
      let fileName = this.subtab.charts[0]+'.vue';

      //import() only works with partial paths, it doesn't take a single variable, like import(filePath). import() is not a function!! It just looks like one
      //This rest is a bit hacky, but well.
      //The first import() looks if the file exists, if not the error is silently caught.
      //If it exists, a second import needs to be started because <component> cannot work directly with the answer of the
      //first succesful fetch. It can only work with a function like this (for dynamic imports):
      //infoComponent = () => import(`../content/${fileName}`)
      import(`./content/${fileName}`)
      .then(() => {
        this.infoComponent = () => import(`./content/${fileName}`);
      })
      .catch(() => {
        // console.log('info component not found');
      });
    }
  }
}
