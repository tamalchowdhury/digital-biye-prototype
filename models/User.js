const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const md5 = require('md5');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email'],
  },
  // Husband information
  husband_name: String,
  husband_age: Number,
  husband_date_of_birth: String,
  husband_address: String,
  husband_fathers_name: String,
  husband_mothers_name: String,
  husband_votter_id_number: String,

  // Wife information
  wife_name: String,
  wife_age: Number,
  wife_date_of_birth: String,
  wife_address: String,
  wife_fathers_name: String,
  wife_mothers_name: String,
  wife_votter_id_number: String,

  place_of_marriage_address: String,
  // ToDo bride groom ukil name, father, mother name and address

  // Marriage details
  date_of_marriage_discussion: String,
  den_mohor_amount: Number,
  den_mohor_distribution: String,
  den_mohor_paid: Number,
  den_mohor_property_details: String,
  any_special_terms: String,
  husdand_gave_permission_for_divorce: String,
  wifes_right_to_divorce_violated: String,
  husbands_right_to_divorce_violated: String,
  agreement_for_den_mohor_during_marriage: String,

  // ToDo the person (kazi) married them, his name, father, mother name and address
  date_of_marriage_registration: String,
  paid_registration_fees_number: Number,
  paid_registration_fees_words: String,

  avatar: String,
  bio: {
    type: String,
    trim: true,
  },
  website: String,
  created: {
    type: Date,
    default: Date.now,
  },
  hearts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tweet',
    },
  ],
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

// userSchema.virtual('gravatar').get(function() {
// 	const hash = md5(this.email);
// 	return `https://gravatar.com/avatar/${hash}?s=300`;
// })

module.exports = mongoose.model('User', userSchema);
