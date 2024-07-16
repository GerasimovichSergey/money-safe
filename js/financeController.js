import { financeAmount, financeForm } from './script.js';
import { getData, postData } from './services.js';
import { convertStringToNumber } from './convertStringToNumber.js';


let amount = 0;

export const financeController = async () => {
    const operationsData = await getData('/finance');

    amount = operationsData.reduce((acc, item) => {
        if (item.type === 'income') {
            return acc + convertStringToNumber(item.amount);
        } else {
            return acc - convertStringToNumber(item.amount);
        }
    }, 0);

    financeAmount.textContent = `${amount.toLocaleString()} ₽`;

    financeForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const typeOperation = event.submitter.dataset.typeOperation;

        const financeFormData = Object.fromEntries(new FormData(financeForm));
        financeFormData.type = typeOperation;

        const addOperation = await postData('/finance', financeFormData);

        const changeAmount = Math.abs(convertStringToNumber(addOperation.amount));

        if (typeOperation === 'income') {
            amount += changeAmount;
        }

        if (typeOperation === 'expenses') {
            amount -= changeAmount;
        }

        financeAmount.textContent = `${amount.toLocaleString()} ₽`;
        financeForm.reset();
    });
};