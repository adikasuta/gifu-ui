<template>
  <div>
    <JumbotronComponent></JumbotronComponent>
    <WhyGifuComponent></WhyGifuComponent>
    <SampleComponent></SampleComponent>
    <TestimonyComponent></TestimonyComponent>
  </div>
</template>


<script>
import JumbotronComponent from '../components/home/Jumbotron'
import WhyGifuComponent from '../components/home/WhyGifu'
import SampleComponent from '../components/home/Sample'
import TestimonyComponent from '../components/home/Testimony'
export default {
  name: "HomepageComponent",
  components: {
    JumbotronComponent,
    WhyGifuComponent,
    SampleComponent,
    TestimonyComponent
  },
  data() {
    return {
      status: "",
    };
  },
};
</script>
 


