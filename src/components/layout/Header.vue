<template>
  <v-app-bar
    app
    absolute
    color="pink lighten-5"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <v-img
      @click="goToHome"
      src="LOGO_GIFU.png"
      max-height="80"
      max-width="80"
    />
    <v-toolbar-title @click="goToHome" class="LogoName"
      >GIFU | PT. Elyon Kriya Aguna</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-btn text link href="#/products?productType=SOUVENIR">{{
      $t("header.souvenir")
    }}</v-btn>
    <v-btn text link href="#/products?productType=INVITATION">{{
      $t("header.invitation")
    }}</v-btn>
    <v-btn text @click="goToTracking">{{ $t("header.tracking") }}</v-btn>
    <v-btn icon @click="goToCart">
      <v-badge :content="getCartLength" :value="getCartLength>0" bordered overlap><v-icon>mdi-cart</v-icon></v-badge>
    </v-btn>
    <v-btn icon>
      <v-icon @click="toggleLanguage">mdi-translate</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import Cookies from "js-cookie";
import { mapState } from "pinia";
import { useCartData } from "../../store/cart-data";
export default {
  name: "HeaderComponent",
  computed:{
    ...mapState(useCartData, ["getCartLength"]),
  },
  components: {},
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    goToTracking() {
      this.$router.push("/theTracking");
    },
    goToSouvenir() {
      this.$router.push("/Souvenir");
    },
    goToInvitation() {
      this.$router.push("/Invitation");
    },
    goToCart() {
      this.$router.push("/Cart");
    },
    toggleLanguage() {
      const lang = Cookies.get("LANG");
      if (lang == "id") {
        Cookies.set("LANG", "en");
      } else {
        Cookies.set("LANG", "id");
      }
      this.$i18n.locale = Cookies.get("LANG");
    },
  },
};
</script>

<style scoped>
.LogoName {
  padding: 20px;
  color: rgb(75, 75, 75);
  font-weight: bold;
  text-align: justify;
}
/* .header{
    position: relative;
} */
</style>
