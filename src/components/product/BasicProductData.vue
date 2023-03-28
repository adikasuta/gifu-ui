<template>
  <BasicForm>
    <template v-slot:header>
      {{ $t("views.product.title") }}
    </template>
    <template v-slot:body>
      <v-row>
        <v-col cols="4">
          <span>{{ $t("views.product.fields.picture") }}</span>
        </v-col>
        <v-col cols="8">
          <ValidationProvider
            v-slot="{ errors }"
            :name="`Product Image`"
            rules="file_size"
            ref="provider"
          >
            <v-file-input
              v-model="pictureFile"
              accept="image/*"
              outlined
              :error-messages="errors"
              :label="$t('views.product.fields.picture')"
              @change="previewImage"
            ></v-file-input>
          </ValidationProvider>
          <ImageComponent
            :filename="pictureShow"
            :isPreview="isPreview"
            maxWidth="200"
          ></ImageComponent>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <span>{{ $t("views.product.fields.productType") }}</span>
        </v-col>
        <v-col cols="8">
          <ValidationProvider
            v-slot="{ errors }"
            :name="`Product Type`"
            rules="required"
            ref="provider"
          >
            <v-select
              v-model="productType"
              :items="productTypes"
              :error-messages="errors"
              :label="$t('views.product.fields.productType')"
              outlined
            ></v-select>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <span>{{ $t("views.product.fields.name") }}</span>
        </v-col>
        <v-col cols="8">
          <ValidationProvider
            v-slot="{ errors }"
            :name="`Product Name`"
            rules="required"
            ref="provider"
          >
            <v-text-field
              outlined
              v-model="name"
              :error-messages="errors"
              :label="$t('views.product.fields.name')"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <span>{{ $t("views.product.fields.productCategory") }}</span>
        </v-col>
        <v-col cols="8">
          <ValidationProvider
            v-slot="{ errors }"
            :name="`Product Category`"
            rules="required"
            ref="provider"
          >
            <v-select
              v-model="productCategoryId"
              :items="categoryOptions"
              item-value="id"
              item-text="name"
              :error-messages="errors"
              :label="$t('views.product.fields.productCategory')"
              outlined
            ></v-select>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <span>{{ $t("views.product.fields.size") }} (centimeter)</span>
        </v-col>
        <v-col cols="8">
          <ValidationProvider
            v-slot="{ errors }"
            :name="`Width`"
            :rules="{
              required: true,
              numeric: true,
              min_value: 0,
            }"
            ref="provider"
          >
            <v-text-field
              outlined
              v-model="width"
              :error-messages="errors"
              :label="$t('views.product.fields.width')"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="`Length`"
            :rules="{
              required: true,
              numeric: true,
              min_value: 0,
            }"
            ref="provider"
          >
            <v-text-field
              outlined
              v-model="length"
              :error-messages="errors"
              :label="$t('views.product.fields.length')"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="`Height`"
            :rules="{
              required: true,
              numeric: true,
              min_value: 0,
            }"
            ref="provider"
          >
            <v-text-field
              outlined
              v-model="height"
              :error-messages="errors"
              :label="$t('views.product.fields.height')"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <span>{{ $t("views.product.fields.weight") }} (kg)</span>
        </v-col>
        <v-col cols="8">
          <ValidationProvider
            v-slot="{ errors }"
            :name="`Weight`"
            :rules="{
              required: true,
              numeric: true,
              min_value: 0,
            }"
            ref="provider"
          >
            <v-text-field
              outlined
              v-model="weight"
              :error-messages="errors"
              :label="$t('views.product.fields.weight')"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <span>{{ $t("views.product.fields.minOrder") }}</span>
        </v-col>
        <v-col cols="8">
          <ValidationProvider
            v-slot="{ errors }"
            :name="`Min Order`"
            :rules="{
              required: true,
              numeric: true,
              min_value: 0,
            }"
            ref="provider"
          >
            <v-text-field
              outlined
              v-model="minOrder"
              :error-messages="errors"
              :label="$t('views.product.fields.minOrder')"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <span>{{ $t("views.product.fields.description") }}</span>
        </v-col>
        <v-col cols="8">
          <v-textarea
            v-model="description"
            :label="$t('views.product.fields.description')"
            outlined
            rows="5"
            max-height="200"
          ></v-textarea>
        </v-col>
      </v-row>
    </template>
  </BasicForm>
</template>

<script>
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import ImageComponent from "../common/ImageComponent.vue";
import BasicForm from "../layout/BasicForm";
import { mapState, mapWritableState } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useProductForm } from "../../store/product-form";

const decimalMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: false,
  allowNegative: false,
});
const integerMask = createNumberMask({
  prefix: "",
  allowDecimal: false,
  includeThousandsSeparator: false,
  allowNegative: false,
});
export default {
  components: {
    ImageComponent,
    BasicForm,
    ValidationProvider,
  },
  data() {
    return {
      decimalMask,
      integerMask,
      previewUrl: null,
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  computed: {
    categoryOptions() {
      if (!this.productType) {
        return [];
      }
      return this.categories.filter(
        (it) => it.productType === this.productType
      );
    },
    ...mapState(useReferenceData, ["categories", "productTypes"]),
    ...mapWritableState(useProductForm, [
      "productType",
      "existingPicture",
      "name",
      "productCategoryId",
      "width",
      "height",
      "length",
      "weight",
      "minOrder",
      "description",
      "pictureFile",
    ]),
    isPreview() {
      return !!this.previewUrl;
    },
    pictureShow() {
      if (this.isPreview) {
        return this.previewUrl;
      }
      return this.existingPicture;
    },
  },
  methods: {
    validateFileSize(file) {
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes

      console.log(file.size);
      if (file.size > maxSize) {
        this.$validator.errors.add({
          field: "file",
          id: "file_size",
          message: `File size exceeds limit of ${maxSize / 1024 / 1024}MB`,
        });
      } else {
        this.$validator.errors.remove("file", "file_size");
      }
    },
    previewImage() {
      this.previewUrl = URL.createObjectURL(this.pictureFile);
    },
  },
};
</script>
