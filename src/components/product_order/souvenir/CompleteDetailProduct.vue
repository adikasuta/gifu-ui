<template>
  <div>
    <v-row v-if="getReferenceContents(VariantTypeCodes.COLOR).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.color") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.color')"
          vid="color"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageWithQuantitySelection
            :minQtyPerItem="50"
            :multiple="true"
            :options="getReferenceContents(VariantTypeCodes.COLOR)"
            :error-messages="errors"
            v-model="SOUVENIR.variants.COLOR"
          />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.total") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        {{ getQtyFromColor }}
      </v-col>
    </v-row>
    <v-row v-if="getReferenceContents(VariantTypeCodes.PACKAGING).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.packaging") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.packaging')"
          vid="packaging"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageSelection
            :options="getReferenceContents(VariantTypeCodes.PACKAGING)"
            :error-messages="errors"
            v-model="SOUVENIR.variants.PACKAGING"
          />
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row v-if="getReferenceContents(VariantTypeCodes.COLOR_PACKAGING_1).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.packagingColor1") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.packagingColor1')"
          vid="packagingColor1"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageSelection
            :options="getReferenceContents(VariantTypeCodes.COLOR_PACKAGING_1)"
            :error-messages="errors"
            v-model="SOUVENIR.variants.COLOR_PACKAGING_1"
          />
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row v-if="getReferenceContents(VariantTypeCodes.COLOR_PACKAGING_2).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.packagingColor2") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.packagingColor2')"
          vid="packagingColor2"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageSelection
            :options="getReferenceContents(VariantTypeCodes.COLOR_PACKAGING_2)"
            :error-messages="errors"
            v-model="SOUVENIR.variants.COLOR_PACKAGING_2"
          />
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row v-if="getReferenceContents(VariantTypeCodes.ACCESSORIES).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.additional") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.additional')"
          vid="additional"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageSelection
            :options="getReferenceContents(VariantTypeCodes.ACCESSORIES)"
            :error-messages="errors"
            v-model="SOUVENIR.variants.ACCESSORIES"
          />
        </ValidationProvider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import CarouselImageWithQuantitySelection from "../../common/CarouselImageWithQuantitySelection";
import CarouselImageSelection from "../../common/CarouselImageSelection";
import { mapWritableState, mapState } from "pinia";
import { useOrderProductForm } from "../../../store/order-form";
import VariantTypeCodes from "../../../constants/VariantTypeCodes";
export default {
  components: {
    ValidationProvider,
    CarouselImageSelection,
    CarouselImageWithQuantitySelection,
  },
  props: [],
  watch:{
    getQtyFromColor(val){
      this.SOUVENIR.quantity = val
    }
  },
  computed: {
    ...mapWritableState(useOrderProductForm, [
      "SOUVENIR",
    ]),
    ...mapState(useOrderProductForm, [
      "getReferenceContents",
      "getReferenceVariants",
      "getMinOrder",
      "getQtyFromColor",
    ]),
  },
  data: () => ({
    foilColor: null,
    foilPosition: null,
    language: null,
    boardOrientationContentId: null,
    envelopeOrientationContentId: null,
    VariantTypeCodes,
    selectedImage: null,
    selectedButton: "",
  }),
};
</script>
