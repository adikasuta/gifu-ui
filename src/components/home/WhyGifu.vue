<template>
    <div class="cf co">
        <div class="WG1">
            <div class="content"> 
                
                <v-icon>mdi-shield-lock-outline</v-icon>
                <h3>{{ $t('whygifu.kualitas') }}</h3>
                <h4>{{ $t('whygifu.garansi') }}</h4>
            </div>
            <div class="content"> 
                <v-icon>mdi-shield-lock-outline</v-icon>
                <h3>{{ $t('whygifu.antiribet') }}</h3>
                <h4>{{ $t('whygifu.allin') }}</h4>
            </div>
        </div>
        <div class="WG2">
            <h2>WHY GIFU?</h2>
            <v-img src="WHY_GIFU.PNG"></v-img>
        </div>
        <div class="WG3">
            <div class="content"> 
                <v-icon>mdi-shield-lock-outline</v-icon>
                <h3>{{ $t('whygifu.safeshipment') }}</h3>
                <h4>{{ $t('whygifu.readytoship') }}</h4>
            </div>
            <div class="content"> 
                <v-icon>mdi-shield-lock-outline</v-icon>
                <h3>{{ $t('whygifu.onestop') }}</h3>
                <h4>{{ $t('whygifu.orderyours') }}</h4>
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
    background-color: rgb(255, 251, 252);
    width:100vw;
    margin:30px 30px 30px 10px;
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
    text-align: center;
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