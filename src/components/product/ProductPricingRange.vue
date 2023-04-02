<template>
  <div>
    <BasicForm>
      <template v-slot:header>
        {{ $t("views.product.pricingRange") }}
      </template>
      <template v-slot:body>
        <v-btn elevation="2" class="mr-5" color="primary" @click="handleAdd">
          {{ $t("views.product.addPricingRange") }}</v-btn
        >
        <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th width="25%" class="text-left">
                  {{ $t("views.product.fields.min") }}
                </th>
                <th width="25%" class="text-left">
                  {{ $t("views.product.fields.max") }}
                </th>
                <th width="25%" class="text-left">
                  {{ $t("views.product.fields.price") }}
                </th>
                <th width="25%" class="text-left">
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in pricingRanges" :key="index">
                <td class="pt-5">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Min Qty"
                    :vid="`min ${index + 1}`"
                    :rules="{
                      required: true,
                    }"
                    ref="provider"
                  >
                    <v-text-field
                      outlined
                      type="number"
                      v-model="item.qtyMin"
                      :label="$t('views.product.fields.min')"
                      v-mask="'#####'"
                      :min="pricingRanges[index-1]?pricingRanges[index-1].qtyMax:0"
                      :max="item.qtyMax"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </td>
                <td class="pt-5">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Max Qty"
                    :id="`max ${index + 1}`"
                    ref="provider"
                  >
                    <v-text-field
                      outlined
                      type="number"
                      v-model="item.qtyMax"
                      :label="$t('views.product.fields.max')"
                      
                      v-mask="'#####'"
                      :min="item.qtyMin"
                      :max="pricingRanges[index+1]?pricingRanges[index+1].qtyMin:9999"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </td>
                <td class="pt-5">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Price"
                    :vid="`price${index + 1}`"
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
              <tr v-if="pricingRanges.length === 0">
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
import { extend,ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { mapState, mapWritableState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useProductForm } from "../../store/product-form";
// import { extend } from "vee-validate";

extend("maxRangeRequiredRule", {
  validate: (value, { isLastIndex }) => {
    console.log("For value="+value+"; isLastIndex="+isLastIndex)
    console.log("("+isLastIndex+" || (!"+isLastIndex+" && "+value+"))")
    return false;
    // return (isLastIndex || (!isLastIndex && value));
  },
  message: () =>"Max range is required.",
  params: ["isLastIndex"],
});

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
  // validations: {
  //   value: {
  //     maxRangeRequiredRule: {
  //       validate: (value, { isLastIndex, uniqueId }) => {
  //         console.log(isLastIndex);
  //         return (isLastIndex || (!isLastIndex && value)) && uniqueId === "123";
  //       },
  //       message: "Max range is required.",
  //       params: ["isLastIndex", "uniqueId"],
  //     },
  //   },
  // },
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
    ...mapWritableState(useProductForm, ["pricingRanges"]),
  },
  methods: {
    ...mapActions(useReferenceData, ["getVariantNames"]),
    _remove(index) {
      this.pricingRanges.splice(index, 1);
    },
    async handleAdd() {
      this.pricingRanges.push({
        variantIds: [],
        price: 0,
      });
    },
  },
};
</script>
