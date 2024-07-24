export const animationNumber = (element, amount) => {
    let currentFrame = 0;
    const fps = 60;
    const duration = 2000;
    const totalFrame = fps * (duration / 1000);

    const initialNumber = parseInt(element.textContent.replace(/[^0-9.-]+/g, ''));
    const increment = (amount - initialNumber) / totalFrame;
    let newNumber = initialNumber;

    const animate = () => {
        currentFrame++;

        newNumber = Math.trunc(newNumber + increment);
        element.textContent = `${newNumber.toLocaleString()} ₽`;

        if (currentFrame < totalFrame) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = `${(amount).toLocaleString()} ₽`;
        }
    };

    requestAnimationFrame(animate);
};