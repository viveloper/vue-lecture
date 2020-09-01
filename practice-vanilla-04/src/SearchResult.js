import Component from './Component.js';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.el = document.getElementById('search-result');
    this.state = {
      products: [],
    };
    this.render();
    this.componentDidMount();
  }
  setProducts(products) {
    this.setState({ products });
  }
  render() {
    this.el.innerHTML = this.state.products
      .map(
        (product) => `
          <li class="result-item">
            <img src="${product.img}" alt="item" class="item-image" />
            <p class="item-name">${product.name}</p>
          </li>
        `
      )
      .join('');
  }
}

export default SearchResult;
