const ConfigController = require('../controllers/config-server.controller');

module.exports = (app, client) => {
    app.post(`/config/client-keys`, ConfigController.GetClientKeys);
};