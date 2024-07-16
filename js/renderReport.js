import { reportOperationList } from './script.js';
import { reformatDate } from './reformatDate.js';
import { convertStringToNumber } from './convertStringToNumber.js';


const typesOperation = {
    income: 'Доход',
    expenses: 'Расход',
};

export const renderReport = (data) => {
    const reportRows = data.map((operation) => {
        const reportRow = document.createElement('tr');
        reportRow.classList.add('report__row');

        reportRow.innerHTML = `
            <td class="report__cell">${operation.category}</td>
            <td class="report__cell report__cell_align">${convertStringToNumber(operation.amount).toLocaleString()} ₽</td>
            <td class="report__cell">${operation.description}</td>
            <td class="report__cell">${reformatDate(operation.date)}</td>
            <td class="report__cell">${typesOperation[operation.type]}</td>
            <td class="report__action-cell">
                <button
                    class="report__button report__button_table">&#10006;
                </button>
            </td>
        `

        return reportRow;
    });

    reportOperationList.textContent = '';
    reportOperationList.append(...reportRows);
};