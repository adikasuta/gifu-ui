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
    <v-dialog v-model="isError" width="25%" persistent>
      <ErrorDialog
        :errorDescription="errorMessage"
        @close:dialog="isError = !isError"
      />
    </v-dialog>
  </div>
</template>

<script>
import AuthService from "../services/Auth.service";
import ErrorDialog from "../components/dialogs/ErrorDialog.vue";
import LoadingDialog from "../components/dialogs/LoadingDialog.vue";
import SessionUtils from "../utils/SessionUtils";

export default {
  components: {
    ErrorDialog,
    LoadingDialog,
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  async created() {
    this.loginForm = {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true;
        const response = await AuthService.login(this.loginForm);
        SessionUtils.putSessionData("BEARER", response.token, 24*3)
        this.isLoading = false;
        this.$router.push("/dashboard");
      } catch (error) {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Password or Email is not valid";
      }
    },
  },
};
</script>

<style scoped></style>
