const { createTrack } = require('../queries/tracksQueries');

async function* tracksGenerator() {
  let i = 0;
  let title = '';

  while (i < 50) {
    title = `123-${i}`;
    yield createTrack({ title });
    console.log('gen_title:', title);
    i++;
  }
}

(async function () {
  for await (let res of tracksGenerator()) {
    console.log('result:', res);
  }
  process.exit(1);
})();
