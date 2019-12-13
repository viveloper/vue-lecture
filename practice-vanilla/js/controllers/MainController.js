import FormView from '../views/FormView.js';

const MainController = {
  init() {
    const formView = new FormView(document.querySelector('form'));
  }
}

export default MainController;