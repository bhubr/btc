const { promisify } = require('util');
const { exec } = require('child_process');
const os = require('os');
const fs = require('fs');

const execAsync = promisify(exec);
const mkdirAsync = promisify(fs.mkdir);
const accessSync = promisify(fs.access);
const npmInstallDeps = 'npm install web3 ethereumjs-util ethereumjs-abi bignumber.js --no-save';
const getCwd = version => `${os.tmpdir()}/ccxt${version}`;

const ccxtInstall = (cwd, version, installDeps) => mkdirAsync(cwd)
    .then(() => execAsync(`npm install ccxt@${version}`, { cwd }))
    .then(() => installDeps
      ? execAsync(npmInstallDeps, { cwd })
      : Promise.resolve());

const ccxtInstallIfNeeded = (version, installDeps) => {
  const cwd = getCwd(version);
  return accessSync(cwd)
    .catch(() => ccxtInstall(cwd, version, installDeps));
};

// ccxtInstall('1.17.99')
//   .then(console.log)

module.exports = ccxtInstallIfNeeded;