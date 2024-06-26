const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const program = new Command();


const configPath = path.join(__dirname, '../config/config.json');
const defaultConfigPath = path.join(__dirname, '../config/default.json');
const usersPath = path.join(__dirname, '../config/users.json');

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

    if (!fs.existsSync(configPath)){
      fs.writeFileSync(usersPath, JSON.stringify([]));
      console.log('User data file created.');
    }else{
      console.log('User data file already exists.');
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

  program
  .command('generate-token <username>')
  .description('Generate a user token')
  .action((username) => {
    if (fs.existsSync(usersPath)) {
      const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
      const user = users.find(user => user.username === username);
      if (user) {
        const token = Buffer.from(username).toString('hex');
        console.log(`Token for ${username}: ${token}`);
      } else {
        console.log('User not found');
      }
    } else {
      console.log('User data file not found. Please initialize the application.');
    }
  });

program
  .command('update-user <username> <email> <phone>')
  .description('Update user email and phone')
  .action((username, email, phone) => {
    if (fs.existsSync(usersPath)) {
      const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
      const user = users.find(user => user.username === username);
      if (user) {
        user.email = email;
        user.phone = phone;
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        console.log(`User updated: ${username}`);
      } else {
        console.log('User not found');
      }
    } else {
      console.log('User data file not found. Please initialize the application.');
    }
  });

program
  .command('search-user <query>')
  .description('Search for a user by username, email, or phone')
  .action((query) => {
    if (fs.existsSync(usersPath)) {
      const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
      const user = users.find(user => 
        user.username === query || user.email === query || user.phone === query);
      if (user) {
        console.log('User found:', user);
      } else {
        console.log('User not found');
      }
    } else {
      console.log('User data file not found. Please initialize the application.');
    }
  });
program.parse(process.argv);
