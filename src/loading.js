const algoliasearch = require('algoliasearch');

const appId = process.env.ALGOLIA_APP_ID;
const appAdminKey = process.env.ALGOLIA_ADMIN_KEY;
const indexName = process.env.ALGOLIA_INDEX

const client = algoliasearch(appId, appAdminKey);
const index = client.initIndex(indexName);

// -- Added data
var contactsJSON = require('./contacts.json');

index.addObjects(contactsJSON, function(err, content) {
  if (err) {
    console.error(err);
  }
});

// -- Set default search
index.setSettings({
  'customRanking': ['desc(followers)']
}, function(err, content) {
  console.log(content);
});

index.setSettings({
  'searchableAttributes': [
    'lastname',
    'firstname',
    'company',
    'email',
    'city',
    'address'
  ]
}, function(err, content) {
  console.log(content);
});


// -- Search
// firstname
// index.search('jimmie', function(err, content) {
//   console.log(content.hits);
// });

// // firstname with typo
// index.search('jimie', function(err, content) {
//   console.log(content.hits);
// });

// // a company
// index.search('california paint', function(err, content) {
//   console.log(content.hits);
// });

// // a firstname & company
// index.search('jimmie paint', function(err, content) {
//   console.log(content.hits);
// });
