<template>
  <div>
    <div class="cont" v-if="counter === 0">
      <div class="datacustomer">
        <h4>Name</h4>
        <h4>Address</h4>
        <h4>Phone</h4>
      </div>
      <div class="detailpesanan">
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Color</th>
              <th>Packaging</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Model</td>
              <td>Color</td>
              <td>Packaging</td>
              <td>Qty</td>
              <td>Price</td>
              <td>Total Amount</td>
            </tr>
            <tr>
              <td>Model</td>
              <td>Color</td>
              <td>Packaging</td>
              <td>Qty</td>
              <td>Price</td>
              <td>Total Amount</td>
            </tr>
            <tr>
              <td>Model</td>
              <td>Color</td>
              <td>Packaging</td>
              <td>Qty</td>
              <td>Price</td>
              <td>Total Amount</td>
            </tr>
            <tr>
              <td class="col" colspan="4"></td>
              <td>Sub Total</td>
              <td>Sub Total</td>
            </tr>
            <tr>
              <td class="col" colspan="4"></td>
              <td>Add Charge</td>
              <td>Add Charge</td>
            </tr>
            <tr>
              <td class="col" colspan="4"></td>
              <td>Cashback</td>
              <td>Cashback</td>
            </tr>
            <tr>
              <td class="col" colspan="4"></td>
              <td class="grand">Grand Total</td>
              <td class="grand">Grand Total</td>
            </tr>
          </tbody>
        </table>
        <table class="detail">
          <thead>
            <tr>
              <th>Item</th>
              <th>Desain No.</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paperbelt</td>
              <td>Desain No.</td>
              <td>Notes</td>
            </tr>
            <tr>
              <td rowspan="2">Sablon / Emboss</td>
              <td>By Request</td>
              <td>Notes</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Color</td>
            </tr>
            <tr>
              <td>Color Accs.</td>
              <td colspan="2">Color Accs.</td>
            </tr>
            <tr>
              <td>Notes</td>
              <td colspan="2">Notes</td>
            </tr>
          </tbody>
        </table>
        <div class="buttons">
          <button @click="previous">PREVIOUS</button>
          <button @click="next">NEXT</button>
        </div>
      </div>
    </div>
    <div class="disclaimer" v-if="counter === 1">
        <div class="ketentuanorder">
        <h4>Ketentuan order</h4>
        <p>Lorem Ipsum</p>
      </div>
      <div class="ketentuangaransi">
        <h4>Ketentuan garansi</h4>
        <p>Lorem Ipsum</p>
      </div>
      <div class="buttons">
          <button @click="previous">PREVIOUS</button>
          <button @click="goToCart">AGREE</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    goToCart(){
            this.$router.push('/Cart')
        },
    next() {
      this.counter++;
      this.$emit(this.counter);
    },
    previous() {
      this.counter--;
    },
  },
};
</script>

<style scoped>
.cont {
  margin-top: 100px;
}
.datacustomer {
  margin: 120px 10% 10px 10%;
}
.detailpesanan {
  margin: 120px 10% 10px 10%;
}
table {
  width: 80%;
  /* border: 1px solid #666666;  */
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #afafaf;
  padding: 10px 15px;
  text-align: left;
}
.col {
  border: 0px;
}
thead th {
  background-color: rgb(75, 122, 95);
  color: white;
  width: 15%;
}
.grand {
  background-color: rgb(170, 170, 170);
}
.detail {
  margin-top: 20px;
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
.disclaimer {
  margin-top: 100px;
  width: 80%;
}
</style>
