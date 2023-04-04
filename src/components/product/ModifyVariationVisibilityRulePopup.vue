<template>
  <v-dialog v-model="isShow" persistent>
    <BasicForm>
      <template v-slot:header>
        {{ $t("views.product.addViewRule") }}
      </template>
      <template v-slot:body>
        <v-btn
          elevation="2"
          class="mr-5"
          small
          @click="handleAddForm"
        >
          {{ $t("views.product.addVariationFormSetting") }}</v-btn
        >
        <ValidationObserver ref="observer">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    {{ $t("views.product.fields.variantType") }}
                  </th>
                  <th class="text-left">
                    {{ $t("views.product.fields.variant") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in form" :key="index">
                  <td class="pt-5">
                    <ValidationProvider
                      v-slot="{ errors }"
                      :name="`Variant Type ${index+1}`"
                      rules="required"
                      ref="provider"
                    >
                      <v-select
                        v-model="item.variantTypeCode"
                        :items="getVariantTypeCodeSelection"
                        :label="$t('views.product.fields.variantType')"
                        outlined
                        :error-messages="errors"
                        item-disabled="disabled"
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
                      :name="`Variant ${index+1}`"
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
                    <v-btn
                      elevation="2"
                      class="mr-5"
                      small
                      @click="()=>_remove(index)"
                    >
                      {{ $t("common.remove") }}</v-btn
                    >
                  </td>
                </tr>
                <tr v-if="form.length === 0">
                  <td colspan="3">No matching records found</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <v-btn elevation="2" class="mr-5" small @click="_confirm">
          {{ $t("views.product.save") }}</v-btn
        >
        <v-btn elevation="2" class="mr-5" small @click="_cancel">
          {{ $t("views.product.cancel") }}</v-btn
        >
      </template>
    </BasicForm>
  </v-dialog>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { mapState } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import BasicForm from "../layout/BasicForm";
export default {
  name: "ConfirmationDialog",
  components: {
    BasicForm,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: [],
      variantOption: [],
      isShow: false,
      variationViewSetting: {},
    };
  },
  computed: {
    ...mapState(useReferenceData, ["variantTypes", "variants"]),
    getVariantsSelection() {
      return (variantTypeCode) =>
        this.variants.filter((it) => it.meta === variantTypeCode);
    },
    getVariantTypeCodeSelection() {
      let variantTypes = this.variantTypes.filter(
        (it) => it.value != this.variationViewSetting.variantTypeCode
      );
      let selectedVariantTypeCodes = this.form.map(
        (formItem) => formItem.variantTypeCode
      );
      return variantTypes.map((it) => {
        let disabled = selectedVariantTypeCodes.includes(it.value);
        return {
          ...it,
          disabled,
        };
      });
    },
  },
  methods: {
    async handleVariantTypeCodeChange(index) {
      this.form[index].variantIds = [];
    },
    handleAddForm() {
      this.form.push({
        variantTypeCode: null,
        variantIds: [],
      });
    },
    showDialog(variationViewSetting) {
      this.form = [];
      this.variationViewSetting = variationViewSetting;
      if (variationViewSetting.rules) {
        this.form = [...variationViewSetting.rules];
      }
      this.isShow = true;
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    _remove(index){
      this.form.splice(index,1)
    },
    _confirm() {
      this.$refs.observer.validate().then(async (success) => {
        if (success) {
          this.isShow = false;
          this.resolvePromise(this.form);
        }
      });
    },
    _cancel() {
      this.isShow = false;
      this.resolvePromise(null);
    },
  },
};
</script>
