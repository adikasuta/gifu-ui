import { createLocalVue, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import Vuetify from 'vuetify'
import i18n from '../../../src/plugins/i18n'
import { PiniaVuePlugin } from 'pinia';
import CreditCardDetails from "../../../src/views/CreditCardForm/CreditCardDetails.vue";
import flushPromises from 'flush-promises';
import CreditCardNumberField from "../../../src/components/CreditCard/CreditCardNumberField.vue";
describe('Credit Card Number', () => {
    const localVue = createLocalVue()
    localVue.use(PiniaVuePlugin)
    let vuetify;
    let wrapper = null
    beforeEach(() => {
        i18n.locale = 'en'
        vuetify = new Vuetify()
        wrapper = mount(CreditCardNumberField, {
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
    it('show error message empty credit card number', async () => {

        const input = wrapper.findComponent("#employeeName")
        input.find('input').setValue('');
        await flushPromises();
        const error = wrapper.vm.$refs.creditCardNumberProvider.errors[0];
        expect(error).toEqual('The Credit Card Number field is required')
    });
    it('show error message invalid credit card number', async () => {
        const input = wrapper.findComponent("#employeeName")
        input.find('input').setValue('5465155709436157');
        await flushPromises();
        const error = wrapper.vm.$refs.creditCardNumberProvider.errors[0];
        expect(error).toEqual('Invalid Credit Card Number. Only Support Visa')
    });
    it('should be valid visa number', async () => {
        const input = wrapper.findComponent("#employeeName")
        input.find('input').setValue('4716756955535079');
        await flushPromises();
        const error = wrapper.vm.$refs.creditCardNumberProvider.errors[0];
        expect(error).toBeFalsy()
    });
    afterEach(() => {
        wrapper.destroy()
    })
})