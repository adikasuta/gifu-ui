<template>
  <v-menu
    v-model="dateMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :clearable="clearable"
        v-model="dateRangeText"
        :label="label"
        prepend-inner-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        outlined
        :error-messages="errorMessages"
        @click:clear="handleClear"
      ></v-text-field>
    </template>
    <v-date-picker
      :clearable="clearable"
      color="pink lighten-1"
      v-model="formValue"
      :range="range"
      @input="dateMenu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    errorMessages: [],
    label: String,
    value: null,
    clearable: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dateRangeText() {
      if (this.range && this.formValue) {
        return this.formValue.join(" ~ ");
      }
      return this.formValue;
    },
  },
  methods: {
    handleClear() {
      if (this.range) {
        this.formValue = [];
      } else {
        this.formValue = null;
      }
    },
  },
  data() {
    return {
      formValue: this.value,
      dateMenu: false,
    };
  },
  watch: {
    formValue(e) {
      this.$emit("input", e);
      this.$emit("change", e);
    },
  },
};
</script>
