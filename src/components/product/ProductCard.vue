<template>
  <v-card class="mx-auto" max-width="344">
    <ImageComponent
      :filename="productItem.picture"
      height="200px"
    ></ImageComponent>

    <v-card-title>
      {{ productItem.name }}
    </v-card-title>

    <v-card-subtitle>
      <span>
        {{ $t("views.product.fields.size") }}: {{ productItem.size }}
      </span>
      <br>
      <span>
        {{ $t("views.product.from") }} <h5> {{ this.productItem.displayPricing.price | toCurrency }}</h5>
      </span>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" text link :href="`#/products/${productItem.id}`"> {{$t("views.product.order")}} </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import ImageComponent from "../common/ImageComponent";
export default {
  components: {
    ImageComponent,
  },
  props: {
    productItem: {},
  },
  computed:{
    displayRange(){
      if(this.productItem.displayPricing){
        if(this.productItem.displayPricing.qtyMax){
          return `${this.productItem.displayPricing.qtyMin} - ${this.productItem.displayPricing.qtyMax}`
        }
        return `> ${this.productItem.displayPricing.qtyMin}`
      }
      return ""
    }
  },
  methods: {},
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
