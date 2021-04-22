const { createTrack } = require('../queries/tracksQueries');

async function* tracksGenerator() {
  let i = 0;
  while (i < 50) {
    yield createTrack({ title: `123-${i}` });
    console.log('gen_title:', `123-${i}`);
    i++;
  }
}

(async function () {
  for await (let res of tracksGenerator()) {
    console.log('result:', res);
  }
  process.exit(1);
})();
