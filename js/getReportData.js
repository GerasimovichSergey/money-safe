const API_URL = 'https://api-money-safe.glitch.me/api';

export const getReportData = async (url) => {
    try {
        const response = await fetch(`${API_URL}${url}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении данных', error);
        throw error;
    }
};