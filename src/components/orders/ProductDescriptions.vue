<template>
      <div>
    <div class="product">
      <v-img :src="img" height="600px"></v-img>
      <h3>{{ name }}</h3>
      <h4>{{ price }}</h4>
      <h5>{{ size }}</h5>
      <h6>{{ weight }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    name: String,
    price: String,
    size: String,
    weight: String,
  },
  }
</script>