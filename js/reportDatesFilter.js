import { getReportData } from './getReportData.js';


export const reportDatesFilter = async (form) => {
    const formData = new FormData(form);
    const dateStartEnd = Object.fromEntries(formData);

    const searchParams = new URLSearchParams();

    if (dateStartEnd.startDate) {
        searchParams.append('startDate', dateStartEnd.startDate);
    }

    if (dateStartEnd.endDate) {
        searchParams.append('endDate', dateStartEnd.endDate);
    }

    const queryString = searchParams.toString();
    const url = queryString ? `/test?${queryString}` : '/test';

    const data = await getReportData(url)

    return data;
};