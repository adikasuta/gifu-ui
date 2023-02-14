<template>
    <div><h1>Cart</h1>
      <div class="cartcard">
        <div class="satu">
          <img src="/products/souvenirs/01.png" alt="">
        </div>
        <div class="dua">
          <h1>NAMA PRODUK</h1>
          <h2>Deskripsi produk</h2>
         <button>EDIT</button>
         <button>DELETE</button>
         <button>CHECK INVOICE</button>
        </div>
        <div class="tiga">
          <h2>PRICE</h2>
        </div>
        <div class="empat">
          <h2>QTY</h2>
        </div>
        <div class="lima">
          <h2>TOTAL PRICE</h2>

        </div>
        <cartCard></cartCard>
      </div>
      <div class="buttons">
          <button @click="previous">TAMBAH PRODUK LAINNYA</button>
          <button @click="goToCheckout">CHECKOUT</button>
        </div>
      </div>
      <!-- <table>
        <tr>
            <td>GAMBAR PRODUK</td>
            <td>NAMA PRODUK</td>
            <td>HARGA</td>
            <td>JUMLAH</td>
            <td>TOTAL HARGA</td>
        </tr>
    </table> -->
    
    
</template>

<script>
import cartCard from "../components/cart/cartCard.vue";
export default {
  methods:{
    goToCheckout(){
            this.$router.push('/Checkout')
        }
  },
  components: { cartCard }
};
</script>

<style scoped>
h1{
  margin-top: 5%;
}
table {
  border-collapse: collapse;
  border-style: hidden;
}
tr,
td {
  border: 1px solid;
  padding: 16px;
  text-align: left;
}
.cartcard {
  display: flex;
  gap: 20px;
  width: 80%;
  margin: 10% auto;
  border: 50px salmon;
  border-radius: 25px;
  box-shadow: 10px 10px 15px rgb(245, 200, 215);
  
}
.dua {
  width: 50%;
}
.tiga, .empat, .lima{
  width: 10%;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
button {
  transition-duration: 0.4s;
  margin: 10px;
  padding: 10px;
  background-color: rgb(252, 225, 225);
  width: 180px;
  text-align: center;
}
</style>

