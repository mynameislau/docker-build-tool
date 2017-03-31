'use strict';

let incrementalIndex = -1;

module.exports = {
  getIndex: () => {
    incrementalIndex += 1;
    return incrementalIndex;
  },
  capitals: str => {
    return str.toUpperCase();
  },
  times: (n, opts) => {
    let accum = '';

    for(let i = 0; i < n; i += 1) {
      accum += opts.fn({ index: i }, {
        data: {
          index: i
        }
      });
    }

    return accum;
  },
  spaced: str => {
    return str ? ` ${str}` : '';
  },
  debug: data => {
    return `<pre><code>${JSON.stringify(data)}</code></pre>`;
  },
  lorem: (length) => {
    const str = `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Molestiae saepe dignissimos quod vero, omnis nam possimus? Reprehenderit,
      fuga perferendis obcaecati itaque repellendus aspernatur
      quasi quis nesciunt neque. Laboriosam, maxime, rerum!
    `;

    return str.substring(0, length > 0 ? length : undefined);
  },
  loremRand: () =>
    `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Molestiae saepe dignissimos quod vero, omnis nam possimus? Reprehenderit,
      fuga perferendis obcaecati itaque repellendus aspernatur
      quasi quis nesciunt neque. Laboriosam, maxime, rerum!
    `.substring(0, 10 + Math.round(Math.random() * 100))
};
