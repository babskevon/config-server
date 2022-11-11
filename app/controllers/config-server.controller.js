var request = require("request");
const axios = require('axios');
const AESModel = require('../models/aes_store.js');
const KeyModel = require('../models/private_key.js');

exports.GetClientKeys = async (req, res) => {
    const _aes_data = await AESModel.getAESKEY(req.body);
    const _private_key = await KeyModel.getPrivateKey(req.body)
    if(_private_key != null && _aes_data != null){
        res.send({
            "success":true,
            "data":{
                "aes_key": _aes_data.AES_KEY,
                "private_key": _private_key.PRIVATE_KEY
            }
        });
    }else{
        res.send({
            "success":false,
            "message":"record not found"
        });
    }
};