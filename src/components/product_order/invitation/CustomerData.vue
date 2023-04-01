<template>
  <div>
    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.customerData") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.name')"
              vid="name"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="customerInfoForm.customerName"
                :error-messages="errors"
                :label="$t('views.order.fields.name')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.email')"
              vid="email"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="customerInfoForm.customerEmail"
                :error-messages="errors"
                :label="$t('views.order.fields.email')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pt-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.phoneNumber')"
              vid="phoneNumber"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="customerInfoForm.phoneNumber"
                :error-messages="errors"
                :label="$t('views.order.fields.phoneNumber')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.bride") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.fullname')"
              vid="bridename"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="invitationForm.brideInfo.fullname"
                :error-messages="errors"
                :label="$t('views.order.fields.fullname')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.nickname')"
              vid="brideNickname"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="invitationForm.brideInfo.nickname"
                :error-messages="errors"
                :label="$t('views.order.fields.nickname')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" sm="6" class="pt-0 pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.motherName')"
              vid="bridemotherName"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="invitationForm.brideInfo.motherName"
                :error-messages="errors"
                :label="$t('views.order.fields.motherName')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pt-0 pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.fatherName')"
              vid="bridefatherName"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="invitationForm.brideInfo.fatherName"
                :error-messages="errors"
                :label="$t('views.order.fields.fatherName')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pt-0 pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.instagramAccount')"
              vid="brideinstagramAccount"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="invitationForm.brideInfo.instagramAccount"
                :error-messages="errors"
                :label="$t('views.order.fields.instagramAccount')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.groom") }}</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.fullname')"
              vid="groomname"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="invitationForm.groomInfo.fullname"
                :error-messages="errors"
                :label="$t('views.order.fields.fullname')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.nickname')"
              vid="groomNickname"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="invitationForm.groomInfo.nickname"
                :error-messages="errors"
                :label="$t('views.order.fields.nickname')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" sm="6" class="pt-0 pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.motherName')"
              vid="groommotherName"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="invitationForm.groomInfo.motherName"
                :error-messages="errors"
                :label="$t('views.order.fields.motherName')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pt-0 pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.fatherName')"
              vid="groomfatherName"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="invitationForm.groomInfo.fatherName"
                :error-messages="errors"
                :label="$t('views.order.fields.fatherName')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pt-0 pb-0">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('views.order.fields.instagramAccount')"
              vid="groominstagramAccount"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                outlined
                v-model="invitationForm.groomInfo.instagramAccount"
                :error-messages="errors"
                :label="$t('views.order.fields.instagramAccount')"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="3">
        <label>{{ $t("views.order.fields.eventDetail") }} </label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col
          cols="12"
            v-for="(eventDetail, index) of invitationForm.eventDetails"
            :key="index"
          >
            <EventDetails
              v-model="invitationForm.eventDetails[index]"
              :index="index"
              @on:delete="handleRemoveEvent"
              :hideRemoveButton="invitationForm.eventDetails.length == 1"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-divider class="mb-5 mt-5"></v-divider>
            <v-btn color="pink lighten-1" @click="handleAddEvent">
              {{ $t("views.order.fields.addEvent") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="mb-5 mt-5"></v-divider>
    <ShippingAddress/>
  </div>
</template>

<script>
import ShippingAddress from "../ShippingAddress";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import EventDetails from "../EventDetails";
import { mapWritableState, mapState } from "pinia";
import { useOrderProductForm } from "../../../store/order-form";
import VariantTypeCodes from "../../../constants/VariantTypeCodes";
export default {
  components: {
    ValidationProvider,
    EventDetails,
    ShippingAddress,
  },
  props: [],
  computed: {
    ...mapWritableState(useOrderProductForm, [
      "customerInfoForm",
      "invitationForm",
      "referenceVariants",
    ]),
    ...mapState(useOrderProductForm, [
      "getReferenceContents",
      "getReferenceVariants",
    ]),
  },
  methods: {
    handleRemoveEvent(index){
        this.invitationForm.eventDetails.splice(index, 1);
    },
    handleAddEvent() {
      this.invitationForm.eventDetails.push({
        name: "",
        venue: "",
        date: null,
      });
    },
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
      this.invitationForm[variantTypeCode] = {
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
