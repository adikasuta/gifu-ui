import Vue from "vue";
import stringUtility from "../../src/utils/StringUtils";

Vue.filter("formatCardNumber", function(value) {
  return stringUtility.formatCardNumber(value);
});
