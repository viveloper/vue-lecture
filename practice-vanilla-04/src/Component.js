class Component {
  constructor(props) {
    this.el = {};
    this.props = props;
    this.state = {};
  }
  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
    this.render();
  }
  componentDidMount() {}
  render() {}
}

export default Component;
