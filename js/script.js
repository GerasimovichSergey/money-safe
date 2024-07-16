import { OverlayScrollbars } from './libs/overlayscrollbars.esm.min.js';
import { reportController } from './reportController.js';
import { financeController } from './financeController.js';


export const finance = document.querySelector('.finance');
export const financeForm = document.querySelector('.finance__form');
export const financeAmount = document.querySelector('.finance__amount');
export const financeReportBtn = document.querySelector('.finance__report');
export const report = document.querySelector('.report');
export const reportOperationList = document.querySelector('.report__operation-list');
export const reportDates = document.querySelector('.report__dates');

OverlayScrollbars(report, {});

const init = () => {
    reportController();
    financeController();
};

init();