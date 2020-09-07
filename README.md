# jenvcfg

Jenvcfg combines the conecpts of using a .env or a JSON file for configuration. The config file is a JSON file (which allows comments) and is loaded into the [user environment (process.env)](https://nodejs.org/api/process.html#process_process_env) like a .env file. The JSON object gets flattened then each key is converted into constant case and asssigned to the [user environment (process.env)](https://nodejs.org/api/process.html#process_process_env).

## Install
To install jenvcfg execute the following command in your terminal
```
    npm install jenvcfg
```

## Usage

Example jenvcfg.json file:
```
{
    // Hi, im a comment and im allowed
    "port" : 8080,
    "general" : {
        "name" : "example",
        /*
         * Im also allowed wuhuu
         */
        "information" : {
            "title" : "best config",
            "text" : "this is how it works"
        }
    }
}
```

Add the desired lines of code at the beginning of the application to load the configuration file:

```
    // Require the package
    const jenvcfg = require('jenvcfg'):

    // Load the default config file - jenvcfg.json
    jenvcfg.load();

    // Load a specified config file
    jenvcfg.load('jenvcfg.json');

    // Load the config file depending on the current environment [NODE_ENV].jenvcfg.json
    jenvcfg.loadByEnv();
```

The values of the example config file can be accessed via:

```
// port
process.env.PORT // 8080

// general.name
process.env.GENERAL_NAME // example

// general.information.title
process.env.GENERAL_INFORMATION_TITLE // best config

// general.information.text
process.env.GENERAL_INFORMATION_TEXT // this is how it works
```