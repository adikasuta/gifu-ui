<template>
  <div>
      <h2>Frequently Asked Question</h2>
      <div  class="container">
      <FAQContent  v-for="faq in faq"
        :key="faq.question"
        :question="faq.question"
        :answer="faq.answer"></FAQContent>
      </div >
    </div>
  </template>
  
  
  <script>
  import FAQContent from './FAQContent'
  // import faq from "../../../assets/faq.json"
  export default {
    components: {
    FAQContent,
    },
    data()
    { return {
      // faq
      faq:[
        {
          question:'Minimal order berapa?',
          answer:'Beberapa produk kami bisa dipesan mulai 30 pcs dan 100 pcs'
        },
        {
          question:'Pengerjaan Berapa lama?',
          answer:'Lama Pengerjaan masing-masing produk berbeda, berkisar antara 2-6 minggu'
        },
        {
          question:'aaaa',
          answer:'bbb'
        },
        {
          question:'ccc',
          answer:'bbb'
        },
        {
          question:'aaaa',
          answer:'bbb'
        },

      ]
    }
  }
}
  </script>

<style scoped>
.container{
  padding: auto;
  width: 100%;
  display:flex;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.items {
  align-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 50%;
  max-width: 50%;
  background-color: rgb(255, 235, 239);
}
h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
  text-align: center;
}

</style>