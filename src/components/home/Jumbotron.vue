<template>
  <v-card class="Banner">
    <v-img src="HomepageBanner.png" cover></v-img>
    <div class="BannerText">      
      <h1>Hello</h1>  
      <p>Cari Souvenir Murah berkualitas? bikin di GIFU aja. Banyak bonusnya! Siap kirim ke seluruh Indonesia.
Cukup pesan lewat WA, kami siap membuat souvenir impianmu, tanpa kamu harus keluar rumah.
Anti ribet, tinggal bagiin ke tamu aja!</p>
    <v-btn>Learn More</v-btn>
    </div>
  </v-card>
    
</template>

<script>
export default {
    name: "JumbotronComponent",
    components: {},
};
</script>

<style scoped>
.Banner {
  max-width: 100%;
  height:auto;
}
.BannerText {
  position: absolute;
  color:rgb(75, 75, 75);
  font-weight:bold;
  top:20%;
  margin-right:0;
  padding: 100px;
  width:50%;
  text-align : justify;
}


</style>