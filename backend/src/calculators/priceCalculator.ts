import { roundTwoDecimals } from "@app/helpers";
import { Installment } from "@app/interfaces";

function calculatePriceInstallmentValue(loanValue: number, months: number, interestRate: number): number {
    const resp = loanValue * (Math.pow((1 + interestRate), months) * interestRate) / (Math.pow((1 + interestRate), months) - 1);
    return roundTwoDecimals(resp);
}

export default function (loanValue: number, months: number, interestRate: number): Array<Installment> {
    const installmentValue = calculatePriceInstallmentValue(loanValue, months, interestRate);
    const installments: Array<Installment> = [];

    let pesentValue = loanValue;
    for (let i = 0; i < months; i++) {
        const interest = roundTwoDecimals(pesentValue * interestRate);
        const amortization = roundTwoDecimals(installmentValue - interest);
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