import Component from './Component.js';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.el = document.getElementById('search-form');
    this.inputEl = this.el.querySelector('#search-input');
    this.deleteBtnEl = this.el.querySelector('#btn-delete');
    this.state = {
      value: '',
    };
    this.bindEvents();
    this.render();
    this.componentDidMount();
  }
  bindEvents() {
    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.el.addEventListener('submit', this.handleSubmit);
    this.inputEl.addEventListener('keyup', this.handleKeyup);
    this.deleteBtnEl.addEventListener('click', this.handleDeleteClick);
  }
  handleKeyup(e) {
    if (e.target.value === this.state.value) return;
    this.setState({
      value: e.target.value,
    });
    this.props.onKeywordChange(e.target.value);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  }
  handleDeleteClick(e) {
    this.setState({
      value: '',
    });
    this.props.onDeleteClick();
  }
  setInputValue(value) {
    this.setState({ value });
  }
  render() {
    this.inputEl.value = this.state.value;
    if (this.state.value.length > 0) {
      this.deleteBtnEl.classList.remove('btn-hide');
    } else {
      this.deleteBtnEl.classList.add('btn-hide');
    }
  }
}

export default SearchForm;
