import { createLocalVue, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import Vuetify from 'vuetify'
import i18n from '../../src/plugins/i18n'
import { PiniaVuePlugin } from 'pinia';
import CreateCreditCardForm from "../../src/views/CreditCardForm/CreateCreditCardForm.vue";
import flushPromises from "flush-promises";
import { useCreditCard } from "../../../frontend/src/store/credit-card";
describe('CreateForm.vue', () => {
    const localVue = createLocalVue()
    localVue.use(PiniaVuePlugin)
    let vuetify;
    let wrapper = null
    beforeEach(() => {
        i18n.locale='en'
        vuetify = new Vuetify()
        wrapper = mount(CreateCreditCardForm, {
            mounted: jest.fn,
            pinia: createTestingPinia({
                stubActions: false,
                initialState: {
                    CreditCard: {
                        creditCardNumber: "",
                        expirationMonth: null,
                        expirationYear: null,
                        cvv: null,
                        firstName: "",
                        lastName: "",
                        address: "",
                        locality: null,
                        administrativeArea: null,
                        postalCode: null,
                        country: null,
                        email: "",
                        phoneNumber: ""
                    }
                }
            }),
            mocks: {
                $router: {
                    push: jest.fn()
                }
            },
            localVue,
            vuetify,
            i18n
        });
    })
    it('renders properly', () => {
        expect(wrapper.text()).toContain('Credit Card Details');
        expect(wrapper.text()).toContain('Billing Address');
    });
    it('renders Card Number input', () => {
        expect(wrapper.find('#employeeName').exists()).toBeTruthy()
    })

    it('should showing error invalid visa number card', () => {
        expect(wrapper.find('#employeeName').exists()).toBeTruthy()
    })
    it('renders CVV input', () => {
        expect(wrapper.find('#cvv').exists()).toBeTruthy()
    })
    it('renders First Name input', () => {
        expect(wrapper.find('#firstName').exists()).toBeTruthy()
    })
    it('renders Last Name input', () => {
        expect(wrapper.find('#lastName').exists()).toBeTruthy()
    })
    it('renders Address input', () => {
        expect(wrapper.find('#address').exists()).toBeTruthy()
    })
    it('renders Locality input', () => {
        expect(wrapper.find('#locality').exists()).toBeTruthy()
    })
    it('renders Administrative Area input', () => {
        expect(wrapper.find('#administrativeArea').exists()).toBeTruthy()
    })
    it('should trigger submit button and dispatch action post', async () => {
        const store = useCreditCard()
        jest.spyOn(store, 'createPaymentInstrumentService')
        store.$patch({
            creditCardNumber: "4024007142250926",
            expirationMonth: "06",
            expirationYear: "2023",
            cvv: "112",
            firstName: "Muarif",
            lastName: "Gustiar",
            address: "Bogor",
            locality: "Bogor",
            administrativeArea: "Jakarta",
            postalCode: "16916",
            country: "Indonesia",
            email: "muarif@slash.co",
            phoneNumber: "6282114657252"
        })

        wrapper.vm.$refs.observer.validate = jest.fn().mockResolvedValue(() => {
            console.log('success mock')
            return Promise.resolve(true)
        })
        wrapper.find("#submitBtn").trigger('click')
        await flushPromises()
        expect(store.createPaymentInstrumentService).toHaveBeenCalledTimes(1)

    })
    afterEach(() => {
        wrapper.destroy()
    })
});
