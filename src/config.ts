/**
 * @string configFilename
 * @description The name of the config file that should exist in the
 *      root of any project that uses the Intouch Design System. This
 *      file configures various settings for the Sketch plugin and the
 *      Webpack plugin (and possibly more).
 */
export const configFilename = '.idsconfig.json'

/**
 * @type Config
 * @description The properties that are expected to be in a valid
 *      config file. The value of each property should be a filepath.
 */
export type Config = {
    values: string
    variants: string
    output: string
}

/**
 * @type OptionalConfig
 * @description The optional properties that may be in a valid
 *      config file. The value of each property should be a filepath.
 */
export type OptionalConfig = {
    entry?: string
    icons?: string
}

/**
 * @function validateConfig
 * @description Takes Config file data and returns the
 *      config object if it is valid, or false if it is invalid.
 */
export const validateConfig = (config: Partial<Config>) => {
    let isValid = true

    const validate = (propertyName: keyof Config) => {
        if (!config[propertyName] || typeof config[propertyName] !== 'string') {
            isValid = false
            console.error(`Property "${propertyName}" is not configured in "${configFilename}" config file`)
        }
    }

    validate('values')
    validate('variants')
    validate('output')

    if (isValid) {
        return config as Config
    }
    
    return false
}