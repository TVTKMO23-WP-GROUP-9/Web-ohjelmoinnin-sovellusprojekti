const bcrypt = require('bcrypt');

// ajetaan tämän kansion juuresta komennolla: node generatePasswords.js 

// tässä tehdään testidatan käyttäjätunnuksille salasanat bcryptin avulla
const users = [
  { username: 'Viilipytty', password: 'oivamato' },
  { username: 'Jankka', password: '8D94gvds0' },
  { username: 'komediaa82', password: 'aaidemok' },
  { username: 'Eloton', password: 'sana5532' },
  { username: 'vainse', password: 'rekku6' },
  { username: 'jokaToka', password: 'lomakuume#1' },
  { username: 'Mikk0', password: 'VIEROSKAT' },
  { username: 'dramaqueen', password: 'unohdettu1010' },
  { username: 'kauhistus', password: 'kauhuleffoja38' },
  { username: 'Jest4s', password: ')3nvds98ETF' },
  { username: 'AaveMaria', password: '#mvvdisCORD' },
  { username: 'siippa5', password: 'siipaton000' },
  { username: 'Pastilli', password: 'jukujes%' },
  { username: 'Huutista', password: 'xDXDxdXD94' },
  { username: 'salaakaton', password: 'tuskaa4=' },
  { username: 'Kan-Joni', password: 'helppo' },
  { username: 'poikamies', password: 'vielkinEhtis' },
  { username: 'Misu01', password: '987654321' },
  { username: 'maitotee', password: 'EnJuoKahvia' },
  { username: 'lipettiin', password: 'somaprinsessa666' },
  { username: 'Jenna', password: 'annejjenna' },
  { username: 'Siilinpieru', password: 'hedgehog' },
  { username: 'PaijaanSUA', password: 'byebye??0' }
];

// tiivistetään salasanat bcryptillä
async function hashPasswords(users) {
    try {
        for (let user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            console.log(`('${user.username}', '${hashedPassword}', NULL, NULL, CURRENT_TIMESTAMP, NULL),`);
        }
    } catch (error) {
        console.error('Virhe salasanojen tiivistämisessä:', error);
    }
}

hashPasswords(users);