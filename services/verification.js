// Get the verify page
// this will check for the document verifiaction
exports.verify = async (type, number) => {};

/**
 *
 * @param {string} dateString takes the date string from the user voter id
 * Checks the data string and convets in the numarical age like 21, 31, 18 etc
 */
function dateToAge(dateString) {
  let date = new Date(dateString);
  let ageInMSeconds = Date.now() - date;
  ageInMSeconds = ageInMSeconds / 60 / 60 / 24 / 366 / 1000;
  return parseInt(ageInMSeconds);
}

/**
 * MOCK verification function with dummy data
 */
exports.mockVerify = async function (type, number) {
  let mock_voter_ids = [
    { number: '1234567890', name: 'Samsu Kopa', date_of_birth: '1975-12-31' },
    {
      number: '19983012556000351',
      name: 'Shahariar Hridoy',
      date_of_birth: '1998-11-13',
    },
    {
      number: '20003012960000169',
      name: 'Shariful Islam ',
      date_of_birth: '2000-06-05',
    },
  ];

  if (type === 'voter_id') {
    let person = mock_voter_ids.find((person) => person.number === number);

    if (person) {
      person.age = dateToAge(person.date_of_birth);
      return person;
    } else {
      return null;
    }
  }
};
