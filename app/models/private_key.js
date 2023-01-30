'use strict';
const { Model } = require('objection');
const date_helper = require('datetime-helper');
const crypto = require('crypto');

class PRIVATE_KEY extends Model {
    static get tableName() {
        return 'EFRIS_KEYGEN.PRIVATE_KEY';
    }


    static getPrivateKey=async(data)=>{
        // return await AES_KEY.query().where("TIN",data.tin).where("DEVICE_NUMBER",data.device_no);
        return await PRIVATE_KEY.query().findOne({
            TIN: data.tin,
            DEVICE_NUMBER: data.device_no
        });
    }
    
    static getAllKeys=async()=>{
        return await PRIVATE_KEY.query();
    }
}


module.exports = PRIVATE_KEY;