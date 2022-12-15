import { createLocalVue, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import Vuetify from 'vuetify'
import i18n from '../../../src/plugins/i18n'
import { PiniaVuePlugin } from 'pinia';
import CreditCardDetails from "../../../src/views/CreditCardForm/CreditCardDetails.vue";
import flushPromises from 'flush-promises';
import CvvField from "../../../src/components/CreditCard/CvvField.vue";
describe('CVV', () => {
    const localVue = createLocalVue()
    localVue.use(PiniaVuePlugin)
    let vuetify;
    let wrapper = null
    beforeEach(() => {
        i18n.locale = 'en'
        vuetify = new Vuetify()
        wrapper = mount(CvvField, {
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
    it('show error message required credit card number',async () => {
        const input = wrapper.findComponent("#cvv")
        input.find('input').setValue('');
        await flushPromises();
        const error = wrapper.vm.$refs.cvvProvider.errors[0];
        expect(error).toEqual('The CVV field is required')
    });
    it('show valid cvv number',async () => {
        const input = wrapper.findComponent("#cvv")
        input.find('input').setValue('123');
        await flushPromises();
        const error = wrapper.vm.$refs.cvvProvider.errors[0];
        expect(error).toBeFalsy()
    });
    afterEach(() => {
        wrapper.destroy()
    })
})