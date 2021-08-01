const path = require('path');
const fs = require('fs');

// Regex for matching comments
const singleLineCommentRegex = /\n\s*\/\/.*/gm;
const multiLineCommentRegex = /\n\s*\/\*[\w\'\s\r\n\*]*\*\//gm;

// Function for flattening an nested object to a 1 layer object 
function flattenObject(object) {
    const flattenedObject = {};
    // Loop through all object keys
    Object.keys(object).forEach((prefixKey) => {
        // Check if element is object
        if(Object.prototype.toString.call(object[prefixKey]) === '[object Object]') {
            // Recursivly flatten Object
            const recFO = flattenObject(object[prefixKey]);
            // Loop through recursivly flattenedObject and add elements to flattenedObject
            Object.keys(recFO).forEach((recFOKey) => {
                flattenedObject[prefixKey.toUpperCase() + '_' + recFOKey] = recFO[recFOKey];
            });
        } else {
            flattenedObject[prefixKey.toUpperCase()] = object[prefixKey];
        }
    });
    return flattenedObject;
}



// Function for loading a config file
function load(configFileName='jenvcfg.json') {
    try {
        // Read jenvcfg.json file
        const filePath = path.join(process.cwd(), configFileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        // Remove comments via regex
        const fileContentsWOComments = fileContents.replace(singleLineCommentRegex, '').replace(multiLineCommentRegex, '');

        // Add env variables to process.env
        const jsonConfigObject = JSON.parse(fileContentsWOComments);
        Object.assign(process.env, flattenObject(jsonConfigObject));

        return jsonConfigObject;
    } catch(err){
        return {
            error : err
        };
    }
}

// Loads file [NODE_ENV].jenvcfg.json.json
function loadByEnv() {
    return load((process.env.NODE_ENV || 'development') + '.jenvcfg.json');
}

// Export functions
module.exports = { load, loadByEnv };