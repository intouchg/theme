import { createUuid, randomHexColor, makeAvailableName } from '@i/utility'
import { themeSpec, themeTypePropertyMap } from './themeSpec'
import type { Theme, ThemeValue, ThemeComponent, ThemeGroup, ThemeProperty, StyleProperty } from './themeSpec'

export const getThemePropertyByStyleProperty = (styleProperty: StyleProperty): ThemeProperty | undefined => {
    const entry = Object.entries(themeSpec).find(([ themeProperty, styleProperties ]) => 
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
        if (object[key] && !Array.isArray(object[key])) throw new Error(`Cannot assign ThemeValue with id "${id}" to theme property "${key}", because the ThemeValue does not have a "name" property`)
        if (object[key]) object[key].push(value)
        else object[key] = [ value ]
    }
}

const sortAscending = (values: any[]) =>
    values.forEach((value) =>
        Array.isArray(value) && value.sort((a: any, b: any) => a - b))

/**
 * @function themeProcessor
 * @description Converts ThemeValues, ThemeGroups, and ThemeComponents into a
 *      Theme, to be used with `styled-components` `ThemeProvider`
 * @param {ThemeValue[]} themeValues Array of ThemeValue objects
 * @param {ThemeGroup[]} themeGroups Array of ThemeGroup objects
 * @param {ThemeComponent[]} themeComponents Array of ThemeComponent objects
 */
export const themeProcessor = ({
    values,
    groups,
    components,
}: {
    values: ThemeValue[]
    groups: ThemeGroup[]
    components: ThemeComponent[]
}): Theme => {
    if (!values || values.length === 0) throw new Error(`ThemeValues were not passed to the themeProcessor`)

    const theme = {} as Partial<Theme>

    if (groups) {
        groups.forEach(({ groupType, name, members, id: groupId }) => {
            const themeProperty = themeTypePropertyMap[groupType]
            members.forEach((id) => {
                const member = values.find((value) => value.id === id)
                if (!member) throw new Error(`Could not find ThemeValue with id "${id}" for ThemeGroup "${groupType}.${name}" with id ${groupId}`)
                assignThemeValue(theme, themeProperty, member)
            })
        })
    }

    values.forEach((value) => {
        const themeProperty = themeTypePropertyMap[value.type]
        assignThemeValue(theme, themeProperty, value)
    })

    Object.values(theme).forEach(property => property && sortAscending(Object.values(property)))

    if (components) {
        components.forEach(({ name, styles }) => {
            Object.entries(styles).forEach(([ styleProperty, themeValueId ]) => {
                if (themeValueId === "") return
                const themeProperty = getThemePropertyByStyleProperty(styleProperty as StyleProperty)
                if (!themeProperty) throw new Error(`Could not find matching ThemeProperty for StyleProperty "${styleProperty}" in ThemeComponent "${name}"`)
                const themeValue = values.find((value) => value.id === themeValueId)
                if (!themeValue) throw new Error(`Could not find ThemeValue with id "${themeValueId}" for StyleProperty "${styleProperty}" in ThemeComponent "${name}"`)
                if (!theme[themeProperty]) theme[themeProperty] = {} as any
                assignThemeValue(theme[themeProperty]!, name, { id: 'COMPONENT_STYLE', name: styleProperty, value: themeValue.value })
            })
        })
    }

    return theme as Theme
}

const THEME_VALUE_INITIAL_DEFAULTS = {
    breakpoint: () => ({ value: '60em' }),
    size: () => ({ value: '60px', name: 'New Size' }),
    space: () => ({ value: 32 }),
    color: () => ({ value: randomHexColor(), name: 'New Color', groups: [] }),
    font: () => ({ value: 'Times', name: 'New Font' }),
    fontSize: () => ({ value: 24 }),
    fontWeight: () => ({ value: 600, name: 'New Font Weight' }),
    lineHeight: () => ({ value: 1 }),
    letterSpacing: () => ({ value: 0 }),
    border: () => ({ value: '2px solid black', name: 'New Border' }),
    borderStyle: () => ({ value: 'solid', name: 'New Border Style' }),
    borderWidth: () => ({ value: '2px', name: 'New Border Width' }),
    radius: () => ({ value: '8px', name: 'New Radius' }),
    shadow: () => ({ value: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)', name: 'New Shadow' }),
    zIndex: () => ({ value: 10 }),
    grid: () => ({ value: '', name: 'New Grid' }),
}

/**
 * @function createThemeValue
 * @description Creates a new ThemeValue of the given type. Ensures the created
 *      ThemeValue has a unique name amongst its type if it has a name, or a
 *      unique name amongst its ThemeGroup if it has a name and a group.
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
        ...THEME_VALUE_INITIAL_DEFAULTS[type](),
        ...props,
        type,
    } as ThemeValue & { type: T }

    if (newValue.hasOwnProperty('name')) {
        const groups: string[] = newValue.hasOwnProperty('groups') ? (newValue as any).groups : []
        const hasGroups = groups.length > 0
        let unavailableNames: string[] = []

        // Get unavailable names from ThemeValues of the same type or group
        themeValues.forEach((value) => {
            if (value.type === type && value.hasOwnProperty('name')) {
                if (!hasGroups) {
                    unavailableNames.push((value as any).name)
                }
                else if (
                    hasGroups
                    && value.hasOwnProperty('groups')
                    && (value as any).groups.some((id: string) => (newValue as any).groups.includes(id))
                ) {
                    unavailableNames.push((value as any).name)
                }
            }
        });

        (newValue as any).name = makeAvailableName((newValue as any).name, unavailableNames)
    }

    return newValue
}

/**
 * @function createThemeGroup
 * @description Creates a new ThemeGroup of the given groupType. Ensures the
 *      created ThemeGroup has a unique name amongst other ThemeGroups of
 *      its groupType.
 * @param {ThemeGroup[]} themeGroups Array of ThemeGroup objects
 * @param {ThemeGroup['groupType']} type ThemeGroup type to create
 * @param {Partial<ThemeGroup>} props ThemeGroup props to use
 */
export const createThemeGroup = <T extends ThemeGroup['groupType']>(
    themeGroups: ThemeGroup[],
    groupType: T,
    props: Partial<ThemeGroup> = {},
): ThemeGroup => {
    const newGroup = {
        type: 'group' as const,
        id: props.id || createUuid(),
        groupType,
        name: props.name || 'New Group',
        members: props.members || [],
    }

    let unavailableNames: string[] = []
    themeGroups.forEach((group) => {
        if (group.groupType === groupType) {
            unavailableNames.push(group.name)
        }
    })

    newGroup.name = makeAvailableName(newGroup.name, unavailableNames)

    return newGroup
}