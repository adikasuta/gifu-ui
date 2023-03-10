<template>
  <div
    style="background-color: white; height: 100px; display: flex; justify-content: center; align-items: center"
  >
    <v-progress-circular
      indeterminate
      size="50"
      color="#AE2125"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "LoadingDialog"
}
</script>