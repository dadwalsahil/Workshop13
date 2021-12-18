var mongoose = require("mongoose");
var dbconnect = require("../app")



var schema = mongoose.Schema({
    employeeID :Number,
    Password:String,
    employeeName : String,
    employeeRole : String
});


var employeeSchema = mongoose.model('empdatas',schema);
module.exports = employeeSchema;


