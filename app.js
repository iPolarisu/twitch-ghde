const tmi = require('tmi.js');
const fs = require('fs');

const opts = {

    options: {
        debug: true,
    },
    identity: {
        username:"username",
        password:"key",
    },
    channels:[
        "CHANNEL_NAME",
    ]
};

// bools to know if a position has been requested
let singBool = false;
let guitarBool = false;
let drumsBool = false;
let bassBool = false;

// current pool of characters for position
let singPool = [];
let guitarPool = [];
let drumsPool = [];
let bassPool = [];

// aux regex to search band members
const regExBass = new RegExp('PreferredBassist =');
const regExDrums = new RegExp('PreferredDrummer =');
const regExGuitar = new RegExp('PreferredGuitarist =');
const regExSing = new RegExp('PreferredSinger =');

// files dir
const characterDir = 'D:/Games/Guitar Hero World Tour/DATA/MODS/Characters';
const iniDir = 'D:/Documents/My Games/Guitar Hero World Tour Definitive Edition/GHWTDE.ini';

// get all available characters
const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
const characters = getDirectories(characterDir);

// update role
function updateRole(filePath, role, character) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
  
      const regex = new RegExp(`^${role} =.+$`, 'm');
      const formatted = data.replace(regex, `${role} = ${character}`);
  
      fs.writeFile(filePath, formatted, 'utf8', (err) => {
        if (err) {
          console.error(err);
          return;
        }
  
      });
    });
  }

const client = tmi.client(opts);

client.on('message', (channel, userstate, message, self) => {

    // get band members
    if (message == '!currentband') {

        let band;

        let bassist;
        let drummer;
        let guitarist;
        let singer;

        // read ini file in search of band members
        fs.readFile(iniDir, 'utf8', function(err, contents) {

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
    

    // call for a new singer
    } else if (message == '!newsinger') {
        if (userstate.username === 'ipolarisu') {
            singBool = true;
            singPool = [];
            client.say(channel, 'New singer requested!');
            for (let i = 0; i < 4; i++) {
                const randomSinger = characters[Math.floor(Math.random() * characters.length)];
                singPool.push(randomSinger);
                client.say(channel, `${i + 1} ${randomSinger}`);
            }
            client.say(channel, 'Use !singer[Number] to pick a singer')
        } else {
            client.say(channel, 'No permissions')
        }
    
    // call for a new drummer
    } else if (message == '!newdrummer') {
        if (userstate.username === 'NAME') {
            drumsBool = true;
            drumsPool = [];
            client.say(channel, 'New drummer requested!');
            for (let i = 0; i < 4; i++) {
                const randomDrummer = characters[Math.floor(Math.random() * characters.length)];
                drumsPool.push(randomDrummer);
                client.say(channel, `${i + 1} ${randomDrummer}`);
            }
            client.say(channel, 'Use !drummer[Number] to pick a drummer')
        } else {
            client.say(channel, 'No permissions')
        }
    
    // call for a new guitarist
    } else if (message == '!newguitarist') {
        if (userstate.username === 'NAME') {
            guitarBool = true;
            guitarPool = [];
            client.say(channel, 'New guitarist requested!');
            for (let i = 0; i < 4; i++) {
                const randomGuitarist = characters[Math.floor(Math.random() * characters.length)];
                guitarPool.push(randomGuitarist);
                client.say(channel, `${i + 1} ${randomGuitarist}`);
            }
            client.say(channel, 'Use !guitarist[Number] to pick a guitarist')
        } else {
            client.say(channel, 'No permissions')
        }

    // call for a new bassist
    } else if (message == '!newbassist') {
        if (userstate.username === 'NAME') {
            bassBool = true;
            bassPool = [];
            client.say(channel, 'New bassist requested!');
            for (let i = 0; i < 4; i++) {
                const randomBassist = characters[Math.floor(Math.random() * characters.length)];
                bassPool.push(randomBassist);
                client.say(channel, `${i + 1} ${randomBassist}`);
            }
            client.say(channel, 'Use !bassist[Number] to pick a bassist')
        } else {
            client.say(channel, 'No permissions')
        }
    
    // choose singer 1
    } else if (message == '!singer1') {
        if (singBool) {
        const singer = singPool[0];
        updateRole(iniDir, 'PreferredSinger', singer);
        singBool = false;
        } else {
        client.say(channel, 'No new singer requested!');
        }

    // choose singer 2
    } else if (message == '!singer2') {
        if (singBool) {
        const singer = singPool[1];
        updateRole(iniDir, 'PreferredSinger', singer);
        singBool = false;
        } else {
        client.say(channel, 'No new singer requested!');
        }

    // choose singer 3
    } else if (message == '!singer3') {
        if (singBool) {
        const singer = singPool[2];
        updateRole(iniDir, 'PreferredSinger', singer);
        singBool = false;
        } else {
        client.say(channel, 'No new singer requested!');
        }

    // choose singer 4
    } else if (message == '!singer4') {
        if (singBool) {
        const singer = singPool[3];
        updateRole(iniDir, 'PreferredSinger', singer);
        singBool = false;
        } else {
        client.say(channel, 'No new singer requested!');
        }

    // choose drummer 1
    } else if (message == '!drummer1') {
        if (drumsBool) {
        const drummer = drumsPool[0]; 
        updateRole(iniDir, 'PreferredDrummer', drummer);
        drumsBool = false;
        } else {
        client.say(channel, 'No new drummer requested!');
        }
    
    // choose drummer 2
    } else if (message == '!drummer2') {
        if (drumsBool) {
        const drummer = drumsPool[1];
        updateRole(iniDir, 'PreferredDrummer', drummer);
        drumsBool = false;
        } else {
        client.say(channel, 'No new drummer requested!');
        }
    
    // choose drummer 3
    } else if (message == '!drummer3') {
        if (drumsBool) {
        const drummer = drumsPool[2];
        updateRole(iniDir, 'PreferredDrummer', drummer);
        drumsBool = false;
        } else {
        client.say(channel, 'No new drummer requested!');
        }
    
    // choose drummer 4
    } else if (message == '!drummer4') {
        if (drumsBool) {
        const drummer = drumsPool[3];
        updateRole(iniDir, 'PreferredDrummer', drummer);
        drumsBool = false;
        } else {
        client.say(channel, 'No new drummer requested!');
        }
    
    // choose guitarist 1
    } else if (message == '!guitarist1') {
        if (guitarBool) {
        const guitarist = guitarPool[0];
        updateRole(iniDir, 'PreferredGuitarist', guitarist);
        guitarBool = false;
        } else {
        client.say(channel, 'No new guitarist requested!');
        }

    // choose guitarist 2
    } else if (message == '!guitarist2') {
        if (guitarBool) {
        const guitarist = guitarPool[1];
        updateRole(iniDir, 'PreferredGuitarist', guitarist);
        guitarBool = false;
        } else {
        client.say(channel, 'No new guitarist requested!');
        }
    
    // choose guitarist 3
    } else if (message == '!guitarist3') {
        if (guitarBool) {
        const guitarist = guitarPool[2];
        updateRole(iniDir, 'PreferredGuitarist', guitarist);
        guitarBool = false;
        } else {
        client.say(channel, 'No new guitarist requested!');
        }
    
    // choose guitarist 4
    } else if (message == '!guitarist4') {
        if (guitarBool) {
        const guitarist = guitarPool[3];
        updateRole(iniDir, 'PreferredGuitarist', guitarist);
        guitarBool = false;
        } else {
        client.say(channel, 'No new guitarist requested!');
        }
    
    // choose bassist 1
    } else if (message == '!bassist1') {
        if (bassBool) {
        const bassist = bassPool[0];
        updateRole(iniDir, 'PreferredBassist', bassist);
        bassBool = false;
        } else {
        client.say(channel, 'No new bassist requested!');
        }
    
    // choose bassist 2
    } else if (message == '!bassist2') {
        if (bassBool) {
        const bassist = bassPool[1];
        updateRole(iniDir, 'PreferredBassist', bassist);
        bassBool = false;
        } else {
        client.say(channel, 'No new bassist requested!');
        }
    
    // choose bassist 3
    } else if (message == '!bassist3') {
        if (bassBool) {
        const bassist = bassPool[2];
        updateRole(iniDir, 'PreferredBassist', bassist);
        bassBool = false;
        } else {
        client.say(channel, 'No new bassist requested!');
        }
    
    // choose bassist 4
    } else if (message == '!bassist4') {
        if (bassBool) {
        const bassist = bassPool[3];
        updateRole(iniDir, 'PreferredBassist', bassist);
        bassBool = false;
        } else {
        client.say(channel, 'No new bassist requested!');
        }
    }

});

client.connect()
