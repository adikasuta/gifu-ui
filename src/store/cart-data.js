import { defineStore } from "pinia";
import OrderService from "../services/PublicOrder.service";

export const useCartData = defineStore('CartData', {
  state: () => (
    {
      cartItems: [],
      paymentTerm: null,
      customerEmail: null,
      customerName: null,
      phoneNumber: null
    }
  ),
  getters: {
    getCheckoutPayload: (state) => {
      return {
        orderCodes: state.cartItems.map(it => it.orderCode),
        paymentTermCode: state.paymentTerm,
        customerEmail: state.customerEmail,
        customerName: state.customerName,
        phoneNumber: state.phoneNumber,
      }
    },
    getCartLength(state) {
      return state.cartItems.length
    },
    getCartItems(state) {
      return state.cartItems;
    }
  },
  actions: {
    reset() {
      this.$state.cartItems = [];
    },
    async checkout() {
      const payload = this.getCheckoutPayload
      return await OrderService.postCheckout(payload)
    },
    async removeFromCart(orderCode) {
      return await OrderService.removeFromCart(orderCode);
    },
    async loadCartItems() {
      this.$state.cartItems = await OrderService.getCart()
    }
  }
})