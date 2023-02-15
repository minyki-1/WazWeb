export const getCompUID = (length: number) => {
  const chars = '_ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  let id = '';
  while (id === '' || document.querySelector(`.${id}`)) {
    for (let i = 0; i < length; i++) {
      const randomNum = Math.floor(Math.random() * chars.length);
      id += chars.substring(randomNum, randomNum + 1);
    }
  }
  return id;
}