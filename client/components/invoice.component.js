import template from '../templates/invoice.component.pug';
import controller from '../controllers/invoice.controller.js';
import '../styles/invoice.component.scss';

let InvoiceComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'invoice'
};
export default InvoiceComponent;