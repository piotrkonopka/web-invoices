import template from '../templates/invoices.component.pug';
import controller from '../controllers/invoices.controller.js';
import '../styles/invoices.component.scss';

let InvoicesComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'invoices'
};
export default InvoicesComponent;