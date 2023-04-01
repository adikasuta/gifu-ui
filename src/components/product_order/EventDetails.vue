<template>
  <PlainForm>
    <template v-slot:body>
      <v-row>
        <v-col cols="12" class="pb-0">
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('views.order.fields.eventName')"
            :vid="`eventName_${index}`"
            :rules="{
              required: true,
            }"
          >
            <v-text-field
              outlined
              v-model="formData.name"
              :error-messages="errors"
              :label="$t('views.order.fields.eventName')"
            ></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" class="pb-0 pt-0">
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('views.order.fields.venue')"
            :vid="`venue_${index}`"
            :rules="{
              required: true,
            }"
          >
            <v-text-field
              outlined
              v-model="formData.venue"
              :error-messages="errors"
              :label="$t('views.order.fields.venue')"
            ></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" sm="6" class="pb-0 pt-0">
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('views.order.fields.date')"
                :vid="`date_${index}`"
                :rules="{
                  required: true,
                }"
              >
                <v-text-field
                  v-model="formData.date"
                  :label="$t('views.order.fields.date')"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </template>
            <v-date-picker
              color="pink lighten-1"
              v-model="formData.date"
              @input="dateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" class="pb-0 pt-0">
          <v-menu
            v-model="timeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('views.order.fields.time')"
                :vid="`time_${index}`"
                :rules="{
                  required: true,
                }"
              >
                <v-text-field
                  :id="`time_${index}`"
                  outlined
                  v-model="formData.time"
                  :label="$t('views.order.fields.time')"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </template>
            <v-time-picker
              color="pink lighten-1"
              v-if="timeMenu"
              v-model="formData.time"
              full-width
              @click:minute="$refs.menu.save(time)"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>
    </template>
    <template v-slot:footer>
      <v-btn v-if="!hideRemoveButton" color="pink lighten-1" @click="handleRemove">
        {{ $t("views.order.fields.removeEvent") }}
      </v-btn>
    </template>
  </PlainForm>
</template>

<script>
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import PlainForm from "../layout/PlainForm";
export default {
  components: {
    ValidationProvider,
    PlainForm,
  },
  props: {
    index: {
      type: Number,
    },
    value: {
      type: Object,
    },
    hideRemoveButton:{
      type: Boolean,
      default: false
    }
  },
  created() {
    this.formData = this.value;
  },
  methods: {
    handleRemove() {
      this.$emit("on:delete", this.index);
    },
  },
  watch: {
    formData() {
      this.$emit("input", this.formData);
    },
  },
  data: () => ({
    date: null,
    time: null,
    timeMenu: false,
    dateMenu: false,
    formData: null,
  }),
};
</script>
