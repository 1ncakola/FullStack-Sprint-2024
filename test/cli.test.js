const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('CLI tests', () => {
  const configPath = path.join(__dirname, '../src/config/config.json');
  const defaultConfigPath = path.join(__dirname, '../src/config/default.json');

  beforeAll(() => {
    if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
    }
  });

  test('should initialize the application', () => {
    const output = execSync('node src/cli/index.js init').toString();
    expect(output).toContain('Application initialized.');
    expect(fs.existsSync(configPath)).toBe(true);
  });

  test('should check initialization status', () => {
    const output = execSync('node src/cli/index.js status').toString();
    expect(output).toContain('Application is initialized.');
  });

  // Add more tests for other CLI commands
});
