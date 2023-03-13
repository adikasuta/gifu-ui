<template>
  <v-select
    :items="items"
    :label="$t('views.workflow.filter')"
    outlined
    :value="content"
    @change="handleChange"
  >
    <template slot="selection" slot-scope="data">
      {{ $t(data.item.text) }}
    </template>
    <template slot="item" slot-scope="data">
      {{ $t(data.item.text) }}
    </template>
  </v-select>
</template>

<script>
export default {
  name: "TranslatedSelection",
  props: ["value", "items"],
  data(){
    return {
        content: this.value
    }
  },
  methods: {
    handleChange(e) {
        this.content = e;
        this.$emit('input', e);
        this.$emit('change',e);
    },
  },
};
</script>

<style scoped></style>
