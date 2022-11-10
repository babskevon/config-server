'use strict';
const { Model } = require('objection');
const date_helper = require('datetime-helper');
// const crypto = require('crypto');

class AES_KEY extends Model {
    static get tableName() {
        return 'EFRIS_KEYGEN.AES_STORE';
    }

    static getAESKEY=async(data)=>{
        // return await AES_KEY.query().where("TIN",data.tin).where("DEVICE_NUMBER",data.device_no);
        return await AES_KEY.query().findOne({
            TIN: data.tin,
            DEVICE_NUMBER: data.device_no
        });
    }
}

module.exports = AES_KEY;