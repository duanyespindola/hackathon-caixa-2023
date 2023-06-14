import { roundTwoDecimals } from "@app/helpers";
import { Installment } from "@app/interfaces";


export default function (loanValue: number, months: number, interestRate: number): Array<Installment> {
    const amortization = roundTwoDecimals(loanValue / months);
    const installments: Array<Installment> = [];

    let pesentValue = loanValue;
    for (let i = 0; i < months; i++) {
        const interest = roundTwoDecimals(pesentValue * interestRate);
        const installmentValue = roundTwoDecimals(amortization + interest);
        installments.push({
            numero: i + 1,
            valorAmortizacao: amortization,
            valorJuros: interest,
            valorPrestacao: installmentValue
        })
        pesentValue -= amortization;
    }
    return installments;
}