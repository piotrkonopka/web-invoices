class InvoicesController {
    constructor(dbService, $location) {
        'ngInject';
        
        this.dataService = dbService;
        this.location = $location;
    }
    
    $onInit() {
        this.invoices = [];
        this.loaded = false;
        
        this.labels = {
            tableName: 'Faktury',
            tableCols: [
                'Numer faktury',
                'Nazwa klienta',
                'Data wystawienia',
                'Wartość brutto'
            ],
            addButton: 'Dodaj fakturę',
            loadingMsg: 'Prosze czekać. Wczytuję dane...'
        };
        
        this.getInvoices();
    }
    
    getInvoices() {
        this.dataService.getInvoices().then(invoices => {
                this.invoices = invoices;
                this.loaded = true;
            });
    }

    editInvoice(id) {
        this.location.path(`/invoice/${id}`);
    }

    deleteInvoice(id) {
        this.dataService.deleteInvoice(id)
                .then(() => this.getInvoices());
    }
    
    addInvoice() {
        this.location.path('/invoice');
    }
}

export default InvoicesController;