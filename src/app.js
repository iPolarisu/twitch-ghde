const tmi = require('tmi.js');
const fs = require('fs');
const fu = require('./fileUtils');

const configPath = '../config.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// set client options
const opts = {
    options: {
        debug: true,
    },
    identity: {
        username: config.username,
        password: config.password,
    },
    channels: config.channels,
};

// define admin
const admin = config.admin;

// files dir
const characterDir = config.CHARACTERS_DIR;
const iniDir = config.INI_PATH;

// get characters

const characters = fu.getDirectories(characterDir);

// bools to know if a role has been requested
let singBool = false;
let guitarBool = false;
let drumsBool = false;
let bassBool = false;

// current pool of characters for each role
let singPool = [];
let guitarPool = [];
let drumsPool = [];
let bassPool = [];

const client = tmi.client(opts);

async function handleCurrentBandCommand(channel) {
    try {
      const bandMembers = await fu.getCurrentBand(iniDir);
      client.say(channel, '[Band]');
      for (let i = 0; i < 4; i++) {
        client.say(channel, bandMembers[i]);
      }
    } catch (err) {
      console.error('Error al obtener la banda actual:', err);
    }
}

// handle user commands
client.on('message', (channel, userstate, message, self) => {

    // get band members
    if (message == '!currentband') {
        handleCurrentBandCommand(channel);

    // call for a new singer
    } else if (message == '!newsinger') {

        // check if user is admin
        if (userstate.username === admin) {
            singBool = true;
            singPool = [];
            client.say(channel, 'New singer requested!');
            for (let i = 0; i < 4; i++) {
                const randomSinger = characters[Math.floor(Math.random() * characters.length)];
                singPool.push(randomSinger);
                client.say(channel, `${i + 1} ${randomSinger}`);
            }
            client.say(channel, 'Use !singer[Number] to pick a singer');
        
        } else {
            client.say(channel, 'Only admins can request new roles');
        }
    
    // call for a new drummer
    } else if (message == '!newdrummer') {

        // check if user is admin
        if (userstate.username === admin) {
            drumsBool = true;
            drumsPool = [];
            client.say(channel, 'New drummer requested!');
            for (let i = 0; i < 4; i++) {
                const randomDrummer = characters[Math.floor(Math.random() * characters.length)];
                drumsPool.push(randomDrummer);
                client.say(channel, `${i + 1} ${randomDrummer}`);
            }
            client.say(channel, 'Use !drummer[Number] to pick a drummer');

        } else {
            client.say(channel, 'Only admins can request new roles');
        }
    
    // call for a new guitarist
    } else if (message == '!newguitarist') {

        // check if user is admin
        if (userstate.username === admin) {
            guitarBool = true;
            guitarPool = [];
            client.say(channel, 'New guitarist requested!');
            for (let i = 0; i < 4; i++) {
                const randomGuitarist = characters[Math.floor(Math.random() * characters.length)];
                guitarPool.push(randomGuitarist);
                client.say(channel, `${i + 1} ${randomGuitarist}`);
            }
            client.say(channel, 'Use !guitarist[Number] to pick a guitarist');

        } else {
            client.say(channel, 'Only admins can request new roles');
        }

    // call for a new bassist
    } else if (message == '!newbassist') {

        // check if user is admin
        if (userstate.username === admin) {
            bassBool = true;
            bassPool = [];
            client.say(channel, 'New bassist requested!');
            for (let i = 0; i < 4; i++) {
                const randomBassist = characters[Math.floor(Math.random() * characters.length)];
                bassPool.push(randomBassist);
                client.say(channel, `${i + 1} ${randomBassist}`);
            }
            client.say(channel, 'Use !bassist[Number] to pick a bassist');

        } else {
            client.say(channel, 'Only admins can request new roles');
        }
    
    // choose singer 1
    } else if (message == '!singer1') {
        if (singBool) {
            singBool = false;
            const singer = singPool[0];
            fu.updateRole(iniDir, 'PreferredSinger', singer);
            const message = singer + ' has been chosen to sing by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new singer has been requested!');
        }

    // choose singer 2
    } else if (message == '!singer2') {
        if (singBool) {
            singBool = false;
            const singer = singPool[1];
            fu.updateRole(iniDir, 'PreferredSinger', singer);
            const message = singer + ' has been chosen to sing by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new singer has been requested!');
        }

    // choose singer 3
    } else if (message == '!singer3') {
        if (singBool) {
            singBool = false;
            const singer = singPool[2];
            fu.updateRole(iniDir, 'PreferredSinger', singer);
            const message = singer + ' has been chosen to sing by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new singer has been requested!');
        }

    // choose singer 4
    } else if (message == '!singer4') {
        if (singBool) {
            singBool = false;
            const singer = singPool[3];
            fu.updateRole(iniDir, 'PreferredSinger', singer);
            const message = singer + ' has been chosen to sing by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new singer has been requested!');
        }

    // choose drummer 1
    } else if (message == '!drummer1') {
        if (drumsBool) {
            drumsBool = false;
            const drummer = drumsPool[0]; 
            fu.updateRole(iniDir, 'PreferredDrummer', drummer);
            const message = drummer + ' has been chosen to play the drums by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new drummer has been requested!');
        }
    
    // choose drummer 2
    } else if (message == '!drummer2') {
        if (drumsBool) {
            drumsBool = false;
            const drummer = drumsPool[1];
            fu.updateRole(iniDir, 'PreferredDrummer', drummer);
            const message = drummer + ' has been chosen to play the drums by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new drummer has been requested!');
        }
    
    // choose drummer 3
    } else if (message == '!drummer3') {
        if (drumsBool) {
            drumsBool = false;
            const drummer = drumsPool[2];
            fu.updateRole(iniDir, 'PreferredDrummer', drummer);
            const message = drummer + ' has been chosen to play the drums by @' + userstate.username;
            client.say(channel, message);  
        } else {
            client.say(channel, 'No new drummer has been requested!');
        }
    
    // choose drummer 4
    } else if (message == '!drummer4') {
        if (drumsBool) {
            drumsBool = false;
            const drummer = drumsPool[3];
            fu.updateRole(iniDir, 'PreferredDrummer', drummer);
            const message = drummer + ' has been chosen to play the drums by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new drummer has been requested!');
        }
    
    // choose guitarist 1
    } else if (message == '!guitarist1') {
        if (guitarBool) {
            guitarBool = false;
            const guitarist = guitarPool[0];
            fu.updateRole(iniDir, 'PreferredGuitarist', guitarist);
            const message = guitarist + ' has been chosen to play the guitar by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new guitarist has been requested!');
        }

    // choose guitarist 2
    } else if (message == '!guitarist2') {
        if (guitarBool) {
            guitarBool = false;
            const guitarist = guitarPool[1];
            fu.updateRole(iniDir, 'PreferredGuitarist', guitarist);
            const message = guitarist + ' has been chosen to play the guitar by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new guitarist has been requested!');
        }
    
    // choose guitarist 3
    } else if (message == '!guitarist3') {
        if (guitarBool) {
            guitarBool = false;
            const guitarist = guitarPool[2];
            fu.updateRole(iniDir, 'PreferredGuitarist', guitarist);
            const message = guitarist + ' has been chosen to play the guitar by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new guitarist has been requested!');
        }
    
    // choose guitarist 4
    } else if (message == '!guitarist4') {
        if (guitarBool) {
            guitarBool = false;
            const guitarist = guitarPool[3];
            fu.updateRole(iniDir, 'PreferredGuitarist', guitarist);
            const message = guitarist + ' has been chosen to play the guitar by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new guitarist has been requested!');
        }
    
    // choose bassist 1
    } else if (message == '!bassist1') {
        if (bassBool) {
            bassBool = false;
            const bassist = bassPool[0];
            fu.updateRole(iniDir, 'PreferredBassist', bassist);
            const message = bassist + ' has been chosen to play the bass by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new bassist has been requested!');
        }
    
    // choose bassist 2
    } else if (message == '!bassist2') {
        if (bassBool) {
            bassBool = false;
            const bassist = bassPool[1];
            fu.updateRole(iniDir, 'PreferredBassist', bassist);
            const message = bassist + ' has been chosen to play the bass by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new bassist has been requested!');
        }
    
    // choose bassist 3
    } else if (message == '!bassist3') {
        if (bassBool) {
            bassBool = false;
            const bassist = bassPool[2];
            fu.updateRole(iniDir, 'PreferredBassist', bassist);
            const message = bassist + ' has been chosen to play the bass by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new bassist has been requested!');
        }
    
    // choose bassist 4
    } else if (message == '!bassist4') {
        if (bassBool) {
            bassBool = false;
            const bassist = bassPool[3];
            fu.updateRole(iniDir, 'PreferredBassist', bassist);
            const message = bassist + ' has been chosen to play the bass by @' + userstate.username;
            client.say(channel, message);
        } else {
            client.say(channel, 'No new bassist requested!');
        }
    }

});

client.connect();
