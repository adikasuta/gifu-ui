<template>
  <div>
    <h2>FREQUENTLY ASKED QUESTION</h2>
    <div class="faqcontainer">
      <FAQContent
        v-for="(item, index) in faq.left"
        :key="index"
        :question="item.question"
        :answer="item.answer"
      >
      </FAQContent>
      <FAQContent
        v-for="(item, index) in faq.right"
        :key="index"
        :question="item.question"
        :answer="item.answer"
      >
      </FAQContent>
    </div>
    <!-- <v-container>
      <v-row>
        <v-col cols="6">
          <v-row v-for="(item, index) in faq.left" :key="index">
            <v-col>
              <FAQContent :question="item.question" :answer="item.answer">
              </FAQContent>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row v-for="(item, index) in faq.right" :key="index">
            <v-col>
              <FAQContent :question="item.question" :answer="item.answer">
              </FAQContent>
            </v-col>
          </v-row>  
        </v-col>
      </v-row>
    </v-container> -->
  </div>
</template>
  
  
  <script>
import FAQContent from "./FAQContent";
import faq from "../../../assets/faq.json";
export default {
  components: {
    FAQContent,
  },
  data() {
    return {
      faq,
    };
  },
};
</script>

<style scoped>
.faqcontainer {
  display: grid;
  grid-template-columns: auto auto;
  justify-items: center;
  margin:50px;
}
h2 {
  font-size: 36px;
  margin: 30px 0 1rem 0;
  text-align: center;
}
</style>