<template>
  <v-container>
    <slot name="breadcrumb"></slot>
    <BasicForm>
      <template v-slot:header>
        {{ $t("views.administration.title") }}
      </template>
      <template v-slot:body>
        <v-row>
          <v-col cols="8">
            <v-text-field
              v-model="filterItems.searchQuery"
              label="Search"
              outlined
              clearable
              @change="handleRefresh"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="filterItems.roleId"
              :items="roles"
              :label="$t('views.administration.fields.role')"
              outlined
              @change="handleRefresh"
            ></v-select>
          </v-col>
        </v-row>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  {{ $t("views.administration.fields.name") }}
                </th>
                <th class="text-left">
                  {{ $t("views.administration.fields.role") }}
                </th>
                <th class="text-left">
                  {{ $t("views.administration.fields.status") }}
                </th>
                <!-- <th class="text-left">
                  {{ $t("views.administration.fields.action") }}
                </th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in users" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.roleName }}</td>
                <td>
                  {{
                    item.active
                      ? $t("views.administration.active")
                      : $t("views.administration.inactive")
                  }}
                </td>
                <!-- <td>
                  <v-btn
                    elevation="2"
                    class="mr-5"
                    color="primary"
                    @click="
                      () => {
                        handleEdit(item);
                      }
                    "
                  >
                    {{ $t("views.administration.edit") }}</v-btn
                  >
                </td> -->
              </tr>
              <tr v-if="users.length === 0">
                <td colspan="5">No matching records found</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
      <template v-slot:footer>
        <v-row>
          <!-- <v-col cols="6">
            <v-btn
              elevation="2"
              class="mr-5"
              color="primary"
              @click="
                () => {
                  handleAdd(item);
                }
              "
            >
              {{ $t("views.administration.addAccount") }}</v-btn
            >
          </v-col> -->
          <v-col cols="12">
            <v-pagination
          @input="handleRefresh"
              v-model="pagination.pageNumber"
              :length="pagination.totalPages"
            ></v-pagination>
          </v-col>
        </v-row>
      </template>
    </BasicForm>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <ConfirmationDialog ref="confirmationDialog" />
  </v-container>
</template>

<script>
import ConfirmationDialog from "../../../components/dialogs/ConfirmationDialog";
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import BasicForm from "../../../components/layout/BasicForm";
import UserService from "../../../services/User.service";
import { mapState, mapActions } from "pinia";
import { useReferenceData } from "../../../store/reference-data";
import { useErrorMessage } from "../../../store/error-message";
export default {
  components: {
    BasicForm,
    ConfirmationDialog,
    LoadingDialog,
  },
  data() {
    return {
      filterItems: {
        searchQuery: "",
        roleId: null,
      },
      users: [],
      pagination: {
        pageNumber: 1,
        totalPages: 0,
        pageSize: 20,
      },
      isLoading: false,
    };
  },
  async created() {
    await this.handleRefresh();
  },
  computed: {
    ...mapState(useReferenceData, ["roles"]),
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    async handleAdd() {},
    async handleEdit() {},
    // async handleInactivate(id) {
    //   const yes = await this.$refs.confirmationDialog.showDialog(
    //     "views.variant.confirmations.removeContent"
    //   );
    //   if (yes) {
    //     try {
    //       this.isLoading = true;
    //       await VariantService.deleteContent(this.id, contentId);
    //       await this.handleRefresh();
    //       this.isLoading = false;
    //     } catch (error) {
    //       this.isLoading = false;
    //       this.isError = true;
    //       this.errorMessage = "Unhandled Error";
    //       if (error.response) {
    //         this.errorMessage = error.response.data.message;
    //       }
    //     }
    //   }
    // },
    async handleRefresh() {
      try {
        this.isLoading = true;
        const response = await UserService.searchUser({
          ...this.filterItems,
          ...this.pagination,
        });
        this.users = response.content;
        this.pagination.totalPages = response.totalPages;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.pushError(error);
      }
    },
  },
};
</script>
