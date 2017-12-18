const RouterConfig = ($routeProvider) => {
    'ngInject';

    $routeProvider
        .when('/invoices', {
            template: '<invoices>Loading...</invoices>'
        })
        .when('/invoice/:id?', {
            template: '<invoice>Loading...</invoice>'
        })
        .otherwise({
            redirectTo: '/invoices'
        });
};

export default RouterConfig;
