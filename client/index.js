import 'bootstrap-css-only';
import 'normalize.css';
import 'style.scss';

import angular from 'angular';
import ngRoute from 'angular-route';

import DbService from 'services/db.service';
import RouterConfig from 'config/router.config';

import Invoices from 'modules/invoices.module';
import Invoice from 'modules/invoice.module';

angular.module('app', [
    ngRoute,

    Invoices.name,
    Invoice.name
])
.service('dbService', DbService)
.config(RouterConfig);