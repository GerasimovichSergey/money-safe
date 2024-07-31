import { financeAmount, financeForm } from './script.js';
import { postData } from './services.js';
import { convertStringToNumber } from './convertStringToNumber.js';
import { getTotalAmount } from './getTotalAmount.js';
import { animationNumber } from './animationNumber.js';


export const financeController = async () => {
    let amount = 0;

    amount = await getTotalAmount();

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

        animationNumber(financeAmount, amount);
        financeForm.reset();
    });
};