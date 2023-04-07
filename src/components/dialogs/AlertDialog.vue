<template>
    <v-dialog :value="getAlert.show" :width="$vuetify.breakpoint.xsOnly ? '100%' : '25%'" persistent>
      <v-card style="border-top: 4px solid #ae2125">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <div class="d-flex justify-end">
                <v-btn icon @click="hideDialog" max-width="36">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
  
              <v-list-item-title
                style="
                  white-space: normal;
                  text-align: center;
                  padding-bottom: 24px;
                "
              >
                <span>{{ getAlert.message }}</span>
              </v-list-item-title>
  
              <div class="d-flex justify-center" style="margin: 8px auto 12px">
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
                  @click="hideDialog"
                >
                  OK
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { mapActions, mapState } from "pinia";
  import { useAlertMessage } from "../../store/alert-message";
  export default {
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState(useAlertMessage, ["getAlert"]),
    },
    methods: {
      ...mapActions(useAlertMessage, ["reset"]),
      hideDialog() {
        this.reset();
      },
    },
  };
  </script>
  