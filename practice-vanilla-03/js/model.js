export const products = {
  data: [
    { name: 'Nikon D850', img: './img/d850.png' },
    { name: 'AF-S NIKKOR 58mm f1.4G', img: './img/58n.png' },
    { name: 'AF-S NIKKOR 28mm f1.4G', img: './img/28n.png' }
  ],
  getProducts() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.data);
      }, 300);
    });
  }
};

export const recommendTerms = {
  data: ['D850', '58N', '28N'],
  getRecommendTerms() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.data);
      }, 100);
    });
  }
};

export const recentTerms = {
  data: [
    {
      name: 'D5',
      date: '03.30'
    },
    {
      name: '24N',
      date: '03.30'
    },
    {
      name: '35N',
      date: '03.31'
    },
    {
      name: '85N',
      date: '03.31'
    }
  ],
  getRecentTerms() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.data);
      }, 100);
    });
  },
  addRecentTerm(term) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.data = this.data.filter(item => item.name !== term);
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        const newTerm = {
          name: term,
          date: `${month < 10 ? '0' + month : month}.${day}`
        };
        this.data.push(newTerm);
        resolve(newTerm);
      }, 100);
    });
  },
  removeRecentTerm(index) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.data.splice(index, 1);
        resolve(true);
      }, 100);
    });
  }
};
