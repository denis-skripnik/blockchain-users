const viz = require("viz-js-lib")
const udb = require("./viz_usersdb");
viz.config.set("websocket","wss://viz.lexa.host/ws");

async function run() {
try {
	let curr_acc = "";
	let gests = [];
	let users = await udb.getTop('viz');
	let k = 0;
try {
	while(1) {
		//if(k++ > 10) break;
console.error("Viz curr", curr_acc, Object.keys(gests).length);
		const accs = await viz.api.lookupAccountsAsync(curr_acc, 100);
		if (accs[0] === curr_acc) {
			accs.splice(0, 1);
		}
		if(accs.length == 0) {
			break;
		}

		const params = await viz.api.getDynamicGlobalPropertiesAsync();

		const {total_vesting_fund, total_vesting_shares, current_supply, total_reward_fund} = params;
	
		const total_viz = parseFloat(total_vesting_fund.split(" ")[0]);
		const total_vests = parseFloat(total_vesting_shares.split(" ")[0]);
	
const all_viz = parseFloat(current_supply) - parseFloat(total_vesting_fund) - parseFloat(total_reward_fund);

		for(let acc of accs) {
			try {
			let get_accounts = await viz.api.getAccountsAsync([acc]);
let b = get_accounts[0];
			if (b) {
			await udb.updateTop(b.name,
parseFloat(b.vesting_shares.split(" ")[0]),
(parseFloat(b.vesting_shares.split(" ")[0]) / parseFloat(total_vests) * 100).toFixed(3),
parseFloat(b.delegated_vesting_shares.split(" ")[0]),
parseFloat(b.received_vesting_shares.split(" ")[0]),
(parseFloat(b.vesting_shares.split(" ")[0]) - parseFloat(b.delegated_vesting_shares.split(" ")[0]) + parseFloat(b.received_vesting_shares.split(" ")[0])),
parseFloat(b.balance.split(" ")[0]),
parseFloat(b.balance.split(" ")[0]) / parseFloat(all_viz) * 100);
curr_acc = b.name;
			} else {
				curr_acc = acc;
			}
			} catch(er) {
				curr_acc = acc;
				continue;
			}
		}
			}
} catch (e) {
console.error('error1: ' + JSON.stringify(e));
}
} catch (e) {
console.log('Error2: ' + JSON.stringify(e));
}
}

module.exports.run = run;