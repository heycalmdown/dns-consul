# dns-consul
DNS monkey patching for Consul

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Dependency Status][david-image]][david-url]

## Usage

Put the following code block at the top of the entry file in your application.

```js
require('dns-consul');

// rest of all you code...
```

## Environment Variables

Variable             | Notes
-------------------- | -----
`DNS_CONSUL_SERVERS` | Comma separated DNS server IP addresses

[travis-image]: https://api.travis-ci.org/spearhead-ea/dns-consul.svg?branch=master
[travis-url]: https://travis-ci.org/spearhead-ea/dns-consul
[npm-image]: https://badge.fury.io/js/dns-consul.svg
[npm-url]: http://badge.fury.io/js/dns-consul
[david-image]: https://david-dm.org/spearhead-ea/dns-consul/status.svg
[david-url]: https://david-dm.org/spearhead-ea/dns-consul
