# dns-consul
DNS monkey patching for Consul

## Usage

Put the following code block at the top of the entry file in your application.

```js
require('dns-consul');

// rest of all you code...
```

## Environment Variables

Variable           | Notes
------------------ | -----
DNS_CONSUL_SERVERS | Comma separated DNS server IP addresses
