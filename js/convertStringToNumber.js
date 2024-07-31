export const convertStringToNumber = (str) => {
    const noSpaceStr = String(str).replace(/\s+/g, '');
    const num = parseInt(noSpaceStr);

    if (!isNaN(num) && isFinite(num)) {
        return num;
    } else {
        return false;
    }
};