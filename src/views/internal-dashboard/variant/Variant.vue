<template>
  <v-container>
    <slot name="breadcrumb"></slot>
    <v-container>
      <v-btn elevation="2" class="mt-5" small @click="handleAdd">
        {{ $t("views.variant.add") }}</v-btn
      >
    </v-container>

    <SearchVariantTable />
  </v-container>
</template>

<script>
import SearchVariantTable from "../../../components/variant/SearchVariantTable";
export default {
  name: "VariantComponent",
  components: {
    SearchVariantTable,
  },
  data() {
    return {};
  },
  async created() {},
  methods: {
    handleAdd(){
      this.$router.push("/dashboard/variant/add")
    }
  },
};
</script>

<style scoped></style>
