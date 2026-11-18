// Åpningstider per ukedag, søndag først. Må stemme med tabellen i index.html.
const tider = [[12, 16], [10, 16], [10, 16], [10, 16], [10, 18], [10, 16], [10, 16]];

// Dager med andre tider enn vanlig, for eksempel arrangementer og jul. Bruk null for stengt.
// Gamle datoer kan stå, de brukes bare når datoen er i dag eller de neste dagene.
const avvik = {
  '2026-11-22': [11, 16],
};

const oslo = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Oslo' }));
const dag = oslo.getDay();
const time = oslo.getHours();

function tiderFor(dato) {
  const nokkel = dato.toLocaleDateString('sv-SE');
  return nokkel in avvik ? avvik[nokkel] : tider[dato.getDay()];
}

const ukedager = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
const idagTider = tiderFor(oslo);
const apentNa = idagTider !== null && time >= idagTider[0] && time < idagTider[1];

let status;
if (idagTider !== null && time < idagTider[0]) {
  status = `Åpner ${idagTider[0]} i dag`;
} else if (apentNa) {
  status = `Åpent nå til ${idagTider[1]}`;
} else {
  status = 'Stengt nå';
  for (let fram = 1; fram <= 7; fram++) {
    const neste = new Date(oslo);
    neste.setDate(oslo.getDate() + fram);
    const nesteTider = tiderFor(neste);
    if (nesteTider !== null) {
      status = `Åpner ${nesteTider[0]} ${fram === 1 ? 'i morgen' : 'på ' + ukedager[neste.getDay()]}`;
      break;
    }
  }
}
for (const felt of document.querySelectorAll('.idag')) {
  felt.textContent = status;
  felt.classList.toggle('apent', apentNa);
}

for (const rad of document.querySelectorAll('tr[data-dag]')) {
  if (rad.dataset.dag.split(' ').includes(String(dag))) rad.classList.add('i-dag');
}

// Oppslag med sluttdato skjules når datoen er passert
const iDag = oslo.toLocaleDateString('sv-SE');
for (const oppslag of document.querySelectorAll('[data-til]')) {
  if (iDag > oppslag.dataset.til) oppslag.hidden = true;
}

const sesong = document.querySelector('.sesong');

function visSesong(navn) {
  sesong.dataset.sesong = navn;
  for (const knapp of sesong.querySelectorAll('[data-velg]')) {
    knapp.setAttribute('aria-selected', knapp.dataset.velg === navn);
  }
  for (const panel of sesong.querySelectorAll('[data-panel]')) {
    panel.hidden = panel.dataset.panel !== navn;
  }
}

for (const knapp of sesong.querySelectorAll('[data-velg]')) {
  knapp.addEventListener('click', () => visSesong(knapp.dataset.velg));
}

const maned = oslo.getMonth();
visSesong(maned >= 10 ? 'jul' : maned >= 8 ? 'host' : maned >= 5 ? 'sommer' : 'var');

// I november og desember vises «I drivhuset nå» i stedet for det vanlige utvalget. Ellers fjernes julebildene fra bildebåndet
const erJul = maned >= 10;
for (const tekst of document.querySelectorAll('[data-tid]')) {
  tekst.hidden = tekst.dataset.tid !== (erJul ? 'jul' : 'ellers');
}
if (!erJul) {
  for (const bilde of document.querySelectorAll('.jul-bilde')) bilde.remove();
}

// Bildebåndet trenger to like rekker for å kunne rulle uten hopp
const spor = document.querySelector('.band-spor');
for (const bilde of [...spor.children]) {
  const kopi = bilde.cloneNode();
  kopi.alt = '';
  spor.append(kopi);
}
