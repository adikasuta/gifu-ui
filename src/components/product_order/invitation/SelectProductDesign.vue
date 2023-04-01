<template>
  <div>
    <ValidationProvider
      v-slot="{ errors }"
      :name="$t('views.order.fields.designProduct')"
      vid="designProduct"
      :rules="{
        required: true,
      }"
    >
      <VueRadioButton
        v-model="contentId"
        :options="contentReferences"
      >
        <template #label="{ props }">
          <img :src="fileUrl(props.picture)" width="100" height="100" />
          <span>{{ props.name }}</span>
        </template>
      </VueRadioButton>
      <div class="pl-5" v-if="errors && errors.length > 0">
        <div class="v-messages theme--light error--text" role="alert">
          <div class="v-messages__wrapper">
            <div class="v-messages__message">{{ errors[0] }}</div>
          </div>
        </div>
      </div>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import VueRadioButton from "vue-radio-button";
import { mapState, mapWritableState } from "pinia";
import { useOrderProductForm } from "../../../store/order-form";
import VariantTypeCodes from "../../../constants/VariantTypeCodes";
const BASE_URL =
  process.env.VUE_APP_BACKEND_BASE_URL || "http://localhost:3000";
export default {
  components: { VueRadioButton, ValidationProvider },
  props: [],
  computed: {
    ...mapWritableState(useOrderProductForm, ["INVITATION"]),
    ...mapState(useOrderProductForm, ["getReferenceContents"]),
  },
  created() {
    if(this.INVITATION.variants.PRODUCT_DESIGN.contentId){
      this.contentId=this.INVITATION.variants.PRODUCT_DESIGN.contentId;
    }
    this.contentReferences = this.getReferenceContents(
      VariantTypeCodes.ENVELOPE_PAPER
    );
  },
  methods: {
    fileUrl(filename) {
      if (!filename) {
        return "no_image.jpg";
      }
      return BASE_URL + "/public/api/assets/images?filename=" + filename;
    },
  },
  watch:{
    contentId(){
      const variants = this.contentReferences.filter(it=>it.id == this.contentId);
      if(variants.length>0){
        this.INVITATION.variants.PRODUCT_DESIGN.variantId = variants[0].variantId;
      }
      this.INVITATION.variants.PRODUCT_DESIGN.contentId = this.contentId;
    }
  },
  data: () => ({
    contentId: null,
    contentReferences: [],
  }),
};
</script>

<style>
.v-radio-label {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin: 5px;
  border-radius: 4px;
  border: 1px solid #eee;
  transition: all 500ms;
}

.v-radio-active {
  box-shadow: 0 1px 5px 0 rgba(255, 162, 0);
  border: 1px solid rgb(255, 162, 0);
}

</style>
