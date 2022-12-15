import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "../../assets/strings.json"
import id from "vee-validate/dist/locale/id.json"
import en from "vee-validate/dist/locale/en.json"
messages.id.validation = id.messages
messages.en.validation = en.messages
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: "id",
    fallbackLocale: "en",
    messages
});

export default i18n;
