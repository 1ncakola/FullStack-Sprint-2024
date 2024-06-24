const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const program = new Command();


const configPath = path.join(__dirname, '../config/config.json');
const defaultConfigPath = path.join(__dirname, '../config/default.json');

program
  .command('init')
  .description('Initialize the application')
  .action(() => {
    if (!fs.existsSync(configPath)) {
      fs.copyFileSync(defaultConfigPath, configPath);
      console.log('Application initialized.');
    } else {
      console.log('Application already initialized.');
    }
  });

program
  .command('status')
  .description('Check initialization status')
  .action(() => {
    if (fs.existsSync(configPath)) {
      console.log('Application is initialized.');
    } else {
      console.log('Application is not initialized.');
    }
  });

program
  .command('view-config')
  .description('View current configuration')
  .action(() => {
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      console.log('Current configuration:', config);
    } else {
      console.log('Configuration not found. Please initialize the application.');
    }
  });

program
  .command('update-config <key> <value>')
  .description('Update configuration value')
  .action((key, value) => {
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      config[key] = value;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log(`Updated configuration: ${key} = ${value}`);
    } else {
      console.log('Configuration not found. Please initialize the application.');
    }
  });

program
  .command('reset-config')
  .description('Reset configuration to default')
  .action(() => {
    if (fs.existsSync(configPath)) {
      fs.copyFileSync(defaultConfigPath, configPath);
      console.log('Configuration reset to default.');
    } else {
      console.log('Configuration not found. Please initialize the application.');
    }
  });

program.parse(process.argv);
