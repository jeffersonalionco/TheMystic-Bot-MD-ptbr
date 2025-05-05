import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import moment from 'moment-timezone';

global.botnumber = ""
global.confirmCode = ""
global.authFile = `MysticSession`;

// Cambiar a true si el Bot responde a sus comandos con otros comandos.
// Cambiar a false para usar el Bot desde el mismo numero del Bot.
// Error de m.isBaileys marcado como false fix temporal
global.isBaileysFail = false

global.defaultLenguaje = 'es';

global.owner = [
  ['5219992095479', '👑 Mystic - BrunoSobrino 👑', true],
  ['51940617554', '💫 Mystic - Collaborator 2 💫', true],
  ['51996089079', '💫 Mystic - Collaborator 3 💫', true],
  ['5218442286089', '💫 Mystic - Collaborator 4 💫', true],
  ['50246028932', '💫 Mystic - Collaborator 5 💫', true],
  ['5212412377467', '💫 Mystic - Collaborator 6 💫', true],
  ['5215517489568', '💫 Mystic - Collaborator 7 💫', false],
  ['59895555511', '💫 Mystic - Collaborator 8 💫', true],
  ['5492916450307', '💫 Mystic - Collaborator 9 💫', true],
  ['59175655964', '💫 Mystic - Collaborator 10 💫', true],
  ['5493794297363', '💫 Mystic - Collaborator 11 💫', true], 
  ['393518398856', '💫 Mystic - Collaborator 12 💫', true],
  ['212781160203', '💫 Mystic - Collaborator 13 💫', true], 
  ['5217778573223', '💫 Mystic - Collaborator 14 💫', true],
  ['595972157130'],
  ['593968585283'],
  ['5492266466080'],
  ['5218442114446'],
  ['59894808483'],
  ['593980586516'], 
  ['595975740803'],  
  ['5492266613038'],
  ['50497150165'],
  ['51906662557'],
  ['573183650526'], 
  ['5217441298510'], 
  ['5217294888993'],
  ['595992611272'],
  ['5219992843892'],
  ['5493795319022'],
  ['573147616444'], 
  ['5219991402134'],
  ['5219996125657'],
  ['5492215034412'],
  ['584125778026'],
  ['5218444937407'],
  ['5218713339906']
];

global.suittag = ['5219993404349'];
global.prems = ['51995386439'];

// API (INTERFAZ DE PROGRAMACIÓN DE APLICACIONES)
global.BASE_API_DELIRIUS = "https://delirius-apiofc.vercel.app";
global.BASE_API_SKYNEX = "https://skynex.boxmine.xyz";

global.packname = 'Sticker';
global.author = 'The Mystic - Bot';
global.wm = 'The Mystic - Bot';
global.titulowm = 'The Mystic - Bot';
global.titulowm2 = `The Mystic - Bot`
global.igfg = 'The Mystic - Bot';
global.wait = '*_[ ⏳ ] Cargando..._*';

global.imagen1 = fs.readFileSync('./src/assets/images/menu/languages/es/menu.png');
global.imagen2 = fs.readFileSync('./src/assets/images/menu/languages/pt/menu.png');
global.imagen3 = fs.readFileSync('./src/assets/images/menu/languages/fr/menu.png')
global.imagen4 = fs.readFileSync('./src/assets/images/menu/languages/en/menu.png')
global.imagen5 = fs.readFileSync('./src/assets/images/menu/languages/ru/menu.png')

global.mods = [];

//* *******Tiempo***************
global.d = new Date(new Date + 3600000);
global.locale = 'es';
global.dia = d.toLocaleDateString(locale, {weekday: 'long'});
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString('es', {month: 'long'});
global.año = d.toLocaleDateString('es', {year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
//* ****************************
global.wm2 = `${dia} ${fecha}\nThe Mystic - Bot`;
global.gt = 'The Mystic - Bot';
global.mysticbot = 'The Mystic - Bot';
global.channel = 'https://whatsapp.com/channel/0029Vaein6eInlqIsCXpDs3y';
global.md = 'https://github.com/BrunoSobrino/TheMystic-Bot-MD';
global.mysticbot = 'https://github.com/BrunoSobrino/TheMystic-Bot-MD';
global.waitt = '*_[ ⏳ ] Cargando..._*';
global.waittt = '*_[ ⏳ ] Cargando..._*';
global.waitttt = '*_[ ⏳ ] Cargando..._*';
global.nomorown = '5219993404349';
global.pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf'];
global.cmenut = '❖––––––『';
global.cmenub = '┊✦ ';
global.cmenuf = '╰━═┅═━––––––๑\n';
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ';
global.dmenut = '*❖─┅──┅〈*';
global.dmenub = '*┊»*';
global.dmenub2 = '*┊*';
global.dmenuf = '*╰┅────────┅✦*';
global.htjava = '⫹⫺';
global.htki = '*⭑•̩̩͙⊱•••• ☪*';
global.htka = '*☪ ••••̩̩͙⊰•⭑*';
global.comienzo = '• • ◕◕════';
global.fin = '════◕◕ • •';
global.botdate = `*[ 📅 ] Fecha:*  ${moment.tz('America/Mexico_City').format('DD/MM/YY')}`;
global.bottime = `*[ ⏳ ] Hora:* ${moment.tz('America/Mexico_City').format('HH:mm:ss')}`;
global.fgif = { key: { participant: '0@s.whatsapp.net' }, message: { 'videoMessage': { 'title': wm, 'h': `Hmm`, 'seconds': '999999999', 'gifPlayback': 'true', 'caption': bottime, 'jpegThumbnail': fs.readFileSync('./src/assets/images/menu/languages/es/menu.png')}}};
global.multiplier = 99;
global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=',
];


global.gamex_db = "http://localhost:3000"
//* ************************

const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'config.js\''));
  import(`${file}?update=${Date.now()}`);
});
