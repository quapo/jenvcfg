# jenvcfg

Jenvcfg combines the concepts of using a .env and a JSON file for configuration. The config file is a JSON file (which allows comments) and is loaded into the [user environment (process.env)](https://nodejs.org/api/process.html#process_process_env) like a .env file. The JSON object gets flattened, then each key is converted into constant case and asssigned to the [user environment (process.env)](https://nodejs.org/api/process.html#process_process_env).

## Install
To install jenvcfg execute the following command in your terminal
```
    npm install jenvcfg
```

## Usage

Example jenvcfg.json file:
```JSON
{
    // Hi, im a comment and im allowed
    "port" : 8080,
    "general" : {
        "name" : "example",
        /**
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

```javascript
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

```javascript
// port
process.env.PORT // 8080

// general.name
process.env.GENERAL_NAME // example

// general.information.title
process.env.GENERAL_INFORMATION_TITLE // best config

// general.information.text
process.env.GENERAL_INFORMATION_TEXT // this is how it works
```

## Documenation

### load

load will load either the optional specified file or default to "jenvcfg.json". Due to the nature of the process.env object all values from the config will be implicitly converted to string (See [process.env](https://nodejs.org/api/process.html#process_process_env) for further information).
It will return an object containing all new set environment variables. 
```javascript
    {
        PORT : "8080",
        GENERAL_NAME : "example",
        GENERAL_INFORMATION_TITLE : "best config",
        GENERAL_INFORMATION_TEXT : "this is how it works"
    }
```

In case of an error an object containing an error key with the error will be returned.
```javascript
    {
        error : Error(...)
    }
```

### loadByEnv

loadByEnv will call the load function but will add the NODE_ENV as prefix to the "jenvcfg.json" so that the file "NODE_ENV.jenvcfg.json" will be loaded. If NODE_ENV if not set it will default to "development".
