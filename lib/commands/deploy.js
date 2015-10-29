var chalk = require('chalk');

module.exports = {
  name: 'deploy',
  description: 'Deploys an ember-cli app',
  works: 'insideProject',

  anonymousOptions: [
    '<deployTarget>'
  ],

  availableOptions: [
    { name: 'deploy-config-file', type: String, default: 'config/deploy.js' },
    { name: 'verbose', type: Boolean },
    { name: 'activate', type: Boolean }
  ],

  run: function(commandOptions, rawArgs) {
    commandOptions.deployTarget = rawArgs.shift();
    this.ui.verbose = commandOptions.verbose;
    this.ui.writeLine(chalk.green("Starting deploy"));
    this.ui.startProgress(chalk.green("."), chalk.green("."));
    process.env.DEPLOY_TARGET = commandOptions.deployTarget;

    var DeployTask = require('../tasks/deploy');
    var deploy = new DeployTask({
      project: this.project,
      ui: this.ui,
      deployTarget: commandOptions.deployTarget,
      deployConfigFile: commandOptions.deployConfigFile,
      commandOptions: commandOptions
    });

    return deploy.run()
    .then(function() {
      this.ui.write(chalk.green("Deploy done!\n"));
    })
    .finally(function() {
      this.ui.stopProgress();
    }.bind(this));

  },

};
