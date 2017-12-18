import angular from 'angular';
import InvoicesComponent from '../components/invoices.component';

const InvoicesModule = angular.module('invoices', [])
        .component('invoices', InvoicesComponent);

export default InvoicesModule;