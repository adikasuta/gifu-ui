import {createLocalVue, mount} from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import Vuetify  from 'vuetify'
import i18n from '../../src/plugins/i18n'
import { PiniaVuePlugin } from 'pinia';
import CreditCardDetails from "../../src/views/CreditCardForm/CreditCardDetails.vue";
import CreditCardNumberField from "../../src/components/CreditCard/CreditCardNumberField.vue";
import CvvField from "../../src/components/CreditCard/CvvField.vue";
import ExpiryDateField from "../../src/components/CreditCard/ExpiryDateField.vue";
describe('Credit Card Details', ()=>{
    const localVue = createLocalVue()
    localVue.use(PiniaVuePlugin)
    let vuetify;
    let wrapper = null
    beforeEach(() => {
        i18n.locale='en'
        vuetify = new Vuetify()
        wrapper = mount(CreditCardDetails, {
            pinia: createTestingPinia({
                stubActions: true,
                initialState: {
                    CreditCard: {
                        creditCardName: "",
                        creditCardNumber: null,
                        expirationMonth: null,
                        expirationYear: null,
                        cvv: null
                    }
                }
            }),
            localVue,
            vuetify,
            i18n
        });
    })
    it('render all form',async ()=>{
        expect(wrapper.findComponent(CreditCardNumberField)).toBeDefined();
        expect(wrapper.findComponent(CvvField)).toBeDefined();
        expect(wrapper.findComponent(ExpiryDateField)).toBeDefined();
    })
    afterEach(() => {
        wrapper.destroy()
    })
})