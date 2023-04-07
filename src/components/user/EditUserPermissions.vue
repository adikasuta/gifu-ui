<template>
  <v-container>
    <slot name="breadcrumb"></slot>
    <BasicForm>
      <template v-slot:header>
        {{ $t("views.administration.editPermissions") }}
      </template>
      <template v-slot:body>
        <v-simple-table :dense="true">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  {{ $t("views.administration.fields.permission") }}
                </th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in permissions" :key="index">
                <td>{{ $t(item.permissionName) }}</td>
                <td style="padding: 10px;">
                  <v-switch style="margin: 0;"
                  hide-details
                    color="pink lighten-1"
                    v-model="item.granted"
                    @change="(e) => handleChange(e, item)"
                  ></v-switch>
                </td>
              </tr>
              <tr v-if="permissions.length === 0">
                <td colspan="2">No matching records found</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </BasicForm>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </v-container>
</template>

<script>
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import BasicForm from "../layout/BasicForm";
import UserService from "../../services/User.service";
import { mapActions } from "pinia";
import { useErrorMessage } from "../../store/error-message";
export default {
  props: ["userId"],
  components: {
    BasicForm,
    LoadingDialog,
  },
  data() {
    return {
      permissions: [],
    };
  },
  async created() {
    await this.handleRefresh();
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),

    async handleChange(newValue, item) {
      try {
        this.isLoading = true;
        await UserService.editPermissions(this.userId, {
            permissionId:item.permissionId,
            granted: newValue
        });
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.pushError(error);
      }
    },
    async handleRefresh() {
      try {
        this.isLoading = false;
        this.permissions = await UserService.getPermissions(this.userId);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.pushError(error);
      }
    },
  },
};
</script>
