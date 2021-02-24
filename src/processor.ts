import { createUuid, randomHexColor, makeAvailableName, UUID_REGEX } from '@i/utility'
import { themeSpec, themeTypePropertyMap, componentVariantsPropertyMap } from './schema'
import type { Theme, ThemeValue, ThemeVariant, ThemeProperty, StyleProperty, SelectorProperty, ThemeStyleObject } from './schema'

export const getThemePropertyByStyleProperty = (styleProperty: StyleProperty): ThemeProperty | undefined => {
    const entry = Object.entries(themeSpec).find(([ , styleProperties ]) => 
        (styleProperties as unknown as string[]).includes(styleProperty))
    return entry ? entry[0] as ThemeProperty : undefined
}

const assignThemeValue = (
    object: { [key: string]: any },
    key: string,
    data: { id: string, name?: string, value: any },
) => {
    const { name, value, id } = data

    if (name) {
        if (object[key]) object[key][name] = value
        else object[key] = { [name]: value }
    }
    else {
        if (!Array.isArray(object[key])) throw new Error(`Cannot assign ThemeValue with id "${id}" to theme property "${key}", because the ThemeValue does not have a "name" property`)
        object[key].push(value)
    }
}

const sortThemeValuesAscending = (values: any[]) =>
    values.forEach((value) =>
        Array.isArray(value) && value.sort((a: any, b: any) => a - b))

const themeValueInitialDefaults = {
    breakpoint: () => ({ value: '60em' }),
    size: () => ({ value: '30px' }),
    space: () => ({ value: '16px' }),
    color: () => ({ value: randomHexColor(), name: 'New Color' }),
    font: () => ({ value: 'Georgia', family: 'Georgia', typeface: 'Georgia', name: 'Georgia' }),
    fontSize: () => ({ value: '1rem' }),
    fontWeight: () => ({ value: '600' }),
    lineHeight: () => ({ value: '1' }),
    letterSpacing: () => ({ value: '1px' }),
    border: () => ({ value: '1px solid black', name: 'New Border' }),
    borderStyle: () => ({ value: 'solid' }),
    borderWidth: () => ({ value: '1px' }),
    radius: () => ({ value: '8px' }),
    shadow: () => ({ value: '0px 1px 3px rgba(0, 0, 0, 10%)', name: 'New Shadow' }),
    zIndex: () => ({ value: '10' }),
}

const findThemeValueError = (
    valueId: string,
    styleProperty: string,
    variantName: string,
    variantType: string
) => new Error(`Could not find ThemeValue with id "${valueId}" for StyleProperty "${styleProperty}" in ThemeVariant "${variantName}" for variants type "${variantType}"`)

const findThemeValue = (
    styleValue: string | string[],
    values: ThemeValue[],
    styleProperty: string,
    variantName: string,
    variantType: string,
) => {
    if (typeof styleValue === 'string') {
        const themeValue = values.find((value) => value.id === styleValue)
        if (!themeValue && UUID_REGEX.test(styleValue)) throw findThemeValueError(styleValue, styleProperty, variantName, variantType)
        return themeValue ? themeValue.value : styleValue
    }
    else {
        return styleValue.map((string) => {
            const themeValue = values.find((value) => value.id === string)
            if (!themeValue && UUID_REGEX.test(string)) throw findThemeValueError(string, styleProperty, variantName, variantType)
            return themeValue ? themeValue.value : string
        })
    }
}

/**
 * @function themeProcessor
 * @description Converts ThemeValues and ThemeVariants into a Theme
 *      that can be used with `styled-components` `ThemeProvider`
 * @param {ThemeValue[]} values Array of ThemeValue objects
 * @param {ThemeVariant[]} variants Array of ThemeVariant objects
 */
export const themeProcessor = ({
    values,
    variants,
}: {
    values: ThemeValue[]
    variants: ThemeVariant[]
}): Theme => {
    const theme: Theme = {
        breakpoints: [],
        space: [ '0' ],
        colors: {},
        fonts: {},
        fontSizes: [ '0' ],
        fontWeights: [ '0' ],
        lineHeights: [ '0' ],
        letterSpacings: [ '0' ],
        borderWidths: [ '0' ],
        borderStyles: [ 'none', 'solid' ],
        borders: {},
        shadows: {},
        radii: [ '0' ],
        zIndices: [ '0' ],
        sizes: [ '0' ],

        buttons: {},
        texts: {},
        headings: {},
        links: {},
        icons: {},
        labels: {},
        inputs: {},
        radios: {},
        checkboxes: {},
        selects: {},
        sliders: {},
        toggles: {},
        textareas: {},
    }

    values.forEach((value) => assignThemeValue(theme, themeTypePropertyMap[value.type], value))

    Object.values(theme).forEach(property => property && sortThemeValuesAscending(Object.values(property)))

    if (variants) {
        variants.forEach(({ variantType, name: variantName, styles }) => {
            let themeTargetReference = theme[componentVariantsPropertyMap[variantType]]!

            Object.entries(styles).forEach(([ styleProperty, styleValue ]) => {
                if (!styleValue) return
                let value: string | string[] | ThemeStyleObject = ''

                if (typeof styleValue === 'string' || Array.isArray(styleValue)) {
                    value = findThemeValue(styleValue, values, styleProperty, variantName, variantType)
                }
                else if (typeof styleValue === 'object') {
                    value = {}
                    Object.entries(styleValue).forEach(([ styleProperty, styleValue ]) => {
                        (value as ThemeStyleObject)[styleProperty as StyleProperty] = findThemeValue(styleValue!, values, styleProperty, variantName, variantType)
                    })
                }

                assignThemeValue(
                    themeTargetReference,
                    variantName,
                    { id: 'VARIANT_STYLE', name: styleProperty, value },
                )
            })
        })
    }

    return theme as Theme
}

/**
 * @function createThemeValue
 * @description Creates a new ThemeValue of the given type. Ensures the created
 *      ThemeValue has a unique name amongst its type if it has a name.
 * @param {ThemeValue[]} themeValues Array of ThemeValue objects
 * @param {ThemeValue['type']} type ThemeValue type to create
 * @param {Partial<ThemeValue>} props ThemeValue props to use
 */
export const createThemeValue = <T extends ThemeValue['type']>(
    themeValues: ThemeValue[],
    type: T,
    props: Partial<ThemeValue & { type: T }> = {},
): ThemeValue & { type: T } => {
    const newValue = {
        id: props.id || createUuid(),
        ...themeValueInitialDefaults[type](),
        ...props,
        type,
    } as ThemeValue & { type: T }

    if (newValue.hasOwnProperty('name')) {
        let unavailableNames: string[] = []

        // Get unavailable names from ThemeValues of the same type or group
        themeValues.forEach((value) => {
            if (value.type === type && value.hasOwnProperty('name')) {
                unavailableNames.push((value as any).name)
            }
        });

        (newValue as any).name = makeAvailableName((newValue as any).name, unavailableNames)
    }

    return newValue
}

/**
 * @function createThemeVariant
 * @description Creates a new ThemeVariant of the given variantType. Ensures the
 *      created ThemeVariant has a unique name amongst other ThemeVariants of
 *      its variantType.
 * @param {ThemeVariant[]} themeVariants Array of ThemeVariant objects
 * @param {ThemeVariant['variantType']} type ThemeVariant type to create
 * @param {Partial<ThemeVariant>} props ThemeVariant props to use
 */
export const createThemeVariant = <T extends ThemeVariant['variantType']>(
    themeVariants: ThemeVariant[],
    variantType: T,
    props: Partial<ThemeVariant> = {},
): ThemeVariant => {
    const newVariant = {
        type: 'variant' as const,
        id: props.id || createUuid(),
        variantType,
        name: props.name || 'New Variant',
        styles: props.styles || {},
    }

    let unavailableNames: string[] = []
    themeVariants.forEach((variant) => {
        if (variant.variantType === variantType) {
            unavailableNames.push(variant.name)
        }
    })

    newVariant.name = makeAvailableName(newVariant.name, unavailableNames)

    return newVariant
}