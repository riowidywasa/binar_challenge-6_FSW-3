/**
 * @file contains entry point of controllers api v1 module
 */

const car = require("./car");
const auth = require('./authController')

module.exports = {
  car,
  auth
};
