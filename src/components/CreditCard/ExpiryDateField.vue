<template>
  <v-row v-if="!isDisabled">
    <v-col :cols="4">
      <ValidationProvider v-slot="{ errors }" name="expiration_month"
        rules="required|digits:2|validMonth|noBackDate:@expiration_year" ref="provider">
        <v-text-field v-mask="[/0|1/, /\d/]" autocomplete="off" class="expirationMonth" v-model="month"
          :error-messages="errors" @change="handleChange" />
      </ValidationProvider>
    </v-col>
    <v-col :cols="8">
      <ValidationProvider v-slot="{ errors }" name="expiration_year" rules="required|digits:4|validYear" ref="provider">
        <v-text-field v-mask="'####'" autocomplete="off" class="expirationYear" v-model="year"
          :error-messages="errors" @change="handleChange" />
      </ValidationProvider>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col :cols="4">
      <v-text-field disabled class="expirationMonth" :value="getMonth" />
    </v-col>
    <v-col :cols="8">
      <v-text-field disabled class="expirationYear" :value="getYear" />
    </v-col>
  </v-row>
</template>

<script>
import { extend, ValidationProvider } from "vee-validate/dist/vee-validate.full";
import moment from 'moment';
extend('validMonth', {
  message: () => 'Invalid Month Format',
  validate: value => value.match(/^(0?[1-9]|1[012])$/)
});
extend('validYear', {
  message: () => 'Invalid Year Format',
  validate: value => value.match(/^[2][0-9]{3}$/)
});
extend('noBackDate', {
  message: () => 'Can\'t be backdated',
  params: ['year'],
  validate: (value, { year }) => {
    if (year != null) {
      const currentMonth = moment().set('date', 1)
      const dateValue = moment(`01-${value}-${year}`,"DD-MM-YYYY");
      return moment(dateValue).isAfter(currentMonth)
    }
    return false;
  }
})
export default {
  name: 'ExpiryDateField',
  props: ['value', 'isDisabled'],
  data() {
    return {
      content: this.value,
      year: null,
      month: null
    }
  },
  computed: {
    getMonth() {
      if (this.value) {
        return moment(this.value).format('MM');
      }
      return ''
    },
    getYear() {
      if (this.value) {
        return moment(this.value).format('YYYY');
      }
      return ''
    },
    getText() {
      if (this.value) {
        const year = moment(this.value).format('YYYY')
        const month = moment(this.value).format('MM')
        return `${month}/${year}`
      }
      return ''
    }
  },
  components: {
    ValidationProvider
  },

  methods: {
    handleChange() {
      this.content = moment()
      if (this.month) {
        const currentMonth = (parseInt(this.month) - 1)
        this.content.set('month', currentMonth)
      }
      if (this.year) this.content.set('year', this.year)
      this.$emit('input', this.content)
    }
  }
}
</script>