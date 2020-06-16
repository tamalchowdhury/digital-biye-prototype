// Get the verify page
// this will check for the document verifiaction
exports.verify = async (type, number) => {};

exports.mockVerify = async function (type, number) {
  let mock_voter_ids = [
    { number: '1234567890', name: 'Samsu Kopa', date_of_birth: '1975-12-31' },
  ];

  if (type === 'voter_id') {
    return 21;
  } else {
    return 0;
  }
};
