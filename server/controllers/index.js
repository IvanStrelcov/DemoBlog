const config      = require('../config.json');
let callbackUrl   = "http://localhost:4200/redirect";
const Evernote    = require('evernote').Evernote;

class Blog {
  //home page
  index(req, res, next) {
    if(req.query.oauthAccessToken) {
      const token = req.query.oauthAccessToken;
      const client = new Evernote.Client({
        token: token,
        sandbox: config.SANDBOX,
        china: config.CHINA
      });
      var noteStore = client.getNoteStore();
      noteStore.listNotebooks(function(err, notebooks) {
        if (notebooks) {
          let newNotebooks = [...notebooks];
          Promise.all(
            newNotebooks.map( item => {
            let filter = new Evernote.NoteFilter();
            filter.notebookGuid = item.guid;
            let resultSpec = new Evernote.NotesMetadataResultSpec();
            resultSpec.includeTitle = true;
            resultSpec.includeContentLength = true;
            return new Promise((resolve, reject) => {
              noteStore.findNotesMetadata(filter, 0, 100, resultSpec, function(err, notesMeta) {
                if (notesMeta) {
                  if (err) {
                    reject(err);
                  } else {
                    Promise.all([...notesMeta.notes].map(item => {
                      return new Promise((_resolve, _reject)=>{
                        noteStore.getNote(token, item.guid, true, true, true, true, function(err, note){
                          _resolve(note);
                        })
                      })
                    })).then(resolve,reject);
                  }
                }
              })
            });
          })
          ).then(data => res.send({data}));
        }
      });
    } else {
      res.send({});
    }
  }

  // OAuth
  oauth(req, res, next) {
    var sess = req.session;
    const client = new Evernote.Client({
      consumerKey: config.API_CONSUMER_KEY,
      consumerSecret: config.API_CONSUMER_SECRET,
      sandbox: config.SANDBOX,
      china: config.CHINA,
      mode: config.MODE
    });

    client.getRequestToken(callbackUrl, function(error, oauthToken, oauthTokenSecret, results){
      if(error) {
        console.log('error');
        req.session.error = JSON.stringify(error);
        res.redirect('/');
      }
      else {
        // redirect the user to authorize the token
        res.send({ result: client.getAuthorizeUrl(oauthToken), oauthToken: oauthToken, oauthTokenSecret: oauthTokenSecret });
      }
    });
  }
  // OAuth callback
  oauth_callback(req, res, next) {
    const client = new Evernote.Client({
      consumerKey: config.API_CONSUMER_KEY,
      consumerSecret: config.API_CONSUMER_SECRET,
      sandbox: config.SANDBOX,
      china: config.CHINA,
    });
    client.getAccessToken(
      req.query.oauthToken,
      req.query.oauthTokenSecret,
      req.query.oauth_verifier,
      function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
        if(error) {
          console.log('error');
          console.log(error);
          res.redirect('/');
        } else {
          res.send({
            oauthAccessToken: oauthAccessToken,
            oauthAccessTokenSecret: oauthAccessTokenSecret,
            edamShard: results.edam_shard,
            edamUserId: results.edam_userId,
            edamExpires: results.edam_expires,
            edamNoteStoreUrl: results.edam_noteStoreUrl,
            edamWebApiUrlPrefix: results.edam_webApiUrlPrefix
          });
        }
      });
  }
  // Clear session
  clear(req, res, next){
    // req.session.destroy();
    res.redirect('/');
  }
}

module.exports = new Blog;
