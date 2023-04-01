<template>
  <v-card>
    <v-card-title>
      <slot name="header"></slot>
    </v-card-title>
    <v-divider v-if="addDivider" class="mb-5"></v-divider>
    <v-card-text>
      <slot name="body"></slot>
    </v-card-text>
    <v-card-actions
      style="flex-direction: row-reverse"
      class="pt-5 pb-5 pr-5 pl-5"
    >
      <slot name="footer"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PlainForm",
  props: {
    addDivider: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
