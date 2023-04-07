<template>
  <v-container>
    <slot name="breadcrumb"></slot>
    <v-container>
      <v-btn
        v-if="hasPermission('catalog_add')"
        elevation="2"
        class="mt-5"
        small
        @click="handleAdd"
      >
        {{ $t("views.variant.add") }}</v-btn
      >
    </v-container>

    <SearchVariantTable />
  </v-container>
</template>

<script>
import SessionUtils from "../../../utils/SessionUtils";
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
    ...SessionUtils,
    handleAdd() {
      this.$router.push("/dashboard/variant/add");
    },
  },
};
</script>

<style scoped></style>
