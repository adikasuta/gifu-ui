<template>
  <div>
    <v-container class="mt-10">
      <v-row>
        <v-col cols="4" offset="4">
          <v-text-field v-model="loginForm.email" label="Email"></v-text-field>

          <v-text-field
            type="password"
            v-model="loginForm.password"
            label="Password"
          ></v-text-field>

          <v-btn @click="handleSubmit" block class="mt-2">Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </div>
</template>

<script>
import AuthService from "../services/Auth.service";
import LoadingDialog from "../components/dialogs/LoadingDialog.vue";
import SessionUtils from "../utils/SessionUtils";
import { useErrorMessage } from "../store/error-message";

export default {
  components: {
    LoadingDialog,
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },
  async created() {
    this.loginForm = {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    async handleSubmit() {
      try {
        this.isLoading = true;
        const response = await AuthService.login(this.loginForm);
        SessionUtils.putSessionData("BEARER", response.token, 24 * 3);
        this.isLoading = false;
        this.$router.push("/dashboard");
      } catch (error) {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Password or Email is not valid";
        this.pushError({
          response: {
            data: {
              message: "Password or Email is not valid",
            },
            status: 401,
          },
        });
      }
    },
  },
};
</script>

<style scoped></style>
