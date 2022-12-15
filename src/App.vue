<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { localize } from 'vee-validate';
export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods:{
    initLanguage: function(){

      this.$i18n.locale = window.$cookies.get('LANG')
      localize(window.$cookies.get('LANG'))
    }
  },
  created(){
    this.initLanguage()
  },
  mounted() {
    this.initLanguage()
  }
};
</script>
