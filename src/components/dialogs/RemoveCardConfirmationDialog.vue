<template>
  <v-card style="font-family: 'Open Sans', sans-serif; text-align: center;">
    <v-list>
      <v-list-item>
        <v-spacer></v-spacer>
        <v-card-actions style="padding-right: 0px;">
          <v-btn icon @click="hideDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-list-item>

      <v-list-item>
        <v-list-item-title
          style="font-size: 16px; line-height: 26px; color: #272727; padding: 0px 0px 26px;"
        >
          {{ $t('tax_payment.view.alert_remove') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <div class="d-flex" style="margin: 8px auto 34px;">
          <v-btn
            outlined
            small
            height="37"
            style="background-color: #AE2125; color: #FFFFFF; border-radius: 5px; font-weight: 600; padding: 0 16px; margin: 0 8px;"
            @click="triggerRemoveCreditCard"
          >
            {{$t('common.yes')}}
          </v-btn>
          <v-btn
            outlined
            small
            height="37"
            style="background-color: #FFFFFF; border: 1px solid #979797; border-radius: 5px; color: #AE2125; font-weight: 600; padding: 0 16px; margin: 0 8px;"
            @click="hideDialog"
          >
            {{$t('common.no')}}
          </v-btn>
        </div>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "RemoveCardConfirmationDialog",
  methods: {
    hideDialog() {
      this.$emit("close:dialog");
    },
    async triggerRemoveCreditCard() {
      this.$emit("trigger:remove-card");
    }
  }
}
</script>