Vue.component('details', {
  data(){
      return {
          open:false,
      }
  },
  methods: {
      setText(value){
          this.text = value;
      }
  },
  
});