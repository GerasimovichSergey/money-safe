import { getData } from './services.js';
import { convertStringToNumber } from './convertStringToNumber.js';


export const getTotalAmount = async () => {
    const operationsData = await getData('/finance');

    const amount = operationsData.reduce((acc, item) => {
        if (item.type === 'income') {
            return acc + convertStringToNumber(item.amount);
        } else {
            return acc - convertStringToNumber(item.amount);
        }
    }, 0);

    return amount;
};