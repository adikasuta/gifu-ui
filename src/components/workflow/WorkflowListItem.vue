<template>
  <WorkflowViewMode
    v-if="isView"
    :workflow="workflow"
    @on:edit="handleEdit"
  />
  <WorkflowEditMode v-else :workflow="workflow"
    @on:refresh="handleRefresh" @on:view="handleView" />
</template>

<script>
import WorkflowEditMode from './WorkflowEditMode'
import WorkflowViewMode from './WorkflowViewMode'
export default {
  name: "WorkflowListItem",
  components:{
    WorkflowEditMode,
    WorkflowViewMode
  },
  props: ["workflow"],
  data() {
    return {
      isView: this.workflow.isView,
    };
  },
  methods: {
    handleRefresh(){
      this.$emit("on:refresh");
    },
    handleView(){
      this.isView = true;
    },
    handleEdit() {
        this.isView = false;
    },
  },
};
</script>

<style scoped></style>
