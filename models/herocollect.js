var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var herocollectSchema = new Schema({

    alias: String,
    first_name: String,
    last_name: String,
    city: String,
    power_name: String
});//end of herocollectSchema


// first param is the collection name
// second param is the schema created above
// Reminder: mongo/mongoose will lowercase and pluralize
var Herocollect = mongoose.model('herocollects', herocollectSchema);

module.exports = Herocollect;
