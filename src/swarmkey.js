const generator = require('js-ipfs-swarm-key-gen');

generator().then(() => console.log('done'))
// or
// generator('C:/Users/HP/.ipfs1').then(() => console.log('done'))