import { defineStore } from "pinia";
import moment from 'moment'
import CdeBackendService from "../services/CdeBackendService";

export const useCreditCard = defineStore('CreditCard', {
  state: () => ({
    creditCardNumber: null,
    expirationDate: null,
    cvv: null,
    firstName: "",
    lastName: "",
    address: "",
    locality: null,
    administrativeArea: null,
    postalCode: null,
    country: "ID",
    email: "",
    phoneNumber: ""
  }),
  getters: {
    postPayloadCreditCard: (state) => {
      return {
        panNumber: state.creditCardNumber,
        expirationMonth: moment(state.expirationDate).format('MM'),
        expirationYear: moment(state.expirationDate).format('YYYY'),
        securityCode: state.cvv,
        firstName: state.firstName,
        lastName: state.lastName,
        address: state.address,
        locality: state.locality,
        administrativeArea: state.administrativeArea,
        postalCode: state.postalCode,
        country: state.country,
        email: state.email,
        phoneNo: state.phoneNumber
      }
    }
  },
  actions: {
    async loadPaymentInstrumentService(token) {
      const creditCard = await CdeBackendService.getCdePaymentInstrumentByToken(token);
      this.$state.creditCardNumber = creditCard.panNumber;
      this.$state.expirationDate = moment(`${creditCard.expirationMonth}/${creditCard.expirationYear}`, "MM/YYYY");
      this.$state.cvv = "****"
      this.$state.firstName = creditCard.firstName
      this.$state.lastName = creditCard.lastName
      this.$state.address = creditCard.address
      this.$state.locality = creditCard.locality
      this.$state.administrativeArea = creditCard.administrativeArea
      this.$state.postalCode = creditCard.postalCode
      this.$state.country = creditCard.country
      this.$state.email = creditCard.email
      this.$state.phoneNumber = creditCard.phoneNo
    },
    async updatePaymentInstrumentService(token) {
      this.postPayloadCreditCard.accountPaymentInstrumentToken = token;
      const result = await CdeBackendService.patchCdePaymentInstrument(this.postPayloadCreditCard);
      return result
    },
    async createPaymentInstrumentService() {
      let tokenFromAccMgmt;
      try {
        tokenFromAccMgmt = await CdeBackendService.postAccMgmtPaymentInstrument();
        this.postPayloadCreditCard.accountPaymentInstrumentToken = tokenFromAccMgmt.accountPaymentInstrumentToken;
        const result = await CdeBackendService.postCdePaymentInstrument(this.postPayloadCreditCard);
        return result
      } catch (error) {
        if (tokenFromAccMgmt && tokenFromAccMgmt.accountPaymentInstrumentToken) {
          await CdeBackendService.deleteAccMgmt(tokenFromAccMgmt.accountPaymentInstrumentToken);
        }
        throw error
      }
    }
  }
})