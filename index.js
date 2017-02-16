const dns = require('dns');

function convert(envvar) {
    if (!envvar) return;
    const addresses = envvar.split(',').map(s => s.trim()).filter(Boolean);
    if (addresses.length === 0) return;
    return addresses;
}

function init() {
    if (!process.env.DNS_CONSUL_SERVERS) return;
    try {
        dns.setServers(convert(process.env.DNS_CONSUL_SERVERS));
    } catch (e) {}
}

const oldLookup = dns.lookup;
dns.lookup = (host, opt, cb) => {
    if (!host) return oldLookup.call(this, host, opt, cb);
    const tokens = host.split('.');
    if (tokens.length === 1) return oldLookup.call(this, host, opt, cb);
    const topLevel = tokens.slice(-1)[0];
    if (topLevel === 'consul') {
        if (!cb) {
            cb = opt;
            opt = null;
        }
        return dns.resolve4(host, (e, r) => cb(e, r && r[0], 4));
    }
    return oldLookup.call(this, host, opt, cb);
};

init();

exports.convert = convert;
