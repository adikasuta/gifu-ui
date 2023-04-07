import { defineStore } from "pinia";

export const useAlertMessage = defineStore('AlertMessage', {
    state: () => (
        {
            message: "",
            show: false,
        }
    ),
    getters: {
        getAlert(state) {
            return {
                message: state.message,
                show: state.show,
            }
        }
    },
    actions: {
        reset() {
            this.$state.show = false;
            this.$state.message = "";
        },
        pushAlert(message) {
            this.$state.show = true;
            this.$state.message = message;
        }
    }
})