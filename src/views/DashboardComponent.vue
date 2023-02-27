<template>
  
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.dark.background }"
  >
    <SideBarComponent />
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <v-row>
            <v-col cols="12" sm="12">
              <OverviewComponent />
              <ProfileComponent />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import SideBarComponent from "../components/dashboard/SideBarComponent";
import OverviewComponent from "../components/dashboard/OverviewComponent";
import ProfileComponent from "../components/dashboard/ProfileComponent";
export default {
  data: () => ({}),
  components: {
    SideBarComponent,
    OverviewComponent,
    ProfileComponent
  },
};
</script>
<style>
.v-btn.withoutupercase {
  text-transform: none !important;
}
.v-btn:not(.v-btn--round).v-size--small {
  min-width: 30px !important;
  padding: 0 5px !important;
}
</style>