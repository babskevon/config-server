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
            "message":"success",
            "data":{
                "aes_key": _aes_data.AES_KEY,
                "private_key": _private_key.PRIVATE_KEY
            }
        });
    }
    else{
        res.send({
            "success":false,
            "message":"record not found"
        });
    }
};


exports.GetAllKeys = async (req, res) => {
    const all_keys = await KeyModel.getAllKeys();
    if(all_keys.length > 0){
        const data = {
            "success":true,
            "message":"keys found",
            "data": all_keys
        };
        res.send(data);
    }else{
        const data = {
            "success":false,
            "message":"No keys found",
            "data": null
        };
        res.send(data);
    }
    
};

exports.UpdateKeys = async (req, res ) => {
    const data = req.body;
    //data.tin
    //data.device_no
    //data.company_id
    //data.private_key
    //data.alias
    //data.password
    //data.cutoff
    // first step => init
    console.log(data);
    request.get(`https://config.kakasa.app/config/init/${data.tin}`)
    .on('response', function(response){
        console.log(response.statusCode); // 200
        if(response.statusCode != 200){
            res.send({"status": response.statusCode, "message": "Failed to initialize database"});
        }
        // console.log(JSON.stringify(response));
    });
    // aes_key generator 
    const data2 = {
        "data": {
          "privateKey": data.private_key,
          "deviceNumber": data.device_no,
          "tin": data.tin,
          "passwordPhase": data.password,
          "alias": data.alias,
        }
    };
    console.log(data2);
    let response = await axios.post('http://174.138.42.174:8003/aes-generator/api/v1/private-keys/register', data2);
    response = response.data;
    if(response.response_message != 'Private Key Created Successfully'){
        res.send({"success":false,"message":"Failed to create private key"});
    }
    else{
        res.send({"status":1});
    }
    // request.post()
    // res.send(response);
};