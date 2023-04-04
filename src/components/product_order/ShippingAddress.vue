<template>
  <div>
    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.shippingAddress") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.province')"
              vid="province"
              :rules="{
                required: true,
              }"
            >
              <v-autocomplete
                cache-items
                hide-no-data
                hide-details
                v-model="shippingAddressForm.provinceCode"
                :items="provinces"
                :error-messages="errors"
                :label="$t('views.order.fields.province')"
                outlined
                @change="handleChangeProvince"
              ></v-autocomplete>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.city')"
              vid="city"
              :rules="{
                required: true,
              }"
            >
              <v-autocomplete
                cache-items
                hide-no-data
                hide-details
                v-model="shippingAddressForm.cityCode"
                :items="cities"
                :error-messages="errors"
                :label="$t('views.order.fields.city')"
                outlined
                @change="handleChangeCity"
              ></v-autocomplete>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.district')"
              vid="district"
              :rules="{
                required: true,
              }"
            >
              <v-autocomplete
                cache-items
                hide-no-data
                hide-details
                v-model="shippingAddressForm.districtCode"
                :items="districts"
                :error-messages="errors"
                :label="$t('views.order.fields.district')"
                outlined
                @change="handleChangeDistrict"
              ></v-autocomplete>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.kelurahan')"
              vid="kelurahan"
              :rules="{
                required: true,
              }"
            >
              <v-autocomplete
                cache-items
                hide-no-data
                hide-details
                v-model="shippingAddressForm.kelurahanCode"
                :items="kelurahans"
                :error-messages="errors"
                :label="$t('views.order.fields.kelurahan')"
                outlined
              ></v-autocomplete>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.postalCode')"
              vid="postalCode"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="shippingAddressForm.postalCode"
                :error-messages="errors"
                :label="$t('views.order.fields.postalCode')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" class="pb-0 pt-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.detailAddress')"
              vid="detailAddress"
              :rules="{
                required: true,
              }"
            >
              <v-textarea
                :error-messages="errors"
                v-model="shippingAddressForm.address"
                :label="$t('views.order.fields.detailAddress')"
                outlined
                rows="5"
                max-height="200"
              ></v-textarea>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.preferredShippingVendor") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-col cols="12" sm="6" class="pb-0 pt-0">
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('views.order.fields.preferredShippingVendor')"
            vid="preferredShippingVendor"
            :rules="{
              required: true,
            }"
          >
            <v-select
              v-model="shippingAddressForm.preferredShippingVendor"
              :items="shippingVendors"
              :error-messages="errors"
              :label="$t('views.order.fields.preferredShippingVendor')"
              outlined
            ></v-select>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="6" class="pb-0 pt-0">
          <v-checkbox color="pink lighten-1" 
            v-model="shippingAddressForm.useWoodenCrate"
            :label="$t('views.order.fields.woodenCrate')"
          ></v-checkbox>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { mapWritableState, mapState, mapActions } from "pinia";
import { useOrderProductForm } from "../../store/order-form";
import { useReferenceData } from "../../store/reference-data";
export default {
  components: {
    ValidationProvider,
  },
  computed: {
    ...mapState(useReferenceData, [
      "provinces",
      "cities",
      "districts",
      "kelurahans",
      "shippingVendors",
    ]),
    ...mapWritableState(useOrderProductForm, ["shippingAddressForm"]),
  },
  created() {},
  methods: {
    ...mapActions(useReferenceData, [
      "resetCities",
      "resetKelurahan",
      "resetDistricts",
      "loadCities",
      "loadDistricts",
      "loadKelurahan",
    ]),
    handleChangeProvince() {
      this.resetKelurahan();
      this.resetDistricts();
      this.resetCities();
      this.shippingAddressForm.cityCode = null;
      this.shippingAddressForm.districtCode = null;
      this.shippingAddressForm.kelurahanCode = null;
      this.loadCities(this.shippingAddressForm.provinceCode);
    },
    handleChangeCity() {
      this.resetKelurahan();
      this.resetDistricts();
      this.shippingAddressForm.districtCode = null;
      this.shippingAddressForm.kelurahanCode = null;
      this.loadDistricts(this.shippingAddressForm.cityCode);
    },
    handleChangeDistrict() {
      this.resetKelurahan();
      this.shippingAddressForm.kelurahanCode = null;
      this.loadKelurahan(this.shippingAddressForm.districtCode);
    },
  },
  data: () => ({}),
};
</script>
