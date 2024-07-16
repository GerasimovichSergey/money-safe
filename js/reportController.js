import { getData } from './services.js';
import { renderReport } from './renderReport.js';
import { reportDatesFilter } from './reportDatesFilter.js';
import { finance, financeReportBtn, report, reportDates } from './script.js';


export const reportController = () => {
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