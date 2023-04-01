<template>
  <div>
    <v-row
      v-if="getReferenceContents(VariantTypeCodes.EMBOSS_DESIGN).length > 0"
    >
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.emboss") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.emboss')"
              vid="emboss"
              :rules="{
                required: true,
              }"
            >
              <CarouselImageSelection
                :options="getReferenceContents(VariantTypeCodes.EMBOSS_DESIGN)"
                :error-messages="errors"
                v-model="SOUVENIR.variants.EMBOSS_DESIGN"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.content')"
              vid="embosscontent"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="
                  SOUVENIR.variants.EMBOSS_DESIGN.additionalInfoValue
                "
                :error-messages="errors"
                :label="$t('views.order.fields.content')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="getReferenceContents(VariantTypeCodes.SIZE).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.size") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.size')"
          vid="size"
          :rules="{
            required: true,
          }"
        >
          <v-select
            v-model="size"
            :items="getReferenceContents(VariantTypeCodes.SIZE)"
            item-value="id"
            item-text="name"
            :error-messages="errors"
            :label="$t('views.order.fields.size')"
            outlined
            @change="
              (event) => {
                transformValue(VariantTypeCodes.SIZE, event);
              }
            "
          ></v-select>
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row v-if="getReferenceContents(VariantTypeCodes.POSITION).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.position") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.position')"
          vid="position"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageSelection
            :options="getReferenceContents(VariantTypeCodes.POSITION)"
            :error-messages="errors"
            v-model="SOUVENIR.variants.POSITION"
          />
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row
      v-if="getReferenceContents(VariantTypeCodes.GREETINGS_DESIGN).length > 0"
    >
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.greetings") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.greetings')"
              vid="greetings"
              :rules="{
                required: true,
              }"
            >
              <CarouselImageSelection
                :options="
                  getReferenceContents(VariantTypeCodes.GREETINGS_DESIGN)
                "
                :error-messages="errors"
                v-model="SOUVENIR.variants.GREETINGS_DESIGN"
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.greetings')"
              vid="greetingscontent"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="
                  SOUVENIR.variants.GREETINGS_DESIGN.additionalInfoValue
                "
                :error-messages="errors"
                :label="$t('views.order.fields.content')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.notes") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.notes')"
          vid="notes"
          :rules="{
            required: true,
          }"
        >
          <v-text-field
            outlined
            v-model="SOUVENIR.notes"
            :error-messages="errors"
            :label="$t('views.order.fields.notes')"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import CarouselImageSelection from "../../common/CarouselImageSelection";
import { mapWritableState, mapState, mapActions } from "pinia";
import { useOrderProductForm } from "../../../store/order-form";
import VariantTypeCodes from "../../../constants/VariantTypeCodes";
export default {
  components: {
    ValidationProvider,
    CarouselImageSelection,
  },
  props: [],
  computed: {
    ...mapWritableState(useOrderProductForm, [
      "SOUVENIR",
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
    size: null,
    VariantTypeCodes,
    selectedImage: null,
    selectedButton: "",
  }),
};
</script>
