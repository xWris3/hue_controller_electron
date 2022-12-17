// multicast dns module, see https://github.com/soef/mdns-discovery
const Mdns = require('mdns-discovery');

export const bridgesLookup = () => {
    let mdns = new Mdns({
        timeout: 3,
        name: '_hue._tcp.local',
        find: '_hue._tcp.local'
    });

    return new Promise((resolve, reject) => {
        mdns.run((mDnsAnswers) => {
            if (mDnsAnswers) {
                var hubs = [];
                mDnsAnswers.forEach(a => {
                    hubs.push({ 'shortid': a.PTR.data.slice(14, 20), 'ip': a.ip });
                });
                return resolve(hubs);
            }
            return reject(mDnsAnswers);
        })
    })
}