/**
 * Marriage service
 */
const Marriage = require('../models/Marriage');

// This will create a new instance of a marriage in the database
// when kazi completes the first step
exports.createNew = async function (data) {
  const marriage = new Marriage(data);
  await marriage.save();
  return marriage;
};

exports.getAll = async function () {
  const marriages = await Marriage.find();
  return marriages;
};

exports.getOne = async function (id) {
  const marriage = await Marriage.findById(id);
  return marriage;
};

exports.updateOne = async function (data) {
  const updatedMarriage = await Marriage.findOneAndUpdate(
    { _id: data._id },
    { $set: data },
    { new: true }
  );
  return updatedMarriage;
};
