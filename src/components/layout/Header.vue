<template>
  <v-app-bar
    app
    absolute
    color="pink lighten-5"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <v-img src="LOGO_GIFU.png" max-height="80" max-width="80" />
    <v-toolbar-title class="LogoName"
      >GIFU | PT. Elyon Kriya Aguna</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-btn text @click="goToSouvenir">{{ $t("header.souvenir") }}</v-btn>
    <v-btn text @click="goToInvitation">{{ $t("header.invitation") }}</v-btn>
    <v-btn text @click="goToTracking">{{ $t("header.tracking") }}</v-btn>
    <v-btn icon @click="goToCart">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon @click="toggleLanguage">mdi-translate</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderComponent",
  components: {},
  methods: {
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
      const lang = window.$cookies.get("LANG");
      if (lang == "id") {
        window.$cookies.set("LANG", "en");
      } else {
        window.$cookies.set("LANG", "id");
      }
      this.$i18n.locale = window.$cookies.get("LANG");
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
