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
