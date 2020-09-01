const keywords = [
  'D850',
  '58N',
  '28N',
  'D780',
  '35N',
  '24N',
  'Z6',
  'Z7',
  'EOS-R5',
  'EOS-R6',
];

let recentKeywords = [
  {
    name: 'D5',
    date: '03.31',
  },
  {
    name: '24N',
    date: '03.30',
  },
  {
    name: '35N',
    date: '03.29',
  },
  {
    name: '85N',
    date: '03.29',
  },
];

export const getKeywords = (keyword) => {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 300) + 20;
    setTimeout(() => {
      const randomLen = Math.floor(Math.random() * keywords.length);
      const copiedData = [...keywords];
      for (let i = 0; i < randomLen; i++) {
        const randomIdx = Math.floor(Math.random() * copiedData.length);
        copiedData.splice(randomIdx, 1);
      }
      resolve(copiedData);
    }, delay);
  });
};

export const getRecentKeywords = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(recentKeywords);
    }, 50);
  });
};

export const addRecentKeyword = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      recentKeywords = recentKeywords.filter((item) => item.name !== keyword);
      const month = new Date().getMonth() + 1;
      const day = new Date().getDate();
      const newTerm = {
        name: keyword,
        date: `${numberPad(month, 2)}.${numberPad(day, 2)}`,
      };
      recentKeywords.push(newTerm);
      resolve(newTerm);
    }, 50);
  });
};

export const removeRecentKeyword = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      recentKeywords = recentKeywords.filter((item) => item.name !== keyword);
      resolve(true);
    }, 50);
  });
};

function numberPad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
