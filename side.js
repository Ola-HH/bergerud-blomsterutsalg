// Åpningstider per ukedag, søndag først. Må stemme med tabellen i index.html.
const tider = [[12, 16], [10, 16], [10, 16], [10, 16], [10, 18], [10, 16], [10, 16]];

const oslo = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Oslo' }));
const dag = oslo.getDay();
const time = oslo.getHours();
const [apner, stenger] = tider[dag];

let status;
if (time < apner) {
  status = `Åpner ${apner} i dag`;
} else if (time < stenger) {
  status = `Åpent nå til ${stenger}`;
} else {
  status = `Åpner ${tider[(dag + 1) % 7][0]} i morgen`;
}
for (const felt of document.querySelectorAll('.idag')) {
  felt.textContent = status;
  felt.classList.toggle('apent', time >= apner && time < stenger);
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

// I november og desember flyttes jula opp rett under forsiden og utvalget starter med julevarer. Ellers fjernes julebildene fra bildebåndet
const erJul = maned >= 10;
for (const tekst of document.querySelectorAll('[data-tid]')) {
  tekst.hidden = tekst.dataset.tid !== (erJul ? 'jul' : 'ellers');
}
if (erJul) {
  document.querySelector('main').prepend(sesong);
} else {
  for (const bilde of document.querySelectorAll('.jul-bilde')) bilde.remove();
}

// Bildebåndet trenger to like rekker for å kunne rulle uten hopp
const spor = document.querySelector('.band-spor');
for (const bilde of [...spor.children]) {
  const kopi = bilde.cloneNode();
  kopi.alt = '';
  spor.append(kopi);
}
