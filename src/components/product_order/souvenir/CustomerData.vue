<template>
  <div>
    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.customerData") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.name')"
              vid="name"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="customerInfoForm.customerName"
                :error-messages="errors"
                :label="$t('views.order.fields.name')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.email')"
              vid="email"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="customerInfoForm.customerEmail"
                :error-messages="errors"
                :label="$t('views.order.fields.email')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pt-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.phoneNumber')"
              vid="phoneNumber"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="customerInfoForm.phoneNumber"
                :error-messages="errors"
                :label="$t('views.order.fields.phoneNumber')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.bridegroom") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.bride')"
              vid="bride"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="SOUVENIR.brideName"
                :error-messages="errors"
                :label="$t('views.order.fields.bride')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.groom')"
              vid="groom"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="SOUVENIR.groomName"
                :error-messages="errors"
                :label="$t('views.order.fields.groom')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.eventDetail") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12" sm="6" class="pb-0">
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
                  vid="eventDate"
                  :rules="{
                    required: true,
                  }"
                >
                  <v-text-field
                    v-model="SOUVENIR.eventDate"
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
                v-model="SOUVENIR.eventDate"
                @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.venue')"
              vid="venue"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="SOUVENIR.eventVenue"
                :error-messages="errors"
                :label="$t('views.order.fields.venue')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <ShippingAddress />

    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.referralCode") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-text-field
          outlined
          v-model="SOUVENIR.csReferralToken"
          :error-messages="errors"
          :label="$t('views.order.fields.referralCode')"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ShippingAddress from "../ShippingAddress";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { mapWritableState, mapState } from "pinia";
import { useOrderProductForm } from "../../../store/order-form";
import VariantTypeCodes from "../../../constants/VariantTypeCodes";
export default {
  components: {
    ValidationProvider,
    ShippingAddress,
  },
  props: [],
  computed: {
    ...mapWritableState(useOrderProductForm, ["customerInfoForm", "SOUVENIR"]),
    ...mapState(useOrderProductForm, [
      "getReferenceContents",
      "getReferenceVariants",
    ]),
  },
  methods: {},
  data: () => ({
    VariantTypeCodes,
    dateMenu: false,
  }),
};
</script>
