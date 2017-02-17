const dnsConsul = require('./index');
const dns = require('dns');

function lookup(host) {
    return new Promise((res, rej) => {
        dns.lookup(host, (err, add, fam) => {
            if (err) return rej(err);
            return res(add);
        });
    });
}

function spec(fn) {
    return done => {
        fn().then(done).catch(e => console.log(e) || done(e));
    };
}

function lookupTest(host, result) {
    return lookup(host).then(add => {
        expect(add).toEqual(result);
    });
}

describe('lookup', () => {
    it('should bypass ip addresses', spec(() => {
        return lookupTest('0.0.0.0', '0.0.0.0')
            .then(() => lookupTest('8.8.8.8', '8.8.8.8'));
    }));
    it('should handle empty string host', spec(() => lookupTest('', null)));
    it('should handle nullable', spec(() => {
        return lookupTest(null, null)
            .then(() => lookupTest(undefined, null));
    }));
    it('should ignore single level domain', spec(() => {
        return lookup('consul').catch(e => {
            expect(e.message).toEqual('getaddrinfo ENOTFOUND consul');
        });
    }));
    it('should handle x.service.consul', spec(() => {
        dns.resolve4 = (host, cb) => cb(null, ['9.9.9.9']);
        return lookupTest('x.service.consul', '9.9.9.9')
    }));
});

describe('convert()', () => {
    const convert = dnsConsul.convert;
    it('should convert envvar into dns server list', () => {
        expect(convert('0.0.0.0')).toEqual(['0.0.0.0']);
        expect(convert('0.0.0.0,1.1.1.1')).toEqual(['0.0.0.0', '1.1.1.1']);
        expect(convert('0.0.0.0, 1.1.1.1')).toEqual(['0.0.0.0', '1.1.1.1']);
    });
    it('should handle exceptional cases', () => {
        expect(convert()).toBeUndefined();
        expect(convert('')).toBeUndefined();
        expect(convert(',')).toBeUndefined();
    })
});

describe('', () => {
    it('should handle udp bind', (done) => {
        const dgram = require('dgram');
        const socket = dgram.createSocket('udp4');
        expect(() => socket.bind(8888, done)).not.toThrow();
    });
});
