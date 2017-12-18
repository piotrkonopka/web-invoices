import angular from 'angular';
import InvoiceComponent from '../components/invoice.component';

const InvoiceModule = angular.module('invoice', [])
        .component('invoice', InvoiceComponent);

export default InvoiceModule;