<template>
  <v-app>
    <v-main>
      <HeaderComponent>
        <router-view />
      </HeaderComponent>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from './components/home/Header'
import { localize } from 'vee-validate';
export default {
  name: 'App',
  components: { HeaderComponent },
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
