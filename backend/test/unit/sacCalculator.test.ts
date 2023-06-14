
import calculate from "@app/calculators/sacCalculator"
import { Installment } from "@app/interfaces"

describe('Validando calculo de parcelas', () => {
    let installments: Array<Installment> = []

    beforeAll(() => {
        installments = calculate(900, 5, 0.0179)
    })
    test('Deve ter 5 parcelas', () => {
        expect(installments.length).toBe(5)
    })
    test('1ª prestação deve ser 196.11', () => {
        expect(installments[0].valorPrestacao).toBe(196.11)
    })
    test('5ª amortização deve ser  180.00 ', () => {
        expect(installments[4].valorAmortizacao).toBe(180.00)
    })

})