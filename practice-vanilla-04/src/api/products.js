let products = [
  { name: 'Nikon D850', img: './img/d850.png' },
  { name: 'AF-S NIKKOR 58mm f1.4G', img: './img/58n.png' },
  { name: 'AF-S NIKKOR 28mm f1.4G', img: './img/28n.png' },
  { name: 'Nikon Z7', img: './img/z7.png' },
  { name: 'Nikon Z6', img: './img/z6.png' },
  { name: 'AF-S NIKKOR 85mm f1.4G', img: './img/85n.png' },
  { name: 'Canon EOS-R5', img: './img/eos-r5.png' },
  { name: 'Canon EOS-R6', img: './img/eos-r6.png' },
  { name: 'Nikon D780', img: './img/d780.png' },
];

export const getProducts = () => {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 300) + 20;
    setTimeout(() => {
      const randomLen = Math.floor(Math.random() * products.length);
      const copiedData = [...products];
      for (let i = 0; i < randomLen; i++) {
        const randomIdx = Math.floor(Math.random() * copiedData.length);
        copiedData.splice(randomIdx, 1);
      }
      resolve(copiedData);
    }, delay);
  });
};
