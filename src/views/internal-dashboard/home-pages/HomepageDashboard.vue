<template>
  <div>
    <v-card color="#FCE4EC">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item">
          {{ $t(item) }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in items" :key="item">
          <v-card color="basil" flat>
            <v-card-text>
              <OrderHistoricalTable v-if="index == 0" />  
              <OrderCheckoutTable v-if="index == 1" />  
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import OrderCheckoutTable from "../../../components/dashboard/OrderCheckoutTable";
import OrderHistoricalTable from "../../../components/dashboard/OrderHistoricalTable";
export default {
  components: { OrderHistoricalTable, OrderCheckoutTable },
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
  async created() {},
  computed: {},
  methods: {},
};
</script>
