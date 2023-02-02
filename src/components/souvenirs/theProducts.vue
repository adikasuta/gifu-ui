<template>
  <div>
    <div class="product">
      <v-img :src="img" height="500px"></v-img>
      <h3>{{ name }}</h3>
      <h4>{{ price }}</h4>
      <h5>{{ size }}</h5>
      <button @click="goToOrderSouvenir" class="button">ORDER</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    img: String,
    name: String,
    price: String,
    size: String,
  },
  data: () => ({
    show: false,
  }),
  methods: {
    goToOrderSouvenir() {
      this.$router.push("/OrderSouvenir");
    },
  },
};
</script>

<style scoped>
.product {
  background-color: rgb(255, 255, 255);
  margin: 10px;
  text-align: center;
  border-radius: 10px;
}
.button {
  transition-duration: 0.4s;
  margin: 10px;
  padding: 10px;
  background-color: rgb(161, 161, 161);
  width: 180px;
}

.button:hover {
  background-color: #ffc4ed; /* Green */
  color: white;
}
</style>