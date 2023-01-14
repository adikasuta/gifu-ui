<template>
  <div>
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
 


