import { defineStore } from "pinia";

export const useErrorMessage = defineStore('ErrorMessage', {
    state: () => (
        {
            errorDescription: "",
            errorCode: "",
            errorShow: false,
        }
    ),
    getters: {
        getError(state) {
            return {
                errorCode: state.errorCode,
                errorDescription: state.errorDescription,
                errorShow: state.errorShow,
            }
        }
    },
    actions: {
        reset() {
            this.$state.errorShow = false;
            this.$state.errorDescription = "";
            this.$state.errorCode = "";
        },
        pushError(error) {
            this.$state.errorShow = true;
            this.$state.errorDescription = "Unhandled Error";
            this.$state.errorCode = 500;
            if (error.response) {
                this.$state.errorDescription = error.response.data.message;
                this.$state.errorCode = error.response.status;
            }
        }
    }
})