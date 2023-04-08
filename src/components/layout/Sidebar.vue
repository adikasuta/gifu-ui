<template>
  <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" permanent>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar color="red">
          <!-- <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img> -->
          <span class="white--text text-h5">{{ initials }}</span>
        </v-list-item-avatar>
        <v-list-item-title>Hi {{ userName }}</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link v-bind="attrs" v-on="on">
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ userName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list nav dense>
          <v-list-item link href="#/dashboard/profile">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{$t('views.profile.title')}}</v-list-item-title>
          </v-list-item>

          <v-list-item link href="#/dashboard/change-password">
            <v-list-item-icon>
              <v-icon>mdi-lock-reset</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{$t('views.profile.changePassword')}}</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{$t('views.profile.logout')}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link href="#/dashboard">
        <v-list-item-icon>
          <v-icon>mdi-home-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link href="#/dashboard/product">
        <v-list-item-icon>
          <v-icon>mdi-list-box</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Products</v-list-item-title>
      </v-list-item>
      <v-list-item link href="#/dashboard/variant">
        <v-list-item-icon>
          <v-icon>mdi-format-list-group</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Catalog</v-list-item-title>
      </v-list-item>
      <v-list-item link href="#/dashboard/workflow">
        <v-list-item-icon>
          <v-icon>mdi-sitemap</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Workflow</v-list-item-title>
      </v-list-item>
      <v-list-item link href="#/dashboard/user">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-title>User Administration</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import SessionUtils from "../../utils/SessionUtils";
import StringUtils from "../../utils/StringUtils";
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
    logout() {
      SessionUtils.clearCookie();
      this.$router.push("/login");
    },
  },
  computed: {
    initials() {
      return StringUtils.getInitials(SessionUtils.getSessionData().name);
    },
    userName() {
      return SessionUtils.getSessionData().name;
    },
    userEmail() {
      return SessionUtils.getSessionData().email;
    },
  },
};
</script>

<style scoped></style>
