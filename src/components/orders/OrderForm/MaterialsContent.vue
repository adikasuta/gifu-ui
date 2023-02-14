<template>
    <div class="material">
      <v-img :src="img" height="80px" width="80px"></v-img>
      <h4>{{ name }}</h4>
      <input type="number" class="input">
    </div>
</template>

<script>
export default {
  props: {
    img: String,
    name: String,
  },
}
</script>

<style scoped>
.material {
    text-align: center;
}
.input {
    border: 2px solid rgb(8, 8, 8);
    width:50px;
}
</style>