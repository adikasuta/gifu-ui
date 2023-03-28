<template>
  <div>
    <div class="product">
      <ImageComponent :filename="picture.img" height="500px"></ImageComponent>
      <h3>{{ productItem.name }}</h3>
      <h4>{{ price }}</h4>
      <h5>{{ productItem.size }}</h5>
      <button link :href="`#/products/${productItem.id}`" class="button">ORDER</button>
    </div>
  </div>
</template>
<script>
import ImageComponent from "../common/ImageComponent";
export default {
  components:{
    ImageComponent,
  },
  props: {
    productItem:{}
  },
  data: () => ({
    
  }),
  methods: {

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