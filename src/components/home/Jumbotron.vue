<template>
  <div class="Banner">
    <div class="BannerText">
      <h1>{{ $t('jumbotron.title') }}</h1>
      <h4>
        {{ $t('jumbotron.content') }}
      </h4><br>
      <v-btn>Learn More</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "JumbotronComponent",
  components: {},
};
</script>

<style scoped>
.Banner {
  background-image: url(../../../public/HomepageBanner.png);
  width:100vw;
  height: 100vh;
  margin:0 0 0 550;
  box-sizing: border-box;
  position: relative;
}
.BannerText {
  width: 50vh;
  z-index: 1;
  position: absolute;
  left: 10%;
  top: 30%;
}

</style>