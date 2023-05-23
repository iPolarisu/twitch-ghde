// aux functions to read and modify ini file accordingly

// get all available characters
function getDirectories(source) {
    return fs.readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
}


// returns: "role : character"
function getBandMember(contents, regex) {
    const line = contents.find((line) => line.search(regex) >= 0);
    return line ? line.replace('Preferred', '') : '';
}

// gets all "role : character"
function getCurrentBand() {

    // aux regex to search band members
    const regExBass = new RegExp('PreferredBassist =');
    const regExDrums = new RegExp('PreferredDrummer =');
    const regExGuitar = new RegExp('PreferredGuitarist =');
    const regExSing = new RegExp('PreferredSinger =');

    fs.readFile(iniDir, 'utf8', function(err, contents) {
        if (err) throw err;

        const lines = contents.toString().split("\n");

        const bassist = getBandMember(lines, regExBass);
        const drummer = getBandMember(lines, regExDrums);
        const guitarist = getBandMember(lines, regExGuitar);
        const singer = getBandMember(lines, regExSing);

        const band = [singer, guitarist, bassist, drummer];
        return band
    });
}

// update character for certain role
function updateRole(filePath, role, character) {

    // read ini file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
      
        // search role line and replace chracter
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