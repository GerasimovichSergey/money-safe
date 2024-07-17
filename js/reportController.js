import { deleteOperation, getData } from './services.js';
import { renderReport } from './renderReport.js';
import { reportDatesFilter } from './reportDatesFilter.js';
import { finance, financeAmount, financeReportBtn, report, reportDates, reportOperationList } from './script.js';
import { createMessage } from './createMessage.js';
import { getTotalAmount } from './getTotalAmount.js';


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
        if (event.target.tagName === 'BUTTON') {
            const operationId = event.target.dataset.operationId;
            event.target.closest('.report__row').remove();
            const textMessage = await deleteOperation('/finance', operationId);
            const message = createMessage(textMessage.message);

            finance.append(message);

            gsap.to(message, {
                y: 115,
                opacity: 1,
                duration: 1,
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
        financeReportBtn.disabled = true;

        const data = await getData('/finance');
        renderReport(data);
        openReport();

        financeReportBtn.textContent = btnText;
        financeReportBtn.disabled = false;
    });

    reportDates.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = await reportDatesFilter(reportDates);
        renderReport(data);
    });
};
