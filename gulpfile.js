const gulp = require('gulp');
const { workDir } = require('./utils/path-utils.js');
// const io = require('socket.io')();
// const argsModule = require('args');

const cssTask = require('./tasks/css-task');
const lintingTask = require('./tasks/linting-task');
const javascriptTask = require('./tasks/javascript-task');
const templatingTask = require('./tasks/templating-task');
const browserReloadTask = require('./tasks/browser-reload-task');
// const args = argsModule.parse(process.argv);

const tasks = [
  cssTask,
  lintingTask,
  javascriptTask,
  // browserReloadTask,
  templatingTask
];

// abandonné : serverwebsocket auquel on se connecte pour lancer les taches à la volée
// const listeningMode = () => {
//   io.on('connection', socket => {
//     console.log('one connected');
//     socket.on('change', type => {
//       console.log('yup,', type);
//       gulp.series(`dev-${type}`)();
//     });
//   });
//   io.listen(8765);
// };

const namedTasks = [
  ['default', gulp.parallel(tasks.map(task => task.dist))],
  ['dev', gulp.parallel(tasks.map(task => task.dev))],
  ...tasks.map(task => [`dev-${task.name}`, task.dev]),
  ...tasks.map(task => [`dist-${task.name}`, task.dist])
];

//

process.chdir(workDir);
namedTasks.forEach(([name, func]) => gulp.task(name, func));
