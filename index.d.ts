interface loadResult {
    [keys: string] : string | Error | undefined;
    error ?: Error;
}

/**
 * Loads the config file from the working directory.
 * @param configFileName - optional name of the config file defaults to jenvcfg.json
 * @returns loadResult - true if the config file was loaded successfully
 */
export function load(configFileName?: String): loadResult;

/**
 * Loads the config file depending on the current NODE_ENV from the working directory.
 * Path to the file should be [NODE_ENV].jenvcfg.json.json
 * @returns loadResult - true if the config file was loaded successfully
 */
export function loadByEnv(): loadResult;