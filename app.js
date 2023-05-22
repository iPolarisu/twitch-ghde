const tmi = require('tmi.js');
const fs = require('fs');

const opts = {

    options: {
        debug: true,
    },
    identity: {
        username:"USER",
        password:"TOKEN",
    },
    channels:[
        "CHANNEL_NAME",
    ]
};

const client = tmi.client(opts);

client.on('message', (channel, userstate, message, self) => {

    if (message == '!currentband') {

        const regExBass = new RegExp('PreferredBassist =', 'i');
        const regExDrums = new RegExp('PreferredDrummer =', 'i');
        const regExGuitar = new RegExp('PreferredGuitarist =', 'i');
        const regExSing = new RegExp('PreferredSinger =', 'i');

        let band;

        let bassist;
        let drummer;
        let guitarist;
        let singer;

        fs.readFile('D:/Documents/My Games/Guitar Hero World Tour Definitive Edition/GHWTDE.ini', 'utf8', function(err, contents) {

            if(err) throw err;

            let lines = contents.toString().split("\n");
            lines.forEach(line => {

                if (line && line.search(regExBass) >= 0) {
                    bassist = line.replace('Preferred', '');
                }
                else if (line && line.search(regExDrums) >= 0) {
                    drummer = line.replace('Preferred', '');
                }
                else if (line && line.search(regExGuitar) >= 0) {
                    guitarist = line.replace('Preferred', '');
                }
                else if (line && line.search(regExSing) >= 0) {
                    singer = line.replace('Preferred', '');
                }

            })
            client.say(channel, '[Band]');
            client.say(channel, singer);
            client.say(channel, guitarist);
            client.say(channel, bassist);
            client.say(channel, drummer);
        })
        
    }

});

client.connect()
