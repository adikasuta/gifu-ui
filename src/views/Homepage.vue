<template>
  <div>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet">
    <JumbotronComponent></JumbotronComponent>
    <WhyGifuComponent></WhyGifuComponent>
    <SampleComponent></SampleComponent>
    <TestimonyComponent></TestimonyComponent>
    <FAQComponent></FAQComponent>
  </div>
</template>


<script>
import JumbotronComponent from '../components/home/Jumbotron'
import WhyGifuComponent from '../components/home/WhyGifu'
import SampleComponent from '../components/home/Sample'
import TestimonyComponent from '../components/home/Testimony'
import FAQComponent from '../components/home/FAQ'
export default {
  name: "HomepageComponent",
  components: {
    JumbotronComponent,
    WhyGifuComponent,
    SampleComponent,
    TestimonyComponent,
    FAQComponent
  },
  data() {
    return {
      status: "",
    };
  },
};
</script>
 
<style>
div{
  font-family: 'Poppins', sans-serif;
  /* FONTSIZE 8 / 10 / 13 / 16 / 20 /25 / 31 / 39 / 49 */
  margin:0;
}
</style>


