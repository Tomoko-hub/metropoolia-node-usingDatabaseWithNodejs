const express = require('express');
//import db query
const query = require('./db/customers');

const app= express();
app.use(express.json());

const port = 3000;

//  endpoint http://localhost:3000/api/customers
app.get('/api/customers', query.getAllCustomers);
app.get('/api/customers/:id', query.getCustomerInfoById);
app.post('/api/customers', query.addCustomer);
app.put('/api/customers/:id', query.updateCustomerInfo);
app.delete('/api/customers/:id', query.deleteCustomerInfoById);

app.listen(port, ()=>{
    console.log(`Server is running on localhost:${port}.`);
})