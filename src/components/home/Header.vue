<template>
    <v-app-bar
      absolute
      color="pink lighten-5"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-img src="LOGO_GIFU.png" max-height="80" max-width="80"/>
      <v-toolbar-title class="LogoName">GIFU | PT. Elyon Kriya Aguna</v-toolbar-title>

      <v-spacer></v-spacer>


      <v-btn text>SOUVENIR</v-btn>
      <v-btn text>INVITATION</v-btn>
      <v-btn text>TRACKING</v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

    </v-app-bar>
</template>
  
  
<script>

export default {
    name: "HeaderComponent",
    components: {},
};
</script>

<style scoped>
.LogoName {
  padding: 20px;
  color:rgb(75, 75, 75);
  font-weight:bold;
  text-align : justify;
}
</style>
   
  
  
  