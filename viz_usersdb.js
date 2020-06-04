var Datastore = require('nedb')
  , db = new Datastore({ filename: './viz_users.db', autoload: true });
  db.persistence.setAutocompactionInterval(1000 * 30);
  db.ensureIndex({ fieldName: 'name' }, function (err) {
console.log(JSON.stringify(err));
  });

  function getTop(type) {
    return new Promise((resolve, reject) => {
      const query = {}
      query[type] = { $exists: true }
      db.find(query, (err, result) => {
  if (err) {
    reject(err);
  } else {
    resolve(result);
  }
        });
  });
  }

    function updateTop(name, shares, shares_percent, delegated_shares, received_shares, effective_shares, viz, viz_percent) {
  return new Promise((resolve, reject) => {
  db.update({name}, {name, shares, shares_percent, delegated_shares, received_shares, effective_shares, viz, viz_percent}, {upsert:true}, (err, result) => {
if (err) {
  reject(err);
} else {
       resolve(result);
}
  });
  });
}

module.exports.getTop = getTop;
module.exports.updateTop = updateTop;