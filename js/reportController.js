import { deleteOperation, getData } from './services.js';
import { renderReport } from './renderReport.js';
import { reportDatesFilter } from './reportDatesFilter.js';
import {
    finance,
    financeAmount,
    financeReportBtn,
    report,
    reportDates,
    reportOperationList
} from './script.js';
import { createMessage } from './createMessage.js';
import { getTotalAmount } from './getTotalAmount.js';
import { clearChart, generateChart } from './generateChart.js';


const generateChartButton = document.querySelector('#generateChartButton');
let actualData = [];

export const reportController = () => {
    const removeMessage = () => {
        const message = document.querySelector('.message');

        gsap.to(message, {
            opacity: 0,
            delay: 1.2,
            duration: 1,
            onComplete: () => message.remove(),
        });
    };

    reportOperationList.addEventListener('click', async (event) => {
        if (event.target.dataset.operationId) {
            const operationId = event.target.dataset.operationId;
            const textMessage = await deleteOperation('/finance', operationId);
            const reportRow = event.target.closest('.report__row');

            reportRow.remove();
            clearChart();

            const message = createMessage(textMessage.message);

            finance.append(message);

            gsap.to(message, {
                y: 115,
                opacity: 1,
                duration: 0.7,
                ease: 'power4.out',
                onComplete: removeMessage,
            });

            const amount = await getTotalAmount();
            financeAmount.textContent = `${amount.toLocaleString()} ₽`;
        }
    });

    const openReport = () => {
        report.style.visibility = 'visible';

        gsap.to(report, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power3.out',
        });

        finance.addEventListener('click', closeReport);
    };

    const closeReport = (event) => {
        if (event.target === finance || event.target.closest('.report__close')) {
            gsap.to(report, {
                opacity: 0,
                scale: 0,
                duration: 0.3,
                ease: 'power3.in',
                onComplete() {
                    report.style.visibility = 'hidden';
                }
            });

            finance.removeEventListener('click', closeReport);
        }
    };

    financeReportBtn.addEventListener('click', async () => {
        const btnText = financeReportBtn.textContent;

        financeReportBtn.textContent = 'Загрузка';
        financeReportBtn.style.cursor = 'no-drop';
        financeReportBtn.disabled = true;

        actualData = await getData('/finance');
        renderReport(actualData);
        openReport();

        financeReportBtn.textContent = btnText;
        financeReportBtn.style.cursor = '';
        financeReportBtn.disabled = false;
    });

    reportDates.addEventListener('submit', async (event) => {
        event.preventDefault();

        actualData = await reportDatesFilter(reportDates);
        renderReport(actualData);

        clearChart();
    });
};

generateChartButton.addEventListener('click', () => {
    generateChart(actualData);
});