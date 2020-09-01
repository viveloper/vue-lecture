import Component from './Component.js';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.el = document.getElementById('search-result');
    this.state = {
      products: {
        loading: false,
        data: null,
        error: null,
      },
    };
    this.render();
    this.componentDidMount();
  }
  setProducts(products) {
    this.setState({ products });
  }
  render() {
    const { loading, data, error } = this.state.products;
    if (loading) {
      this.el.innerHTML = [1, 2, 3]
        .map(
          () => `
            <li class="skeleton-item">
              <div class="skeleton-image"></div>
              <div class="skeleton-name"></div>
            </li>
          `
        )
        .join('');
      return;
    }
    if (error) {
      this.el.innerHTML = `<li>error!</li>`;
      return;
    }
    if (!data) {
      this.el.innerHTML = '';
      return;
    }
    this.el.innerHTML = data
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
