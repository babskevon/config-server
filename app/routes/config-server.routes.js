const ConfigController = require('../controllers/config-server.controller');

module.exports = (app, client) => {
    app.post(`/config/client-keys`, ConfigController.GetClientKeys);
    app.get(`/config/all-keys`, ConfigController.GetAllKeys);
    app.post(`/config/update-keys`, ConfigController.UpdateKeys);
};