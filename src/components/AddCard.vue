<template>
  <div>
    <v-hover v-slot="{ hover }">
    <div v-if="hover">
      <div
        class="mt-8 pa-3"
        style="border-radius: 10px; border: 1px solid #888; color: #888; background-color: #F5F5F5; box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.2); width: 150px; cursor: pointer; height: 98px; text-align: center; line-height: 74px;"
        @click="doAdd"
      >
        <v-icon x-large class="mr-1">mdi-plus</v-icon>
      </div>
    </div>
    <div v-else>
      <div class="mt-8 pa-3" style="border-radius: 10px; border: 1px solid #888; color: #888; width: 150px; height: 98px; text-align: center; line-height: 74px;">
        <v-icon x-large class="mr-1">mdi-plus</v-icon>
      </div>
    </div>
  </v-hover>
    <v-dialog v-model="errorDialog" width="450" persistent>
      <ErrorDialog :error-description="$t('common.limit_card_reached')" @close:dialog="toggleErrorDialog" />
    </v-dialog>
  </div>
  
</template>

<script>
import ErrorDialog from "../components/dialogs/ErrorDialog.vue";
export default {
  name: 'AddCard',
  components: {
    ErrorDialog
  },
  props: {
    isLimitReached: Boolean
  },
  data() {
    return {
      errorDialog: false,
      errorDescription: ""
    }
  },
  methods: {
    doAdd() {
      if (this.isLimitReached){
        this.toggleErrorDialog();
      } 
      else this.goToAddCreditCardPage();
    },
    toggleErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },
    goToAddCreditCardPage() {
      console.log('AddCreditCardPage: Show Form')
      this.$router.push('/credit-card/create')
    }
  }
}
</script>