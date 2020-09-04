# jenvcfg

## Install
To install jenvcfg execute the following command in your terminal
```
    npm install jenvcfg
```

## Usage
Add the desired lines of code at the beginning of the application
```
    // Require the package
    const jenvcfg = require('jenvcfg'):

    // Load the default config file
    jenvcfg.load();

    // Load a specified config file
    jenvcfg.load('jenvcfg.json');

    // Load the config file depending on the current environment
    jenvcfg.loadByEnv();
```    
