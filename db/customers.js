const db = require('./dbconfig');

// get all
const getAllCustomers=(req, res)=>{
    db.query('SELECT * FROM customers', (err, result) => {
        if (err) 
            console.error(err);
        else
            res.json(result.rows);
    });
}

// get customer's info by id
const getCustomerInfoById=(req, res)=>{
    const query = {
        text: 'SELECT * FROM customers WHERE id = $1',
        values: [req.params.id],
    }

    db.query(query, (err,result)=>{
        if(err){
            console.error('Error executing qury',err);
        }
        else {
            if(result.rows.length > 0)
                res.json(result.rows);
            else
                res.status(404).end('No such a customers id.');
        }
    })
}

// create new customer
const addCustomer = (req, res)=>{
    const newCustomer = req.body;
    const query = {
        text: 'INSERT INTO customers (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4)',
        values: [newCustomer.firstname, newCustomer.lastname, newCustomer.email, newCustomer.phone],
    }

    db.query(query, (err, res)=>{
        if(err){
            return console.error('Error executing query',err.stack)
        }
    })
    res.json(newCustomer);
}

// update customer's info by id
const updateCustomerInfo = (req, res)=>{
    const editedCustomer = req.body;
    const query = {
        text: 'UPDATE customers SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id=$5',
        values: [editedCustomer.firstname, editedCustomer.lastname, editedCustomer.email, editedCustomer.phone, req.params.id],
    }
    db.query(query, (err, res)=>{
        if(err){
            return console.error('Error executing query',err.stack)
        }
    })

    res.json(editedCustomer);
}

// delete customer's info by id
const deleteCustomerInfoById = (req, res)=>{
    const query = {
        text: 'DELETE FROM customers WHERE id = $1',
        values: [req.params.id],
    }
    db.query(query, (err, res)=>{
        if(err){
            return console.error('Error executing query',err.stack)
        }
    })
    res.status(204).end('Customer data is deleted');
}

// export module
module.exports = {
    getAllCustomers: getAllCustomers,
    getCustomerInfoById: getCustomerInfoById,
    addCustomer: addCustomer,
    updateCustomerInfo: updateCustomerInfo,
    deleteCustomerInfoById: deleteCustomerInfoById,
};
