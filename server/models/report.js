let mongoose = require("mongoose");

let reportModel = mongoose.Schema({
  id: String,
  numberResponder: Number,
  numberResponded: Number,
  numberNotResponded: Number,
  data: Object,
  surveyTemplateId: String,
});
