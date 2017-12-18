class DbService {
    constructor($http) { 
        'ngInject';
        
        this.dbUrl = 'http://127.0.0.1:3000/';
        this.http = $http;
    }
    
    getFromDatabase(resource) {
        let url = `${this.dbUrl}${resource}`;
        
        return this.http.get(url)
            .then(response => response.data)
            .catch(this.handleError);
    }
    
    putToDatabase(resource, newEntry) {
        let url = `${this.dbUrl}${resource}`;
        
        return this.http.put(url, newEntry)
            .then()
            .catch(this.handleError);
    }
    
    postToDatabase(resource, newEntry) {
        let url = `${this.dbUrl}${resource}`;
        
        return this.http.post(url, newEntry)
            .then()
            .catch(this.handleError);
    }
    
    deleteFromDatabase(resource) {
        let url = `${this.dbUrl}${resource}`;
        
        return this.http.delete(url)
            .then()
            .catch(this.handleError);
    }
    
    getInvoices() {
        return this.getFromDatabase('invoices');
    }
    
    getInvoice(id) {
        return this.getFromDatabase(`invoices/${id}`);
    }
    
    getVatRates() {
        return this.getFromDatabase('vat-rates');
    }
    
    addInvoice(invoice) {
        return this.postToDatabase('invoices', invoice);
    }
    
    updateInvoice(invoice) {
        return this.putToDatabase(`invoices/${invoice.id}`, invoice);
    }
    
    deleteInvoice(id) {
        return this.deleteFromDatabase(`invoices/${id}`);
    }
    
    getMyCompany() {
        return this.getFromDatabase('my-company');
    }
    
    handleError(error) {
        console.error('An error occurred', error);
    }
}

export default DbService;