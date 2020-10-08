/**
 * @string configFilename
 * @description The name of the config file that should exist in the
 *      root of any project that uses the Intouch Design System. This
 *      file configures various settings for the Sketch plugin and the
 *      Webpack plugin (and possibly more).
 */
export const configFilename = 'idsconfig.js'

export type Config = {
    themeValuesPath?: string
    themeGroupsPath?: string
    themeComponentsPath?: string
    themeVariantsPath?: string
    themeOutputPath?: string
}

/**
 * @string validateConfig
 * @description Takes an object from a Config file. Returns the
 *      config object if it is valid, or false if it is invalid.
 */
export const validateConfig = (config: Config) => {
    let isValid = true

    const validate = (propertyName: keyof Config) => {
        if (!config[propertyName] || typeof config[propertyName] !== 'string') {
            isValid = false
            console.error(`Property "${propertyName}" is not configured in "${configFilename}" config file`)
        }
    }

    validate('themeValuesPath')
    validate('themeGroupsPath')
    validate('themeComponentsPath')
    validate('themeVariantsPath')
    validate('themeOutputPath')

    if (isValid) {
        return config as Required<Config>
    }
    
    return false
}