const {Model} = require('objection');
//Knex
const Knex = require('knex');

//EFRIS_KEYGEN db
const configDb = require('./config-serverdb');
/**
 * Set the database connection
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = function dbConnect(req, res, next) {
    // Initialize connections.
    const efris_keygen = Knex(configDb);
    //Bind models to connections
    Model.knex(efris_keygen);
    next();
};