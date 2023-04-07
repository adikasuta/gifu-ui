<template>
  <div>
    <v-card color="#FCE4EC">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in tabItems" :key="item">
          {{ $t(item) }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in tabItems" :key="item">
          <v-card color="basil" flat>
            <v-card-text>
              <OrderHistoricalTable v-if="item == 'views.dashboard.orderHistoryData'" />
              <OrderCheckoutTable v-if="item == 'views.dashboard.billOrder'" />
              <StaffJobUpdate v-if="item == 'views.dashboard.staffTodoList'"/>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import SessionUtils from "../../../utils/SessionUtils";
import StaffJobUpdate from "../../../components/dashboard/StaffJobUpdate";
import OrderCheckoutTable from "../../../components/dashboard/OrderCheckoutTable";
import OrderHistoricalTable from "../../../components/dashboard/OrderHistoricalTable";
export default {
  components: { OrderHistoricalTable, OrderCheckoutTable, StaffJobUpdate },
  data() {
    return {
      tab: null,
      items: [
        "views.dashboard.orderHistoryData",
        "views.dashboard.billOrder",
        "views.dashboard.staffTodoList",
      ],
    };
  },
  computed: {
    tabItems(){
      let items = [];
      if(this.hasPermission('historical_order_table')){
        items.push("views.dashboard.orderHistoryData");
      }
      if(this.hasPermission('bill_order')){
        items.push("views.dashboard.billOrder");
      }
      if(this.hasPermission('staff_assignment')){
        items.push("views.dashboard.staffTodoList");
      }
      return items;
    }
  },
  methods: {
    ...SessionUtils,
  },
};
</script>
