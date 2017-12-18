import _ from 'lodash';

class InvoiceController {
    constructor(dbService, $routeParams, $location, $element) {
        'ngInject';

        this.dataService = dbService;
        this.location = $location;
        this.element = $element;
        this.invoiceId = $routeParams.id;
    }
    
    $onInit() {
        this.invoice = {};
        this.myCompany = {};
        this.vatRates = {};
        this.issueDateObj = '';
        
        this.loader = { 
            data: {
                invoice:    {status: false}, 
                myCompany:  {status: false}, 
                vatRates:   {status: false}
            }
        };
        
        this.newItem = {
            name: '',
            quantity: 0,
            netPrice: 0,
            netValue: 0,
            vatRateId: 0,
            vatValue: 0,
            grossValue: 0
        };
        this.editedItemIndex = 0;
        this.itemEdit = false;
        this.newItemEdit = false;

        this.labels = {
            formName: 'Szczegóły faktury',
            invoiceNumber: 'Numer faktury',
            myCompany: 'Nazwa firmy wystawiającej',
            clientName: 'Nazwa klienta',
            issueDate: 'Data wystawienia faktury',
            grossValue: 'Wartość brutto dokumentu',
            tableName: 'Pozycje faktury',
            tableCols: [
                'Nazwa',
                'Ilość',
                'Cena netto',
                'Wartość netto',
                'Stawka VAT',
                'Wartość VAT',
                'Wartość brutto'
            ],
            saveButton: 'Zapisz fakturę',
            goBackButton: 'Porzuc zmiany i wróć do listy faktur',
            addNewItemButton: 'Utwórz nową pozycję',
            saveNewItemButton: 'Dodaj nową pozycję do faktury',
            saveEditedItemButton: 'Zapisz zmiany',
            cancelItemEditingButton: 'Anuluj',
            newItemLabel: 'Nowa pozycja',
            existedItemLabel: 'Edycja wybranej pozycji',
            newItem: {
                name: 'Nazwa',
                quantity: 'Ilość',
                netPrice: 'Cena netto',
                netValue: 'Wartość netto',
                vatRateId: 'Stawka VAT',
                vatValue: 'Wartość VAT',
                grossValue: 'Wartość brutto'
            },
            noItemsMsg: 'Brak pozycji do wyświetlenia',
            loadingMsg: 'Prosze czekać. Wczytuję dane...'
        };
        
        this.loadData();
    }
    
    loadData() {
        if (typeof(this.invoiceId) !== 'undefined') {
            this.getInvoice(this.invoiceId);
        } else {
            this.createNewInvoice();
        }
        
        this.getMyCompany();
        this.getVatRates();
    }
    
    isDataLoaded() {
        return _.every(this.loader.data, 'status', true);
    }
    
    setLoadedStatus(resourceName) {
        _.set(this.loader.data, `${resourceName}.status`, true);
    }
    
    createNewInvoice() {
        this.invoice = {
            client: {
                name: this.myCompany.name
            },
            number: '',
            issueDate: '',
            grossValue: 0,
            items: []
        };
        this.setLoadedStatus('invoice');
    }

    getInvoice(id) {
        this.dataService.getInvoices().then(invoices => {
            this.invoice = _.find(invoices, invoice => invoice.id === parseInt(id));
            this.issueDateObj = new Date(this.invoice.issueDate);
            this.setLoadedStatus('invoice');
        });
    }

    getMyCompany() {
        this.dataService.getMyCompany().then(company => {
            this.myCompany = company;
            this.setLoadedStatus('myCompany');
        });
    }
    
    getVatRates() {
        this.dataService.getVatRates().then(vatRates => {
            this.vatRates = vatRates;
            this.setLoadedStatus('vatRates');
        });
    }
    
    goBack() {
        this.location.path('/');
    }

    editItem(index) {
        this.itemEdit = true;
        this.newItemEdit = false;
        this.editedItemIndex = index;
        
        // We don't want unnecessary binding
        this.newItem = angular.copy(this.invoice.items[index]);
        
        // Make sure that select shows  correct value
        setTimeout(() => this.element.find('select').val(this.newItem.vatRateId), 500);
    }

    deleteItem(name) {
        _.remove(this.invoice.items, item => item.name === name);
        
        this.saveItemChanges();
    }

    saveInvoice() {
        if(typeof(this.invoice.id) === 'undefined') {
            this.dataService.addInvoice(this.invoice).then(() => 
                this.location.path('/')
            );
        } else {
            this.dataService.updateInvoice(this.invoice).then(() => 
                this.location.path('/')
            );
        }
    }
    
    issueDateChange() {
        let date = this.issueDateObj;
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        
        if(month < 10) { 
            month = `0${month}`; 
        }
        
        if(day < 10) { 
            day = `0${day}`; 
        }
        
        this.invoice.issueDate = `${year}-${month}-${day}`;
    }
    
    newItemChange() {
        let vatRateId = this.newItem.vatRateId,
            vatRate = _.find(this.vatRates, {id: vatRateId}) || { rate: 0 },
            quantity = this.newItem.quantity,
            netPrice = this.newItem.netPrice,
            netValue = quantity * netPrice,
            vatValue = netValue * vatRate.rate;
        
        this.newItem.netValue = _.round(netValue, 2);
        this.newItem.vatValue = _.round(vatValue, 2);
        this.newItem.grossValue = _.round(netValue + vatValue, 2);
    }
    
    addNewItem() {
        this.itemEdit = true;
        this.newItemEdit = true;
    }
    
    recalculateGross() {
        let grossValue = _.sumBy(this.invoice.items, 'grossValue');
        this.invoice.grossValue = _.round(grossValue, 2);
    }
    
    saveItemChanges() {
        this.recalculateGross();
        this.finishItemEditing();
    }
    
    saveEditedItem() {
        let item = angular.copy(this.newItem);
        let index = this.editedItemIndex;
        
        this.invoice.items[index] = item;
        this.saveItemChanges();
    }
    
    saveNewItem() {
        let item = angular.copy(this.newItem);
        
        this.invoice.items.push(item);
        this.saveItemChanges();
    }
    
    cancelItemEditing() {
        this.finishItemEditing();
    }
    
    finishItemEditing() {
        this.itemEdit = false;
        
        this.newItem = {
            name: '',
            quantity: 0,
            netPrice: 0,
            netValue: 0,
            vatRateId: 0,
            vatValue: 0,
            grossValue: 0
        };
    }
}

export default InvoiceController;