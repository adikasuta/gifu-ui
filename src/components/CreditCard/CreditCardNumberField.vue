<template>
  <div>
    <input style="display: none;" autocomplete="cc-csc"/>
    <ValidationProvider v-if="!isDisabled" v-slot="{ errors }" name="credit_card_number" rules="required|pattern"
      ref="creditCardNumberProvider">
      <v-text-field id="employeeName" autocomplete="off" v-if="!hoverSubmit" :value="content" v-mask="'#### #### #### ####'"
        @input="handleInput" :error-messages="errors" />
      <ReadOnlyField v-else :display="getRaw" :error-messages="errors[0]" />
    </ValidationProvider>
    <v-text-field v-else disabled :value="getRaw" />
  </div>
</template>
<script lang="js">
import Vue from 'vue'
import ReadOnlyField from "../ReadOnlyField";
import { extend, ValidationProvider } from "vee-validate/dist/vee-validate.full";

import { VueMaskDirective } from "v-mask";

extend('pattern', {
  message: () => 'Invalid Credit Card Number. Only Support Visa',
  validate: value => value.match(/^4[0-9]{12}(?:[0-9]{3})?$/)
});
Vue.directive('mask', VueMaskDirective);
export default Vue.extend({
  props: ['value', 'isDisabled', 'hoverSubmit'],
  data() {
    return {
      content: this.value
    }
  },
  computed: {
    getRaw(){
      return this.value
    }
  },
  methods: {
    handleInput(e) {
      this.raw = e;
      let value = e.replace(/\s/g, '');
      this.content = value
      this.$emit('input', value)
    }
  },
  components: {
    ValidationProvider,
    ReadOnlyField
  },
})
</script>