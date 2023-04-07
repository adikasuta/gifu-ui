<template>
  <v-app>
    <HeaderComponent v-if="!this.$route.meta.hideHeader" />
    <SidebarComponent v-if="true && !this.$route.meta.hideSidebar" />
    <v-main>
      <v-sheet id="scrolling-techniques-7" class="overflow-y-auto">
        <router-view>
          <template v-slot:breadcrumb>
            <v-breadcrumbs :items="breadcrumbList">
              <template v-slot:item="{ item }">
                <v-breadcrumbs-item :href="item.link" :link="true" :disabled="item.disabled">
                  {{ item.name.toUpperCase() }}
                </v-breadcrumbs-item>
              </template>
            </v-breadcrumbs>
          </template>
        </router-view>
        <ErrorDialog />
        <AlertDialog />
        <FooterComponent v-if="!this.$route.meta.hideFooter" />
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
import ErrorDialog from "./components/dialogs/ErrorDialog"
import AlertDialog from "./components/dialogs/AlertDialog"
import Cookies from 'js-cookie';
import HeaderComponent from "./components/layout/Header";
import SidebarComponent from "./components/layout/Sidebar";
import FooterComponent from "./components/layout/Footer";
import { mapActions } from "pinia";
import { useReferenceData } from "./store/reference-data";
import { localize } from "vee-validate";
export default {
  name: "App",
  components: { ErrorDialog, AlertDialog, HeaderComponent, SidebarComponent, FooterComponent },
  data(){
    return {
      breadcrumbList: this.$route.meta.breadcrumb
    }
  },
  methods: {
    ...mapActions(useReferenceData, ["loadReferenceData"]),
    initLanguage: function () {
      const lang = Cookies.get("LANG");
      if (!lang) {
        Cookies.set("LANG", "id");
      }
      this.$i18n.locale = Cookies.get("LANG");
      localize(Cookies.get("LANG"));
    },
  },
  watch:{
    '$route'(){
      this.breadcrumbList = this.$route.meta.breadcrumb;
    }
  },
  created() {
    this.initLanguage();
    this.loadReferenceData();
  },
  mounted() {
    this.initLanguage();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lora");
@import url("https://fonts.googleapis.com/css?family=Poppins");
h1 {
  font-family: "Lora";
  font-size: 49px;
}
h2 {
  font-family: "Lora";
  font-size: 31px;
}
h3 {
  font-family: "Lora";
  font-weight: 600;
  font-size: 25px;
}
h4 {
  font-family: "Poppins";
  font-weight: 500;
  font-size: 20px;
}
h5 {
  font-family: "Poppins";
  font-weight: 400;
  font-size: 16px;
}

div {
  /* FONTSIZE 8 / 10 / 13 / 16 / 20 /25 / 31 / 39 / 49 */
  margin: 0;
}
</style>
