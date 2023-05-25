# twitch-ghde

Twitch chatbot that modifies the characters of the band in [GHWT:DE](https://ghwt.de/).

## Description

Simple **tmi.js client** that listens to commands on Twitch chat. These commands can read and modify the `GHWTDE.ini` file. This way, the audience can propose characters for the streamer without the hassle of choosing characters and modifying the file manually.

## Getting Started

### Dependencies

- NodeJS

### Installing

1. Clone this repository

```bash
git clone https://github.com/iPolarisu/twitch-ghde
```

2. Install node modules

```bash
npm install
```

### Setup

To make the project work, follow these steps:

#### INI File Config

1.  Obtain the path of the `GHWTDE.ini` file, it should be something like `D:/Documents/My Games/Guitar Hero World Tour Definitive Edition/GHWTDE.ini`.

2. Replace `INI_PATH` in `config.json` with the obtained path.

3. Ensure that `GHWTDE.ini` contains a PreferredSinger, PreferredDrummer, PreferredBassist and PreferredGuitarist (it does not matter who or the order). You can refer to the [GHWTDE wiki](https://ghwt.de/wiki/#/wtde/iniconfig) for more information on this.

#### Characters Config

1. Ensure that the `MODS` folder follows this file structure:

```bash
└── MODS
    ├── Characters
    └── ...
```
The crucial part is that each character resides in a separate folder.

2. Replace `CHARACTERS_DIR` in `config.json` with the path to the characters folder.

#### Twitch Config

1. Create an account for the bot or use the one you will stream with.

2. Get your [Twitch OAuth token](https://twitchapps.com/tmi/).

3. Replace `username` in `config.json` with the bot's username.

4. Replace `password` in `config.json` with the bot's OAuth token.

5. Replace `admin` in `config.json` with the streamer's username (it could be a viewer or someone of trust as well).

6. Replace `channels` in `config.json` with the streamer's username.

### Executing program

```bash
node src/app.js
```

### Usage

The bot usage is currently simple and straightforward:

1. An admin (typically the streamer) can request to change the current character of a specific role.

```bash
# request a new singer
!newsinger
# request a new guitarist
!newguitarist
# request a new bassist
!newbassist
# request a new drummer
!newdrummer
```

2. The bot will present a list of four randomly possible characters.

3. Any viewer can pick a character (first come, first served).

```bash
# pick singer number 3
!singer3
# pick guitarist number 1
!guitarist1
# pick bassist number 2
!bassist2
# pick drummer number 4
!drummer42
```

#### Recommendations

To ensure a good experience, consider the following recommendations:

- If a new character has been requested, wait for the change to be made before making a new request for any role.

- Change characters when a song is over. While the game should not break, it makes more sense for the streamer to do this when not playing.

- Try to have way more than 4 characters available in your `MODS/Characters` folder.

## Collaborating

Feel free to fork this repository or create a pull request.

## Authors

- [@iPolarisu](https://github.com/iPolarisu)

## TODOs

- Add pictures with examples to README
- Add new command to generate full bands
- Extend support to more than one admin
- Avoid duplication when selecting random characters (for one role)
- Add support for n selected characters.
- Use regex to capture number selection

## License

This project is licensed under the GPL-3.0 License - see the LICENSE.md file for details
