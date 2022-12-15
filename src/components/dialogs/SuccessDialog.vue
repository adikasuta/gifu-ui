<template>
  <v-card style="border-top: 4px solid #00BFA5">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <div class="d-flex justify-end">
            <v-btn icon @click="hideDialog" max-width="36">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <v-list-item-title style="white-space: normal; text-align: center; padding-bottom: 24px;">{{ successDescription }}</v-list-item-title>

          <div class="d-flex justify-center" style="margin: 8px auto 12px;">
            <v-btn
              outlined
              small
              height="37"
              style="background-color: #AE2125; color: #FFFFFF; border-radius: 5px; font-weight: 600; padding: 0 16px; margin: 0 8px;"
              @click="hideDialog"
            >
              OK
            </v-btn>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "ErrorDialog",
  props: {
    successDescription: String
  },
  methods: {
    hideDialog() {
      this.$emit('close:dialog');
    }
  }
}
</script>