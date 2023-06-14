
import calculate from "@app/calculators/priceCalculator"
import { Installment } from "@app/interfaces"

describe('Validando calculo de parcelas', () => {
    let installments: Array<Installment> = []

    beforeAll(() => {
        installments = calculate(900, 5, 0.0179)
    })
    test('Deve ter 5 parcelas', () => {
        expect(installments.length).toBe(5)
    })
    test('1ª prestação deve ser 189.78', () => {
        expect(installments[0].valorPrestacao).toBe(189.78)
    })
    test('5ª amortização deve ser  186,44 ', () => {
        expect(installments[4].valorAmortizacao).toBe(186.44)
    })

})