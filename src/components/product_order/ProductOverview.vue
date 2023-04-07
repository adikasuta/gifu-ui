<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <div style="padding: 0 100px 0 100px !important">
          <ImageComponent :filename="existingPicture" />
        </div>
      </v-col>
      <v-col cols="12" class="text-center">
        <h3>{{ name }}</h3>
        <span v-if="getPrice>0">{{ getPrice | toCurrency  }}</span>
        <br v-if="getPrice>0">
        <span>{{ length }} x {{ width }} cm</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-container>
          <p>{{ description }}</p>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImageComponent from "../common/ImageComponent";
import { mapState } from "pinia";
import { useOrderProductForm } from "../../store/order-form";
export default {
  name: "ProductOverview",
  components: { ImageComponent },
  data() {
    return {};
  },
  async created() {},
  computed: {
    ...mapState(useOrderProductForm, [
      "existingPicture",
      "name",
      "length",
      "width",
      "getPrice",
      "description"
    ]),
  },
  methods: {},
};
</script>

<style scoped></style>
