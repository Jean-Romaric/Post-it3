let mot = "Mot de passe";
let v = " ";

console.log(v == mot[3]);
console.log(mot[3]);
/*let c = 0;
for (let i = 0; i < mot.length; i++) {
    c = c + 1;
    //console.log(mot[i]);
}
console.log(c);*/
const dns = require('dns');
import dns  from 'dns';

dns.setServers(['1.1.1.1','8.8.8.8']);


dns.lookup('www.example.com', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
