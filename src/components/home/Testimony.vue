<template>
  <div>
    <h2>TESTIMONY</h2>
    <v-carousel>
      <v-carousel-item v-for="(pages, pageIndex) of testimonies" :key="pageIndex">
        <v-container class="grey lighten-5 mb-6">
          <v-row>
            <v-col md="4" v-for="(item, itemIndex) of pages" :key="itemIndex">
              <ImageCardComponent :img="item.img" :title="item.name"
                :subtitle="item.orderedProduct"
                :description="$t(item.review)" />
            </v-col>
          </v-row>
        </v-container>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import ImageCardComponent from "./ImageCard";
import testimonies from "../../../assets/testimonies.json"
export default {
  name: "TestimonyComponent",
  data() {
    return {
      testimonies,
    }
  },
  components: { ImageCardComponent }
};
</script>

<style scoped>
div {
  text-align: center;
}
h2{
  margin: 30px;
}
</style>