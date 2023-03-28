<template>
  <div>
    <BasicForm>
      <template v-slot:header>
        {{ $t("views.product.variantPricingCombination") }}
      </template>
      <template v-slot:body>
        <v-btn elevation="2" class="mr-5" color="primary" @click="handleAdd">
          {{ $t("views.product.addVariantPricingCombination") }}</v-btn
        >
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  {{ $t("views.product.fields.variant") }}
                </th>
                <th class="text-left">
                  {{ $t("views.product.fields.price") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in productVariantPrices" :key="index">
                <td class="pt-5">
                  <ValidationProvider
                    v-slot="{ errors }"
                    :name="`Variant ${index + 1}`"
                    rules="required"
                    ref="provider"
                  >
                    <v-autocomplete
                      multiple
                      v-model="item.variantIds"
                      :items="variants"
                      :label="$t('views.product.fields.variant')"
                      outlined
                      :error-messages="errors"
                      cache-items
                    ></v-autocomplete>
                  </ValidationProvider>
                </td>
                <td class="pt-5">
                  <ValidationProvider
                    v-slot="{ errors }"
                    :name="`Price ${index + 1}`"
                    rules="required"
                    ref="provider"
                  >
                    <CurrencyInput
                      v-model="item.price"
                      :label="$t('views.product.fields.price')"
                      :error-messages="errors"
                      :options="currencyOption"
                    />
                  </ValidationProvider>
                </td>
                <td>
                  <v-btn
                    elevation="2"
                    class="mr-5"
                    color="primary"
                    @click="() => _remove(index)"
                  >
                    {{ $t("common.remove") }}</v-btn
                  >
                </td>
              </tr>
              <tr v-if="productVariantPrices.length === 0">
                <td colspan="5">No matching records found</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </BasicForm>
  </div>
</template>

<script>
import StringUtils from "../../utils/StringUtils";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import BasicForm from "../layout/BasicForm";
import CurrencyInput from "../common/CurrencyInput";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { mapState, mapWritableState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useProductForm } from "../../store/product-form";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
export default {
  components: {
    BasicForm,
    CurrencyInput,
    ValidationProvider,
  },
  data() {
    return {
      currencyOption: StringUtils.currencyOption,
      isLoading: false,
      isError: false,
      errorMessage: "",
      currencyMask,
    };
  },
  async created() {},
  computed: {
    ...mapState(useReferenceData, ["variantTypes", "variants"]),
    ...mapWritableState(useProductForm, ["productVariantPrices"]),
  },
  methods: {
    ...mapActions(useReferenceData, ["getVariantNames"]),
    _remove(index) {
      this.productVariantPrices.splice(index, 1);
    },
    async handleAdd() {
      this.productVariantPrices.push({
        variantIds: [],
        price: 0,
      });
    },
  },
};
</script>
