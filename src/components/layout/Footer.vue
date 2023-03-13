<template>
  <v-footer padless>
    <div class="c">
      <div class="satu"><v-img class="img" src="LOGO_GIFU.png" /></div>
      <div class="dua">
        <h3>Visit Our Gallery</h3>
        <hr />
        <br />
        <h4>Jakarta</h4>
        <h5>
          Jl. Anggur I Blok U1 No.18, Taman Pulo Indah, Penggilingan, Kec.
          Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13940
        </h5>
        <br />
        <h4>Semarang</h4>
        <h5>Jl Puri Anjasmoro D2 No 10, Tawangsari, Semarang Barat</h5>
      </div>
      <div class="tiga">
        <h3>Opening hours</h3>
        <hr />
        <h5>Wednesday to Monday 10.00 to 18.00</h5>
        <br />
        <h3>Contact Us</h3>
        <hr />
        <v-icon>mdi-instagram</v-icon>Gifu_Invitation <br />
        <v-icon>mdi-instagram</v-icon>Gifu_Souvenirs <br />
        <v-icon>mdi-whatsapp</v-icon>Gifu_Souvenirs <br />
      </div>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
.c {
  display: grid;
  background-color: rgb(255, 231, 235);
  column-gap: 80px;
  padding: 30px;
  grid-template-columns: 1fr 2fr 1fr;
  bottom: 0;
}

.satu {
  align-self: center;
  justify-self: center;
}

.dua {
  align-self: center;
  justify-self: center;
}
.tiga {
  align-self: center;
  justify-self: center;
  line-height: 2;
}

.img {
  width: 270px;
}
</style>
