<template>
    <div>
    <h1> Terima kasih atas pesanan Anda, <br>Invoice akan kami kirimkan dalam 24 jam</h1>
    <div class="buttons">
          <button @click="goToHomepage">BACK TO HOMEPAGE</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goToHomepage(){
            this.$router.push('/')
        },
}
}
</script>

<style scoped>
div{
    margin: 120px auto;
    text-align: center;
    width: 50%;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
button {
  transition-duration: 0.4s;
  margin: auto;
  padding: 10px;
  background-color: rgb(252, 225, 225);
  width: 180px;
  text-align: center;
}
</style>