<template>
    <div class="cf co">
        <div class="WG1">
            <div class="content"> 
                
                <v-icon>mdi-shield-lock-outline</v-icon>
                <h1>Kualitas Bergaransi</h1>
                <h4>Souvenirmu tidak sesuai pesanan? Jangan khawatir, kami siap RETUR!</h4>
            </div>
            <div class="content"> 
                <v-icon>mdi-shield-lock-outline</v-icon>
                <h1>Anti Ribet</h1>
                <h4>Sudah ALL IN termasuk emboss / cetak nama, packaging, kartu ucapan terima kasih, dan kupon pengambilan souvenir. Gak usah ribet lagi deh!</h4>
            </div>
        </div>
        <div class="WG2">
            <v-img src="WHY_GIFU.PNG"></v-img>
        </div>
        <div class="WG3">
            <div class="content"> 
                <v-icon>mdi-shield-lock-outline</v-icon>
                <h1>Pengiriman Aman</h1>
                <h4>Siap kirim ke seluruh Indonesia. Tak perlu ragu, kamu bisa pesan sample dulu lho!</h4>
            </div>
            <div class="content"> 
                <v-icon>mdi-shield-lock-outline</v-icon>
                <h1>One Stop Services</h1>
                <h4>Pesan Souvenir, Undangan Fisik, Undangan Digital, Hampers, dan Bridesmaid Box cukup di satu tempat saja</h4>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "WhyGifuComponent",
    components: {},
};
</script>

<style scoped>
.co {
    background-color: rgb(255, 240, 243);
}
.WG1 {
    width:35%;
    float: left;
    height:800 px;
}
.WG2 {
    width:30%;
    float: left;
    height:800 px;
}
.WG3 {
    width:35%;
    height:800 px;
    float: left;
}
.content{
    padding:5%;
    font-family: 'Poppins', sans-serif;
    margin-top: 20%;
}

/**
 * For modern browsers
 * 1. The space content is one way to avoid an Opera bug when the
 *    contenteditable attribute is included anywhere else in the document.
 *    Otherwise it causes space to appear at the top and bottom of elements
 *    that are clearfixed.
 * 2. The use of `table` rather than `block` is only necessary if using
 *    `:before` to contain the top-margins of child elements.
 */
 .cf:before,
.cf:after {
    content: " "; /* 1 */
    display: table; /* 2 */
}

.cf:after {
    clear: both;
}

/**
 * For IE 6/7 only
 * Include this rule to trigger hasLayout and contain floats.
 */
.cf {
    *zoom: 1;
}
</style>