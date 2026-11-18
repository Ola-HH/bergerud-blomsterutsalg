// Åpningstider per ukedag, søndag først. Må stemme med tabellen i index.html.
const tider = [[12, 16], [10, 16], [10, 16], [10, 16], [10, 18], [10, 16], [10, 16]];

const oslo = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Oslo' }));
const dag = oslo.getDay();
const time = oslo.getHours();
const [apner, stenger] = tider[dag];

let tekst;
if (time < apner) {
  tekst = `I dag åpner vi klokka ${apner} og holder åpent til ${stenger}.`;
} else if (time < stenger) {
  tekst = `Vi har åpent nå, fram til klokka ${stenger}.`;
} else {
  tekst = `Vi har stengt for i dag. I morgen åpner vi klokka ${tider[(dag + 1) % 7][0]}.`;
}
document.getElementById('idag').textContent = tekst;

for (const rad of document.querySelectorAll('tr[data-dag]')) {
  if (rad.dataset.dag.split(' ').includes(String(dag))) rad.classList.add('i-dag');
}

// Oppslag med sluttdato skjules når datoen er passert
const iDag = oslo.toLocaleDateString('sv-SE');
for (const oppslag of document.querySelectorAll('[data-til]')) {
  if (iDag > oppslag.dataset.til) oppslag.hidden = true;
}
