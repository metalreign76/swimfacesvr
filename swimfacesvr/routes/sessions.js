var express = require('express');
var router = express.Router();
var axios = require('axios');
const fsp = require('fs').promises;

axios.defaults.baseURL = process.env.SWIMCLUBMANAGERAPI;
axios.defaults.headers.common['Authorization-Token'] = process.env.SWIMCLUBMANAGERTOKEN;

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log("Received API request for /sessions, calling SwimClubmanager....");

  var swimClubMgrData;
  var sessionsJSON;

  axios.get('/ClubSessions')
  .then(response => {
    swimClubMgrData = response.data.map(record => {
      return {Guid: record.Guid, SessionName: record.SessionName}
    })
    return fsp.readFile('sessions.json', 'utf8')
  })
  .then(sessions => {
    try {
      sessionsJSON = JSON.parse(sessions);
    } catch (e) {
      console.log("not JSON");
      if(sessions.length == 0)
        sessionsJSON = [];
      else
        throw(e)
    }
    console.log("Imported", sessionsJSON.length, "sessions")
    console.log("Looking for new sessions...")
    var importedGuidsOnly = sessionsJSON.map(aRecord => {
      return aRecord.Guid;
    })
    var newSessionsArray = [];
    swimClubMgrData.forEach(element => {
      if(!importedGuidsOnly.includes(element.Guid)) {
        newSessionsArray.push({
          Guid: element.Guid,
          SessionName: element.SessionName,
        })
      }
    });
    console.log("Found", newSessionsArray.length,  "new sessions!")
    newSessionsArray.forEach(newSession => {
      sessionsJSON.push(newSession);
    })
    return fsp.writeFile('sessions.json', JSON.stringify(sessionsJSON, null, 2));
  })
  .then(() => {
    res.send({sessions: sessionsJSON});
  })
  .catch(error => {
    console.log(error);
    res.status(500);
    res.send();
  })
});

module.exports = router;
