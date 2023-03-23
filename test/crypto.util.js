var assert = require('assert');
var crypto = require("../utils/cypto");

describe('Crypto', function () {
    describe('Encryption', function () {
        it('original key should not match with encrypted', function () {
            var originalValue = "this is ace"
            var encryptedvalue = crypto.encrypt(originalValue);
            assert.notEqual(encryptedvalue, originalValue);
        });
        it('encrypt should encrypt the key', function () {
            var originalValue = "this is ace"
            var encryptedvalue = crypto.encrypt(originalValue);
            var decryptedvalue = crypto.decrypt(encryptedvalue);
            assert.equal(decryptedvalue, originalValue);
        });
        it('encrypting twice should always generate same result from same key', function () {
            var originalValue = "this is ace"
            var encryptedvalue1 = crypto.encrypt(originalValue);
            var encryptedvalue2 = crypto.encrypt(originalValue);
            assert.equal(encryptedvalue1, encryptedvalue2);
        });
    });
});
