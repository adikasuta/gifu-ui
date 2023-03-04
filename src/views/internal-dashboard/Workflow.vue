<template>
    
</template>
  
  <script>
  export default {
    data() {
      return {
        counter: 0,
      };
    },
    methods: {
      goToCart(){
              this.$router.push('/Cart')
          },
      next() {
        this.counter++;
        this.$emit(this.counter);
      },
      previous() {
        this.counter--;
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  