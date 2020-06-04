const gudb = require("./golos_usersdb");
const vudb = require("./viz_usersdb");
const golos_top = require("./golos_top");
const viz_top = require("./viz_top");
let express = require('express');
let app = express();

async function main() {
    await viz_top.run();
    await golos_top.run();
}

main();
setInterval(main, 1200000);

app.get('/golos-top/', async function (req, res) {
    let type = req.query.type;
    if (type) {
        let data = await gudb.getTop(type);
    data.sort(function(a, b) {
        if(a[type] > b[type])
        {
            return -1;
        }
    else{
            return 1;
        }
    });
    
    let users = [];
    let users_count = 0;
    for (let user of data) {
        if (users_count < 100) {
            users[users_count] = {};
            users[users_count]['name'] = user['name'];
            users[users_count][type] = user[type];
            users[users_count][type + '_percent'] = user[type + '_percent'];
            for (let el in user) {
    if (type !== el && el !== 'name' && el + '_percent' !== type + '_percent') {
        users[users_count][el] = user[el];
    }
    }
    users_count++;
    } else {
        break;
    }
    }
    res.send(users);
    }
    });
    app.get('/viz-top/', async function (req, res) {
        let type = req.query.type;
        if (type) {
            let data = await vudb.getTop(type);
        data.sort(function(a, b) {
            if(a[type] > b[type])
            {
                return -1;
            }
        else{
                return 1;
            }
        });
        
        let users = [];
        let users_count = 0;
        for (let user of data) {
            if (users_count < 100) {
                users[users_count] = {};
                users[users_count]['name'] = user['name'];
                users[users_count][type] = user[type];
                users[users_count][type + '_percent'] = user[type + '_percent'];
                for (let el in user) {
        if (type !== el && el !== 'name' && el + '_percent' !== type + '_percent') {
            users[users_count][el] = user[el];
        }
        }
        users_count++;
        } else {
            break;
        }
        }
        res.send(users);
        }
        });
    app.listen(3100, function () {
    });