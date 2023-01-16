<template>
    <!-- <v-app-bar absolute color="pink lighten-5"> -->
    <div class="container"><h1></h1>
        <div class="satu"><v-img class="img" src="LOGO_GIFU.png"/></div>
        <div>
            <h3>Visit Our Gallery</h3>
            <hr><br>
            <h4>Jakarta</h4>
            <h5>Jl. Anggur I Blok U1 No.18, Taman Pulo Indah, Penggilingan, Kec. Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13940</h5>
            <br>
            <h4>Semarang</h4>
            <h5>Jl Puri Anjasmoro D2 No 10, Tawangsari, Semarang Barat</h5>
        </div>
        <div class="tiga"> 
            <v-icon>mdi-instagram</v-icon>Gifu_Invitation <br>
            <v-icon>mdi-instagram</v-icon>Gifu_Souvenirs <br>
            <v-icon>mdi-whatsapp</v-icon>Gifu_Souvenirs <br>
        </div>
    </div>
    
    <!-- </v-app-bar> -->
 
</template>

<script>
export default {
    name: "HeaderComponent"}
</script>

<style scoped>
.container{
    display: flex;
    width: 100%;
    height: auto;
    background-color: rgb(255, 231, 235);
    justify-content: space-between;
    
}
.container div {
    width:30%;
    margin: 2px;
    padding: 12px;
}

.img{
    margin-top: 100px;
}
</style>