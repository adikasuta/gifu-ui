<template>
  <v-app>
    <v-main>
      <HeaderComponent>
        
      <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="600">
        <v-container>

          <router-view />
        </v-container>
      </v-sheet>

    </HeaderComponent>
    <JumbotronComponent></JumbotronComponent>
    <WhyGifuComponent></WhyGifuComponent>
    <SampleComponent></SampleComponent>>
    <TestimonyComponent></TestimonyComponent>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from './components/home/Header'
import JumbotronComponent from './components/home/Jumbotron'
import WhyGifuComponent from './components/home/WhyGifu'
import SampleComponent from './components/home/Sample'
import TestimonyComponent from './components/home/Testimony'
import { localize } from 'vee-validate';
export default {
  name: 'App',
  components: {HeaderComponent, JumbotronComponent, WhyGifuComponent,SampleComponent,TestimonyComponent},
  data: () => ({
    //
  }),
  methods: {
    initLanguage: function () {

      this.$i18n.locale = window.$cookies.get('LANG')
      localize(window.$cookies.get('LANG'))
    }
  },
  created() {
    this.initLanguage()
  },
  mounted() {
    this.initLanguage()
  }
};
</script>
