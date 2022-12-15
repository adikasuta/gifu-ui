import { setActivePinia, createPinia} from 'pinia'
import {useCreditCard} from "../../../frontend/src/store/credit-card";
import CdeBackendService from "../../../frontend/src/services/CdeBackendService";
import moment from "moment";
import flushPromises from "flush-promises";

describe('Credit Card Store', ()=>{
    beforeEach(()=>{
        setActivePinia(createPinia())
    })
    it('should pass correct payload',async ()=>{
        CdeBackendService.postAccMgmtPaymentInstrument = jest.fn()
        CdeBackendService.postAccMgmtPaymentInstrument.mockResolvedValue({
            accountPaymentInstrumentToken: "sometoken"
        });
        CdeBackendService.postCdePaymentInstrument = jest.fn()

        const creditCard = useCreditCard()
        creditCard.$patch({
            creditCardNumber: "4024007142250926",
            expirationDate: moment().set({'years': 2023, 'month': 5}),
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
        expect(creditCard.postPayloadCreditCard).toEqual({
            panNumber: "4024007142250926",
            expirationMonth: "06",
            expirationYear: "2023",
            securityCode: "112",
            firstName: "Muarif",
            lastName: "Gustiar",
            address: "Bogor",
            locality: "Bogor",
            administrativeArea: "Jakarta",
            postalCode: "16916",
            country: "Indonesia",
            email: "muarif@slash.co",
            phoneNo: "6282114657252"
        })
        creditCard.createPaymentInstrumentService()
        await flushPromises()
        
        expect(CdeBackendService.postAccMgmtPaymentInstrument).toHaveBeenCalled()
        expect(CdeBackendService.postCdePaymentInstrument).toHaveBeenCalled()
    })
})