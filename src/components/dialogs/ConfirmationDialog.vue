<template>
  <v-dialog v-model="isShow" persistent width="50%">
    <v-card style="text-align: center">
      <v-list>
        <v-list-item>
          <v-spacer></v-spacer>
          <v-card-actions style="padding-right: 0px">
            <v-btn icon @click="_cancel">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-list-item>

        <v-list-item>
          <v-list-item-title
            style="
              font-size: 16px;
              line-height: 26px;
              color: #272727;
              padding: 0px 0px 26px;
            "
          >
            {{ $t(title) }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <div class="d-flex" style="margin: 8px auto 34px">
            <v-btn
              outlined
              small
              height="37"
              style="
                background-color: #ae2125;
                color: #ffffff;
                border-radius: 5px;
                font-weight: 600;
                padding: 0 16px;
                margin: 0 8px;
              "
              @click="_confirm"
            >
              {{ $t("common.yes") }}
            </v-btn>
            <v-btn
              outlined
              small
              height="37"
              style="
                background-color: #ffffff;
                border: 1px solid #979797;
                border-radius: 5px;
                color: #ae2125;
                font-weight: 600;
                padding: 0 16px;
                margin: 0 8px;
              "
              @click="_cancel"
            >
              {{ $t("common.cancel") }}
            </v-btn>
          </div>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmationDialog",
  data() {
    return {
      isShow: false,
      title: '',
    };
  },
  methods: {
    showDialog(title) {
      this.title = title;
      this.isShow = true;
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    _confirm() {
      this.isShow = false;
      this.resolvePromise(true);
    },
    _cancel() {
      this.isShow = false;
      this.resolvePromise(false);
    },
  },
};
</script>
