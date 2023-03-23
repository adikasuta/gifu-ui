<template>
  <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" permanent>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>Hi Sandra</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link v-bind="attrs" v-on="on">
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Sandra Adams
              </v-list-item-title>
              <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list nav dense>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-home-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-list-box</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Products</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-format-list-group</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Catalog</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-sitemap</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Workflow</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Roles and Permissions</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SidebarComponent",
  components: {},
  data() {
    return {
      drawer: true,
      mini: true,
    };
  },
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

<style scoped></style>
