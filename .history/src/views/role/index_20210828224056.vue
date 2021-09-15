<template>
  <div id="app">
    <Son ref="myref" @click="reset"></Son>
  </div>
</template>

<script>
import Son from "./son";
export default {
  mounted() {
    this.$refs.myref.logName();
  },
  components: {
    Son
  },
  methods:{
      reset(){
          this.$refs.myref.logName();
      }
  }
};
</script>