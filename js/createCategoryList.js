import { getData } from './services.js';
import { categoryList } from './script.js';


export const createCategoryList = async () => {

    categoryList.textContent = '';

    const getCategoryList = await getData('/categories');
    const allCategories = [...getCategoryList.expenses, ...getCategoryList.income];

    const createCategories = allCategories.map((category) => {
        const option = document.createElement('option');
        option.value = category;

        return option;
    });

    return createCategories;
}