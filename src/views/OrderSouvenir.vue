<template>
    <div class="cont">
      <div class="productdetails">
        <ProductDescriptions
        v-for="item in GifuProduct"
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
export default {
  name: "OrderSouvenirComponent",
  components: { ProductDescriptions, OrderForm },
  data() {
    return {
      status: "",
      GifuProduct: [
        {
          name: "Card Holder A",
          price: "Rp 6500",
          size: "8 x 8 cm",
        },
        {
          name: "Card Holder B",
          price: "Rp 6500",
          size: "8 x 8 cm",
        },
        {
          name: "Card Holder B",
          price: "Rp 6500",
          size: "8 x 8 cm",
        },
      ],
    };
  },
}
  </script>
   <style scoped>
  .cont{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:20px;
    margin:20px;
  }
  .productdetails{
    height: 500px;
    padding: 120px;
  }
.orderform{
  background-color: green;
}
  </style>