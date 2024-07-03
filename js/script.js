import { convertStringToNumber } from './convertStringToNumber.js';
import { OverlayScrollbars } from './overlayscrollbars.esm.min.js';


const financeForm = document.querySelector('.finance__form');
const financeAmount = document.querySelector('.finance__amount');
const financeReportBtn = document.querySelector('.finance__report');
const report = document.querySelector('.report');
let amount = 0;

financeAmount.textContent = amount;

financeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const typeOperation = event.submitter.dataset.typeOperation;

    const changeAmount = Math.abs(convertStringToNumber(financeForm.amount.value));

    if (typeOperation === 'income') {
        amount += changeAmount;
    }

    if (typeOperation === 'expenses') {
        amount -= changeAmount;
    }

    financeAmount.textContent = `${amount.toLocaleString()} ₽`;
});

financeReportBtn.addEventListener('click', () => {
    const report = document.querySelector('.report');

    report.classList.add('report__open');
});

report.addEventListener('click', (event) => {
    if (event.target.closest('.report__close')) {
        report.classList.remove('report__open');
    }
});

OverlayScrollbars(report, {});