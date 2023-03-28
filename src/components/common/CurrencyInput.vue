<template>
  <v-text-field
    ref="inputRef"
    outlined
    :label="label"
    :error-messages="errorMessages"
  ></v-text-field>
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "CurrencyInput",
  props: {
    errorMessages: [],
    label: String,
    value: Number, // Vue 2: value
    options: Object,
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options);

    return { inputRef };
  },
};
</script>
