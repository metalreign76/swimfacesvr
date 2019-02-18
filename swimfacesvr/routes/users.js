var express = require('express');
var router = express.Router();
var axios = require('axios');
const fsp = require('fs').promises;

axios.defaults.baseURL = process.env.SWIMCLUBMANAGERAPI;
axios.defaults.headers.common['Authorization-Token'] = process.env.SWIMCLUBMANAGERTOKEN;

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log("Received API request for /users, calling SwimClubmanager....");

  var swimClubMgrData;
  var biometricMappings;

  axios.get('/Users')
  .then(response => {
    swimClubMgrData = response.data.map(record => {
      return {Guid: record.Guid, MemberName: record.Firstname + " " + record.Lastname}
    })
    return fsp.readFile('user_to_biometric_mappings.json', 'utf8')
  })
  .then(mappings => {
    try {
      biometricMappings = JSON.parse(mappings);
    } catch (e) {
      console.log("not JSON");
      if(mappings.length == 0)
        biometricMappings = [];
      else
        throw(e)
    }
    console.log("Imported", biometricMappings.length, "members")
    console.log("Looking for new members...")
    var importedGuidsOnly = biometricMappings.map(aRecord => {
      return aRecord.Guid;
    })
    var newMembersArray = [];
    swimClubMgrData.forEach(element => {
      if(!importedGuidsOnly.includes(element.Guid)) {
        newMembersArray.push({
          Guid: element.Guid,
          MemberName: element.MemberName,
          BiometricGuid: null
        })
      }
    });
    console.log("Found", newMembersArray.length,  "new members!")
    newMembersArray.forEach(newMember => {
      biometricMappings.push(newMember);
    })
    return fsp.writeFile('user_to_biometric_mappings.json', JSON.stringify(biometricMappings, null, 2));
  })
  .then(() => {
    res.send({members: swimClubMgrData});
  })
  .catch(error => {
    console.log(error);
    res.status(500);
    res.send();
  })
});

module.exports = router;
