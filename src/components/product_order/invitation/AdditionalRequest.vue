<template>
  <div>
    <v-row
      v-if="getReferenceContents(VariantTypeCodes.EMBOSS_DESIGN).length > 0"
    >
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.emboss") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.emboss')"
          vid="emboss"
          :rules="{
            required: true,
          }"
        >
          <v-select
            v-model="emboss"
            :items="getReferenceContents(VariantTypeCodes.EMBOSS_DESIGN)"
            item-value="id"
            item-text="name"
            :error-messages="errors"
            :label="$t('views.order.fields.emboss')"
            outlined
            @change="
              (event) => {
                transformValue(VariantTypeCodes.EMBOSS_DESIGN, event);
              }
            "
          ></v-select>
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row v-if="getReferenceContents(VariantTypeCodes.WAX_SEALS).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.waxSeal") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.waxSeal')"
          vid="waxSeal"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageSelection
            :options="getReferenceContents(VariantTypeCodes.WAX_SEALS)"
            :error-messages="errors"
            v-model="INVITATION.variants.WAX_SEALS"
          />
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row
      v-if="getReferenceContents(VariantTypeCodes.DRIED_FLOWERS).length > 0"
    >
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.driedFlower") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.driedFlower')"
          vid="driedFlower"
          :rules="{
            required: true,
          }"
        >
          <v-select
            v-model="driedFlower"
            :items="getReferenceContents(VariantTypeCodes.DRIED_FLOWERS)"
            item-value="id"
            item-text="name"
            :error-messages="errors"
            :label="$t('views.order.fields.driedFlower')"
            outlined
            @change="
              (event) => {
                transformValue(VariantTypeCodes.DRIED_FLOWERS, event);
              }
            "
          ></v-select>
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row v-if="getReferenceContents(VariantTypeCodes.ENVELOPE).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.envelope") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.envelope')"
          vid="envelope"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageSelection
            :options="getReferenceContents(VariantTypeCodes.ENVELOPE)"
            :error-messages="errors"
            v-model="INVITATION.variants.ENVELOPE"
          />
        </ValidationProvider>
      </v-col>
    </v-row>

    <!-- <v-row
      v-if="getReferenceContents(VariantTypeCodes.ADDITIONAL_PAPER).length > 0"
    >
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.additionalPaper") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.additionalPaper')"
          vid="additionalPaper"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageWithQuantitySelection
            :options="getReferenceContents(VariantTypeCodes.ADDITIONAL_PAPER)"
            :error-messages="errors"
            v-model="INVITATION.variants.ADDITIONAL_PAPER"
          />
        </ValidationProvider>
      </v-col>
    </v-row> -->

    <v-row v-if="getReferenceContents(VariantTypeCodes.VELLUM_WRAP).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.vellumWrap") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.vellumWrap')"
          vid="vellumWrap"
          :rules="{
            required: true,
          }"
        >
          <v-select
            v-model="vellumWrap"
            :items="getReferenceContents(VariantTypeCodes.VELLUM_WRAP)"
            item-value="id"
            item-text="name"
            :error-messages="errors"
            :label="$t('views.order.fields.vellumWrap')"
            outlined
            @change="
              (event) => {
                transformValue(VariantTypeCodes.VELLUM_WRAP, event);
              }
            "
          ></v-select>
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row v-if="getReferenceContents(VariantTypeCodes.RIBBON).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.ribbon") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.ribbon')"
          vid="ribbon"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageSelection
            :options="getReferenceContents(VariantTypeCodes.RIBBON)"
            :error-messages="errors"
            v-model="INVITATION.variants.RIBBON"
          />
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row
      v-if="getReferenceContents(VariantTypeCodes.RIBBON_COLOR).length > 0"
    >
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.ribbonColor") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.ribbonColor')"
          vid="ribbonColor"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageSelection
            :options="getReferenceContents(VariantTypeCodes.RIBBON_COLOR)"
            :error-messages="errors"
            v-model="INVITATION.variants.RIBBON_COLOR"
          />
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row
      v-if="getReferenceContents(VariantTypeCodes.PACKAGING_SERVICE).length > 0"
    >
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.packingService") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.packingService')"
          vid="packingService"
          :rules="{
            required: true,
          }"
        >
          <v-select
            v-model="packingService"
            :items="getReferenceContents(VariantTypeCodes.PACKAGING_SERVICE)"
            item-value="id"
            item-text="name"
            :error-messages="errors"
            :label="$t('views.order.fields.packingService')"
            outlined
            @change="
              (event) => {
                transformValue(VariantTypeCodes.PACKAGING_SERVICE, event);
              }
            "
          ></v-select>
        </ValidationProvider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import CarouselImageWithQuantitySelection from "../../common/CarouselImageWithQuantitySelection";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import CarouselImageSelection from "../../common/CarouselImageSelection";
import { mapWritableState, mapState, mapActions } from "pinia";
import { useOrderProductForm } from "../../../store/order-form";
import VariantTypeCodes from "../../../constants/VariantTypeCodes";
export default {
  components: {
    ValidationProvider,
    CarouselImageSelection,
    // CarouselImageWithQuantitySelection,
  },
  props: [],
  computed: {
    ...mapWritableState(useOrderProductForm, [
      "INVITATION",
      "referenceVariants",
    ]),
    ...mapState(useOrderProductForm, [
      "getReferenceContents",
      "getReferenceVariants",
    ]),
  },
  methods: {
    ...mapActions(useOrderProductForm, ["transformValue"]),
  },
  data: () => ({
    emboss: null,
    vellumWrap: null,
    driedFlower: null,
    packingService: null,
    VariantTypeCodes,
  }),
};
</script>
