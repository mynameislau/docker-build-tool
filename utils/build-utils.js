module.exports = {
  streamEnded: stream => new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  }),

  promisifyCB: func => new Promise((resolve, reject) => {
    func((error, success) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(success);
      }
    });
  }),

  namedTask: (name, task) => {
    task.displayName = name;

    return task;
  }
};
