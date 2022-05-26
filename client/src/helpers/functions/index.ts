export const genId = () => {
    return Math.ceil(new Date().getTime() / Math.random() / 1000000000);
}