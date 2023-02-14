<template>
    <div class="cont" v-if="counter === 0">
      <div class="productdetails">
        <ProductDescriptions
        v-for="item in getShortList(1)"
        :key="item.name"
        :img="item.img"
        :name="item.name"
        :price="item.price"
        :size="item.size"
      ></ProductDescriptions>
      </div>
      <div class="orderform">
        <OrderForm></OrderForm>
      </div>
    </div>
</template>

<script>
import ProductDescriptions from "../../src/components/orders/ProductDescriptions.vue";
import OrderForm from "../../src/components/orders/OrderForm.vue";
import GifuProduct from "../../assets/GifuProducts.json"
export default {
  name: "OrderSouvenirComponent",
  components: { ProductDescriptions, OrderForm },
  data() {
    return {
      status: "",
      GifuProduct,
      counter: 0
    };
  },
  methods: {
    getShortList(shortListSize) {
      return this.GifuProduct.slice(0, shortListSize);
    }
}
}
  </script>
   <style scoped>
  .cont{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:20px;
    margin:20px;
    height:auto;
  }
  .productdetails{
    padding: 120px;
  }
.orderform{

  padding: 120px;
}
  </style>