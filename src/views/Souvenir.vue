<template>
<div class="mt10">
  <v-img src="HomepageBanner.png" cover></v-img>
  <v-toolbar
    color="gray"
  >
    <v-divider
      class="mx-4"
      vertical
    ></v-divider>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text>
        PRICE
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn text>
        CATEGORY
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn text>
        MINIMAL ORDER 30 PCS
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <div class="productss">
    <div><theProducts></theProducts>  </div>
    
    <div>dua</div>
    <div>tiga</div>
  </div>

</div>

</template>

<script>
import theProducts from "../../src/components/souvenirs/theProducts.vue";
import GifuProduct from "../../assets/GifuProducts.json"
export default {
  name: "SouvenirComponent",
  components: {theProducts
  },
  data () {
    return {
      status: "",
      GifuProduct,
    };
  },
};
</script>

<style scoped>
div {
  margin: auto;
}

.productss{
  display: flex;
}

.productss div {
  width:30%;
  height: 200px;
  background-color: aqua;
}
</style>

