import { defineStore } from "pinia";
// import ProductService from "../services/Product.service";
import PublicProductService from "../services/PublicProduct.service";
import ProductTypeCodes from "../constants/ProductTypeCodes";

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
    souvenirForm: {
      quantity: 0,
      notes: "",
      brideName: "",
      groomName: "",
      eventDate: null,
      eventVenue: "",
      COLOR: [],
      PACKAGING: {
        variantId: null,
        contentId: null
      },
      COLOR_PACKAGING_1: {
        variantId: null,
        contentId: null
      },
      COLOR_PACKAGING_2: {
        variantId: null,
        contentId: null
      },
      ACCESSORIES: {
        variantId: null,
        contentId: null
      },
      EMBOSS_DESIGN: {
        variantId: null,
        contentId: null,
        additionalText: "",
      },
      SIZE: {
        variantId: null,
        contentId: null,
      },
      POSITION: {
        variantId: null,
        contentId: null,
      },
      GREETINGS_DESIGN: {
        variantId: null,
        contentId: null,
      },
    },
    invitationForm: {
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
        ADDITIONAL_PAPER: [],
        VELLUM_WRAP: null,
        RIBBON: null,
        RIBBON_COLOR: null,
        PACKAGING_SERVICE: null
      }

    }
  }),
  getters: {
    getInvitationOrderPayload(state) {
      let eventDetail, variants;
      state.invitationForm.brideInfo.fullname
      let brideGroom = {
        brideName: state.invitationForm.brideInfo.fullname,
        brideNickname: state.invitationForm.brideInfo.nickname,
        brideFather: state.invitationForm.brideInfo.fatherName,
        brideMother: state.invitationForm.brideInfo.motherName,
        brideInstagram: state.invitationForm.brideInfo.instagramAccount,

        groomName: state.invitationForm.groomInfo.fullname,
        groomNickname: state.invitationForm.groomInfo.nickname,
        groomFather: state.invitationForm.groomInfo.fatherName,
        groomMother: state.invitationForm.groomInfo.motherName,
        groomInstagram: state.invitationForm.groomInfo.instagramAccount,
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
      return {
        productId: state.id,
        quantity: state.invitationForm.quantity,
        productType: state.productType,
        notes: state.invitationForm.notes,
        // TODO: csReferralToken,
        brideGroom,
        customerDetails,
        shippingDetails,
        eventDetail,
        variants,
      }
    },
    getMinOrder(state) {
      return state.minOrder;
    },
    getPrice(state) {
      let quantity = 0;
      if (state.productType === ProductTypeCodes.SOUVENIR) {
        quantity = state.souvenirForm.quantity || 0;
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
      let form = state.souvenirForm;
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
    async postSouvenirOrder() {

    },
    async postInvitationOrder() {

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