import { convertStringToNumber } from './convertStringToNumber.js';
import { OverlayScrollbars } from './overlayscrollbars.esm.min.js';
import { getReportData } from './getReportData.js';
import { renderReport } from './renderReport.js';
import { reportDatesFilter } from './reportDatesFilter.js';


const finance = document.querySelector('.finance');
const financeForm = document.querySelector('.finance__form');
const financeAmount = document.querySelector('.finance__amount');
const financeReportBtn = document.querySelector('.finance__report');
const report = document.querySelector('.report');
export const reportOperationList = document.querySelector('.report__operation-list');
const reportDates = document.querySelector('.report__dates');
let amount = 0;

OverlayScrollbars(report, {});

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

const openReport = () => {
    report.classList.add('report_open');

    setTimeout(() => {
        report.classList.add('report_opacity');
    }, 0);

    finance.addEventListener('click', closeReport);
};

const closeReport = (event) => {
    if (event.target === finance || event.target.closest('.report__close')) {
        report.classList.remove('report_opacity');

        setTimeout(() => {
            report.classList.remove('report_open');
        }, 210);

        finance.removeEventListener('click', closeReport);
    }
};

financeReportBtn.addEventListener('click', async () => {
    reportOperationList.textContent = 'Загрузка...';
    openReport();
    const data = await getReportData('/test');
    renderReport(data);
});

reportDates.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = await reportDatesFilter(reportDates);
    renderReport(data);
});