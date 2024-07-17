export const createMessage = (messageText) => {
    const message = document.createElement('div');
    message.classList.add('message');
    message.textContent = messageText;

    return message;
}