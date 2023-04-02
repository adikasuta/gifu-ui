<template>
  <div>
    <BasicForm>
      <template v-slot:header>
        {{ $t("views.product.variationFormSetting") }}
      </template>
      <template v-slot:body>
        <v-btn
          elevation="2"
          class="mr-5"
          color="primary"
          @click="handleAddVariationSetting"
        >
          {{ $t("views.product.addVariationFormSetting") }}</v-btn
        >
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th width="30%" class="text-left">
                  {{ $t("views.product.fields.variantType") }}
                </th>
                <th width="30%" class="text-left">
                  {{ $t("views.product.fields.variant") }}
                </th>
                <th width="20%" class="text-left">
                  {{ $t("views.product.fields.willBeVisibleWhen") }}
                </th>
                <th width="20%" class="text-left">
                  {{ $t("views.product.fields.action") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in productVariantViews" :key="index">
                <td class="pt-5">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Variant Type"
                    :vid="`Variant Type ${index+1}`"
                    rules="required"
                    ref="provider"
                  >
                    <v-select
                      v-model="item.variantTypeCode"
                      :items="variantTypes"
                      :label="$t('views.product.fields.variantType')"
                      outlined
                      item-disabled="disabled"
                      :error-messages="errors"
                      @change="
                        () => {
                          handleVariantTypeCodeChange(index);
                        }
                      "
                    ></v-select>
                  </ValidationProvider>
                </td>
                <td class="pt-5">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Variant"
                    :vid="`Variant ${index+1}`"
                    rules="required"
                    ref="provider"
                  >
                    <v-select
                      multiple
                      v-model="item.variantIds"
                      :items="getVariantsSelection(item.variantTypeCode)"
                      :label="$t('views.product.fields.variant')"
                      outlined
                      :error-messages="errors"
                    ></v-select>
                  </ValidationProvider>
                </td>
                <td>
                  {{ $t(getRuleDescription(index)) }}
                </td>
                <td>
                  <v-btn
                    elevation="2"
                    color="primary"
                    class="mr-5"
                    @click="
                      () => {
                        handleChangeVisibilityRule(index);
                      }
                    "
                  >
                    {{ $t("views.product.modifyRule") }}</v-btn
                  >
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
              <tr v-if="productVariantViews.length === 0">
                <td colspan="5">No matching records found</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </BasicForm>
    <ModifyVariationVisibilityRulePopup
      ref="modifyVariationVisibilityRulePopup"
    />
  </div>
</template>

<script>
import BasicForm from "../layout/BasicForm";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import ModifyVariationVisibilityRulePopup from "./ModifyVariationVisibilityRulePopup";
import { mapState, mapWritableState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useProductForm } from "../../store/product-form";
export default {
  components: {
    BasicForm,
    ModifyVariationVisibilityRulePopup,
    ValidationProvider,
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  async created() {},
  computed: {
    ...mapState(useReferenceData, ["variantTypes", "variants"]),
    ...mapWritableState(useProductForm, ["productVariantViews"]),
    getVariantTypeCodeSelection() {
      let selectedVariantTypeCodes = this.productVariantViews.map(
        (formItem) => formItem.variantTypeCode
      );
      return this.variantTypes.map((it) => {
        let disabled = selectedVariantTypeCodes.includes(it.value);
        return {
          ...it,
          disabled,
        };
      });
    },
    getVariantsSelection() {
      return (variantTypeCode) =>
        this.variants.filter((it) => it.meta === variantTypeCode);
    },
    getRuleDescription() {
      return (index) => {
        const viewRule = this.productVariantViews[index];
        if (viewRule?.rules?.length <= 0) {
          return "views.product.alwaysShow";
        }
        let desc = "";
        for (const rule of viewRule.rules) {
          const names = this.getVariantNames(rule.variantIds);
          desc += `${rule.variantTypeCode}=${names.toString()}; `;
        }
        return desc;
      };
    },
  },
  methods: {
    ...mapActions(useReferenceData, ["getVariantNames"]),
    _remove(index) {
      this.productVariantViews.splice(index, 1);
    },
    async handleAddVariationSetting() {
      this.productVariantViews.push({
        variantTypeCode: null,
        variantIds: [],
        rules: [],
      });
    },
    async handleChangeVisibilityRule(index) {
      const result =
        await this.$refs.modifyVariationVisibilityRulePopup.showDialog({
          ...this.productVariantViews[index],
        });
      if (result) {
        this.productVariantViews[index].rules = [...result];
      }
    },
    async handleVariantTypeCodeChange(index) {
      this.productVariantViews[index].variantIds = [];
    },
  },
};
</script>
