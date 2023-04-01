<template>
  <div>
    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.quantity") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.quantity')"
          vid="quantity"
          :rules="{
            required: true,
            numeric: true,
            min_value: getMinOrder,
          }"
        >
          <v-text-field
            outlined
            v-model="invitationForm.quantity"
            :error-messages="errors"
            :label="$t('views.order.fields.quantity')"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row
      v-if="getReferenceContents(VariantTypeCodes.ENVELOPE_PAPER).length > 0"
    >
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.envelopePaper") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.envelopePaper')"
          vid="envelopePaper"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageSelection
            :options="getReferenceContents(VariantTypeCodes.ENVELOPE_PAPER)"
            :error-messages="errors"
            v-model="invitationForm.variants.ENVELOPE_PAPER"
          />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row v-if="getReferenceContents(VariantTypeCodes.BOARD_PAPER).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.boardPaper") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.boardPaper')"
          vid="boardPaper"
          :rules="{
            required: true,
          }"
        >
          <CarouselImageSelection
            :options="getReferenceContents(VariantTypeCodes.BOARD_PAPER)"
            :error-messages="errors"
            v-model="invitationForm.variants.BOARD_PAPER"
          />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row
      v-if="
        getReferenceContents(VariantTypeCodes.ORIENTATION_ENVELOPE).length >
          0 ||
        getReferenceContents(VariantTypeCodes.ORIENTATION_BOARD).length > 0
      "
    >
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.orientation") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col
            cols="12"
            class="pb-0"
            v-if="
              getReferenceContents(VariantTypeCodes.ORIENTATION_ENVELOPE)
                .length > 0
            "
          >
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.envelope')"
              vid="envelopeOrientationContentId"
              :rules="{
                required: true,
              }"
            >
              <v-select
                v-model="envelopeOrientationContentId"
                :items="
                  getReferenceContents(VariantTypeCodes.ORIENTATION_ENVELOPE)
                "
                item-value="id"
                item-text="name"
                :error-messages="errors"
                :label="$t('views.order.fields.envelope')"
                outlined
                @change="
                  (event) => {
                    transformValue(
                      VariantTypeCodes.ORIENTATION_ENVELOPE,
                      event
                    );
                  }
                "
              ></v-select>
            </ValidationProvider>
          </v-col>
          <v-col
            cols="12"
            class="pt-0"
            v-if="
              getReferenceContents(VariantTypeCodes.ORIENTATION_BOARD).length >
              0
            "
          >
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.board')"
              vid="boardOrientationContentId"
              :rules="{
                required: true,
              }"
            >
              <v-select
                v-model="boardOrientationContentId"
                :items="
                  getReferenceContents(VariantTypeCodes.ORIENTATION_BOARD)
                "
                item-value="id"
                item-text="name"
                :error-messages="errors"
                :label="$t('views.order.fields.board')"
                outlined
                @change="
                  (event) => {
                    transformValue(VariantTypeCodes.ORIENTATION_BOARD, event);
                  }
                "
              ></v-select>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="getReferenceContents(VariantTypeCodes.LANGUAGE).length > 0">
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.language") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.language')"
          vid="language"
          :rules="{
            required: true,
          }"
        >
          <v-select
            v-model="language"
            :items="getReferenceContents(VariantTypeCodes.LANGUAGE)"
            item-value="id"
            item-text="name"
            :error-messages="errors"
            :label="$t('views.order.fields.language')"
            outlined
            @change="
              (event) => {
                transformValue(VariantTypeCodes.LANGUAGE, event);
              }
            "
          ></v-select>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row
      v-if="getReferenceContents(VariantTypeCodes.FOIL_POSITION).length > 0"
    >
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.foilPosition") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.foilPosition')"
          vid="foilPosition"
          :rules="{
            required: true,
          }"
        >
          <v-select
            v-model="foilPosition"
            :items="getReferenceContents(VariantTypeCodes.FOIL_POSITION)"
            item-value="id"
            item-text="name"
            :error-messages="errors"
            :label="$t('views.order.fields.foilPosition')"
            outlined
            @change="
              (event) => {
                transformValue(VariantTypeCodes.FOIL_POSITION, event);
              }
            "
          ></v-select>
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row
      v-if="getReferenceContents(VariantTypeCodes.FOIL_POSITION).length > 0"
    >
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.foilColor") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('views.order.fields.foilColor')"
          vid="foilColor"
          :rules="{
            required: true,
          }"
        >
          <v-select
            v-model="foilColor"
            :items="getReferenceContents(VariantTypeCodes.FOIL_POSITION)"
            item-value="id"
            item-text="name"
            :error-messages="errors"
            :label="$t('views.order.fields.foilColor')"
            outlined
            @change="
              (event) => {
                transformValue(VariantTypeCodes.FOIL_POSITION, event);
              }
            "
          ></v-select>
        </ValidationProvider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import CarouselImageSelection from "../../common/CarouselImageSelection";
import { mapWritableState, mapState } from "pinia";
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
      "invitationForm",
      "referenceVariants",
    ]),
    ...mapState(useOrderProductForm, [
      "getReferenceContents",
      "getReferenceVariants",
      "getMinOrder",
    ]),
  },
  methods: {
    transformValue(variantTypeCode, contentId) {
      const variants = this.getReferenceVariants(variantTypeCode);
      let variantId = null;
      for (const variant of variants) {
        for (const content of variant.contents) {
          if (content.id == contentId) {
            variantId = variant.id;
            break;
          }
        }
        if (variantId != null) {
          break;
        }
      }
      this.invitationForm.variants[variantTypeCode] = {
        variantId,
        contentId,
      };
    },
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
