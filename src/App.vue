<template>
  <v-app>
    <HeaderComponent />
    <SidebarComponent v-if="true" />
    <v-main>
      <v-sheet id="scrolling-techniques-7" class="overflow-y-auto">
        <router-view />
        <FooterComponent />
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "./components/layout/Header";
import SidebarComponent from "./components/layout/Sidebar";
import FooterComponent from "./components/layout/Footer";
import { localize } from "vee-validate";
export default {
  name: "App",
  components: { HeaderComponent, SidebarComponent, FooterComponent },
  data: () => ({}),
  methods: {
    initLanguage: function () {
      const lang = window.$cookies.get("LANG");
      if (!lang) {
        window.$cookies.set("LANG", "id");
      }
      this.$i18n.locale = window.$cookies.get("LANG");
      localize(window.$cookies.get("LANG"));
    },
  },
  created() {
    this.initLanguage();
  },
  mounted() {
    this.initLanguage();
  },
};
</script>
