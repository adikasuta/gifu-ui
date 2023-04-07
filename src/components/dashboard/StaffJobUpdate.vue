<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.productName") }}
            </th>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.quantity") }}
            </th>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.deadline") }}
            </th>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.assigneeName") }}
            </th>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.stepName") }}
            </th>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.statusName") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tasks" :key="index">
            <td>{{ item.orderDto.productName }}</td>
            <td>{{ item.orderDto.quantity }} pcs</td>
            <td>{{ item.orderDto.deadline }}</td>
            <td>{{ item.assigneeName }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-select
                class="mt-5"
                v-model="item.newStatusId"
                :items="item.statuses"
                item-value="id"
                item-text="name"
                :readonly="item.statuses.length <= 1"
                :label="$t('views.staffTasks.fields.statusName')"
                outlined
                @change="(e) => handleChangeStatus(e, item)"
              ></v-select>
            </td>
          </tr>
          <tr v-if="tasks.length === 0">
            <td colspan="6">No matching records found</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <ConfirmationDialog ref="confirmationDialog" />
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </div>
</template>

<script>
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import TimelineService from "../../services/Timeline.service";
import { mapState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useErrorMessage } from "../../store/error-message";
export default {
  components: {
    LoadingDialog,
    ConfirmationDialog,
  },
  data() {
    return {
      tasks: [],
      filterItems: {
        query: "",
        dateRanges: [],
        statuses: [],
        productType: null,
      },
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  async created() {
    await this.handleRefresh();
  },
  computed: {
    ...mapState(useReferenceData, ["orderStatuses", "productTypes"]),
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    async handleChangeStatus(newStatus, item) {
      const yes = await this.$refs.confirmationDialog.showDialog(
        "views.dashboard.changeStatusConfirmation"
      );
      if (yes) {
        try {
          this.isLoading = true;
          await TimelineService.changeStatus({
            timelineId: item.timelineId,
            currentStepId: item.id,
            newStatusId: newStatus,
          });
          await this.handleRefresh();
          this.isLoading = false;
        } catch (error) {
          console.log(error);
          this.isLoading = false;
          this.pushError(error);
        }
      } else {
        item.newStatusId = item.currentStatusId;
      }
    },
    async handleRefresh() {
      try {
        this.isLoading = true;
        const res = await TimelineService.searchTasks();
        this.tasks = res.map((it) => {
          return {
            ...it,
            newStatusId: it.currentStatusId,
          };
        });
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.pushError(error);
      }
    },
  },
};
</script>
