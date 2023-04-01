import { defineStore } from "pinia";
import PublicProductService from "../services/PublicProduct.service";
import ProductTypeCodes from "../constants/ProductTypeCodes";
import VariantTypeCodes from "../constants/VariantTypeCodes";
import OrderService from "../services/PublicOrder.service";

export const useOrderProductForm = defineStore('OrderProductForm', {
  state: () => ({
    id: null,
    productCode: null,
    productCategoryId: null,
    productType: null,
    name: null,
    existingPicture: null,
    length: null,
    width: null,
    height: null,
    weight: null,
    minOrder: 0,
    description: null,
    pricingRanges: [],
    productVariantPrices: [],
    productVariantViews: [],
    referenceVariants: [],

    shippingAddressForm: {
      provinceCode: "",
      cityCode: "",
      districtCode: "",
      kelurahanCode: "",
      address: "",
      postalCode: "",
      preferredShippingVendor: null,
      useWoodenCrate: false,
    },

    customerInfoForm: {
      customerName: "",
      customerEmail: "",
      phoneNumber: "",
    },
    SOUVENIR: {
      csReferralToken: null,
      quantity: 0,
      notes: "",
      brideName: "",
      groomName: "",
      eventDate: null,
      eventVenue: "",
      variants: {
        COLOR: [],
        PACKAGING: null,
        COLOR_PACKAGING_1: null,
        COLOR_PACKAGING_2: null,
        ACCESSORIES: null,
        EMBOSS_DESIGN: null,
        SIZE: null,
        POSITION: null,
        GREETINGS_DESIGN: null,
      },

    },
    INVITATION: {
      csReferralToken: null,
      quantity: 0,
      notes: "",
      brideInfo: {
        fullname: "",
        nickname: "",
        instagramAccount: "",
        motherName: "",
        fatherName: ""
      },
      groomInfo: {
        fullname: "",
        nickname: "",
        instagramAccount: "",
        motherName: "",
        fatherName: ""
      },
      eventDetails: [{

      }],
      variants: {
        PRODUCT_DESIGN: {
          variantId: null,
          contentId: null,
        },
        BOARD_PAPER: null,
        ENVELOPE_PAPER: null,
        ORIENTATION_BOARD: null,
        ORIENTATION_ENVELOPE: null,
        LANGUAGE: null,
        FOIL_COLOR: null,
        FOIL_POSITION: null,
        EMBOSS_DESIGN: null,
        WAX_SEALS: null,
        DRIED_FLOWERS: null,
        ENVELOPE: null,
        // ADDITIONAL_PAPER: [],
        VELLUM_WRAP: null,
        RIBBON: null,
        RIBBON_COLOR: null,
        PACKAGING_SERVICE: null
      }

    }
  }),
  getters: {
    getQtyFromColor(state) {
      let qty = 0;
      for (const content of state.SOUVENIR.variants.COLOR) {
        qty += content.quantity;
      }
      return qty;
    },
    getSouvenirOrderPayload: (state) => {
      let variants;
      let brideGroom = {
        brideName: state.SOUVENIR.brideName,
        groomName: state.SOUVENIR.groomName,
      }

      let customerDetails = {
        name: state.customerInfoForm.customerName,
        email: state.customerInfoForm.customerEmail,
        phoneNumber: state.customerInfoForm.phoneNumber,
      }

      let shippingDetails = {
        provinceId: state.shippingAddressForm.provinceCode,
        cityId: state.shippingAddressForm.cityCode,
        distrctId: state.shippingAddressForm.districtCode,
        kelurahanId: state.shippingAddressForm.kelurahanCode,
        postalCode: state.shippingAddressForm.postalCode,
        address: state.shippingAddressForm.address,
        preferredShippingVendor: state.shippingAddressForm.preferredShippingVendor,
        useWoodenCrate: state.shippingAddressForm.useWoodenCrate
      }

      variants = []
      for (const key in state.SOUVENIR.variants) {
        if (state.SOUVENIR.variants[key] && state.SOUVENIR.variants[key].contentId) {
          const toBePushed = {
            ...state.SOUVENIR.variants[key],
            variantTypeCode: key,
          }
          if ([VariantTypeCodes.EMBOSS_DESIGN, VariantTypeCodes.GREETINGS_DESIGN].includes(key)) {
            toBePushed.additionalInfoKey = "content"
          }
          variants.push(toBePushed);
        }
      }
      let eventDetail = {
        name: state.SOUVENIR.eventVenue,
        venue: state.SOUVENIR.eventVenue,
        date: state.SOUVENIR.eventDate
      }
      return {
        productId: state.id,
        quantity: state.SOUVENIR.quantity,
        productType: state.productType,
        notes: state.SOUVENIR.notes,
        csReferralToken: state.SOUVENIR.csReferralToken,
        brideGroom,
        customerDetails,
        shippingDetails,
        eventDetail: [eventDetail],
        variants,
      }

    },
    getInvitationOrderPayload: (state) => {
      let variants;
      let brideGroom = {
        brideName: state.INVITATION.brideInfo.fullname,
        brideNickname: state.INVITATION.brideInfo.nickname,
        brideFather: state.INVITATION.brideInfo.fatherName,
        brideMother: state.INVITATION.brideInfo.motherName,
        brideInstagram: state.INVITATION.brideInfo.instagramAccount,

        groomName: state.INVITATION.groomInfo.fullname,
        groomNickname: state.INVITATION.groomInfo.nickname,
        groomFather: state.INVITATION.groomInfo.fatherName,
        groomMother: state.INVITATION.groomInfo.motherName,
        groomInstagram: state.INVITATION.groomInfo.instagramAccount,
      }

      let customerDetails = {
        name: state.customerInfoForm.customerName,
        email: state.customerInfoForm.customerEmail,
        phoneNumber: state.customerInfoForm.phoneNumber,
      }

      let shippingDetails = {
        provinceId: state.shippingAddressForm.provinceCode,
        cityId: state.shippingAddressForm.cityCode,
        distrctId: state.shippingAddressForm.districtCode,
        kelurahanId: state.shippingAddressForm.kelurahanCode,
        postalCode: state.shippingAddressForm.postalCode,
        address: state.shippingAddressForm.address,
        preferredShippingVendor: state.shippingAddressForm.preferredShippingVendor,
        useWoodenCrate: state.shippingAddressForm.useWoodenCrate
      }

      variants = []
      for (const key in state.INVITATION.variants) {
        if (state.INVITATION.variants[key] && state.INVITATION.variants[key].contentId) {
          variants.push({
            ...state.INVITATION.variants[key],
            variantTypeCode: key,
          });
        }
      }
      return {
        productId: state.id,
        quantity: state.INVITATION.quantity,
        productType: state.productType,
        notes: state.INVITATION.notes,
        csReferralToken: state.INVITATION.csReferralToken,
        brideGroom,
        customerDetails,
        shippingDetails,
        eventDetail: state.INVITATION.eventDetails,
        variants,
      }
    },
    getMinOrder(state) {
      return state.minOrder;
    },
    getPrice(state) {
      let quantity = 0;
      if (state.productType === ProductTypeCodes.SOUVENIR) {
        quantity = state.SOUVENIR.quantity || 0;
      }
      if (state.productType === ProductTypeCodes.INVITATION) {
        quantity = state.invitationForm.quantity || 0;
      }

      const ranges = state.pricingRanges.filter(it => {
        if (it.qtyMax) {
          return it.qtyMin <= quantity && it.qtyMax >= quantity;
        }
        return it.qtyMin <= quantity
      })
      if (ranges.length > 0) {
        return ranges[0].price;
      }
      return 0;
    },
    getReferenceVariants: (state) => (variantTypeCode) => {
      return state.referenceVariants.filter(it => it.variantTypeCode === variantTypeCode);
    },
    getReferenceContents: (state) => (variantTypeCode) => {
      let variantIds = []
      let form = state.SOUVENIR;
      if (state.productType == ProductTypeCodes.INVITATION) {
        form = state.invitationForm;
      }
      for (const view of state.productVariantViews) {
        if (view.variantTypeCode == variantTypeCode) {
          let passesRule = true;
          if (view.rules.length > 0) {
            for (const rule of view.rules) {
              const ruleVariantIds = rule.variantIds.split(",").map(id => parseInt(id));
              if (!ruleVariantIds.includes(form[rule.variantTypeCode].variantId)) {
                passesRule = false;
                break;
              }
            }
          }
          if (passesRule) {
            variantIds.push(...view.variantIds)
          }
        }
      }
      let contents = [];
      const referenceVariants = state.referenceVariants.filter(it => it.variantTypeCode === variantTypeCode);
      for (const referenceVariant of referenceVariants) {
        if (variantIds.includes(referenceVariant.id)) {
          contents.push(...referenceVariant.contents);
        }
      }
      return contents;
    }
  },
  actions: {
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
      const productType = this.$state.productType;
      this.$state[productType].variants[variantTypeCode] = {
        variantId,
        contentId,
      };
    },
    async postSouvenirOrder() {
      return await OrderService.postOrder(this.getSouvenirOrderPayload);
    },
    async postInvitationOrder() {
      return await OrderService.postOrder(this.getInvitationOrderPayload);
    },
    resetForm() {
      this.$state.id = null;
      this.$state.productCode = null;
      this.$state.productCategoryId = null;
      this.$state.productType = null;
      this.$state.name = null;
      this.$state.existingPicture = null;
      this.$state.length = null;
      this.$state.width = null;
      this.$state.height = null;
      this.$state.weight = null;
      this.$state.minOrder = null;
      this.$state.description = null;
      this.$state.pricingRanges = [];
      this.$state.productVariantPrices = [];
      this.$state.productVariantViews = [];
      this.$state.referenceVariants = [];
    },
    async loadProductForm(productId) {
      const res = await PublicProductService.getProductById(productId);
      this.$state.referenceVariants = await PublicProductService.getVariantsByProductId(productId);
      this.$state.id = res.id;
      this.$state.productCode = res.productCode;
      this.$state.productCategoryId = res.productCategoryId;
      this.$state.productType = res.productType;
      this.$state.name = res.name;
      this.$state.existingPicture = res.existingPicture;
      this.$state.length = res.length;
      this.$state.width = res.width;
      this.$state.height = res.height;
      this.$state.weight = res.weight;
      this.$state.minOrder = res.minOrder;
      this.$state.description = res.description;
      this.$state.pricingRanges = res.pricingRanges;
      this.$state.productVariantPrices = res.productVariantPrices.map(it => {
        return {
          ...it,
          variantIds: it.variantIds.split(",").map(id => parseInt(id)),
        }
      });
      this.$state.productVariantViews = res.productVariantViews.map(it => {
        return {
          ...it,
          variantIds: it.variantIds.split(",").map(id => parseInt(id)),
        }
      });
    },
    // async postProduct() {
    //   const formData = new FormData();
    //   formData.set("file", this.$state.pictureFile);
    //   formData.set("payload", JSON.stringify(this.postPayload));
    //   await ProductService.postProduct(formData);
    // }
  }
})