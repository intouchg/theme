/**
 * @string IDSCONFIG_FILENAME
 * @description The name of the config file that should exist in the
 *      root of any project that uses the Intouch Design System. This
 *      file configures various settings for the Sketch plugin and the
 *      Webpack plugin (and possibly more).
 */
export const IDSCONFIG_FILENAME = '.idsconfig'

/**
 * @object componentNames
 * @description The names of every `@i/components` component that can
 *      use default styles from the theme.
 */
export const componentNames = [
    'button', 'text', 'heading', 'link', 'icon',
] as const

/**
 * @object customThemeProps
 * @description The keys of this object are theme properties, and the value
 *      assigned to each key is an array of custom style properties. Each
 *      custom style property can be applied to `@i/components`, and
 *      can access the values from the corresponding theme property.
 * @example
 * 
 * ```js
 * const theme = {
 *   colors: {
 *     red: '#FF0000',
 *   },
 * }
 * <Button hoverColor="red">
 * ```
 */
export const customThemeProps = {
    colors: [
        'hoverColor',
        'hoverBackgroundColor',
        'hoverBorderColor',
        'activeColor',
        'activeBackgroundColor',
        'activeBorderColor',
        'visitedColor',
        'visitedBackgroundColor',
        'visitedBorderColor',
        'fill',
    ],
} as const

/**
 * @object themeSpec
 * @description This object represents all possible theme properties, and
 *      their corresponding style properties. Values from `customThemeProps`
 *      need to be added to this object as well.
 */
export const themeSpec = {
    breakpoints: [],
    space: [
        'top', 'right', 'bottom', 'left',
        'margin', 'm',
        'marginTop', 'mt',
        'marginRight', 'mr',
        'marginBottom', 'mb',
        'marginLeft', 'ml',
        'marginX', 'mx',
        'marginY', 'my',
        'padding', 'p',
        'paddingTop', 'pt',
        'paddingRight', 'pr',
        'paddingBottom', 'pb',
        'paddingLeft', 'pl',
        'paddingX', 'px',
        'paddingY', 'py',
    ],
    fontSizes: [
        'fontSize',
    ],
    fonts: [
        'fontFamily',
    ],
    fontWeights: [
        'fontWeight',
    ],
    lineHeights: [
        'lineHeight',
    ],
    letterSpacings: [
        'letterSpacing',
    ],
    colors: [
        'color', 'bg', 'backgroundColor',
        'borderColor',
        'borderTopColor',
        'borderRightColor',
        'borderBottomColor',
        'borderLeftColor',
        ...customThemeProps.colors,
    ],
    sizes: [
        'width', 'height',
        'minWidth', 'minHeight',
        'maxWidth', 'maxHeight',
        'size',
    ],
    grid: [
        'gridGap', 'gridColumnGap', 'gridRowGap',
    ],
    borders: [
        'border',
        'borderTop',   
        'borderRight',   
        'borderBottom',   
        'borderLeft',   
        'borderX', 'borderY',
    ],
    borderWidths: [
        'borderWidth',
        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'borderLeftWidth',
    ],
    borderStyles: [
        'borderStyle',
        'borderTopStyle',
        'borderRightStyle',
        'borderBottomStyle',
        'borderLeftStyle',
    ],
    radii: [
        'borderRadius',
        'borderTopLeftRadius', 'borderTopRightRadius',
        'borderBottomLeftRadius', 'borderBottomRightRadius',
    ],
    shadows: [
        'textShadow', 'boxShadow',
    ],
    zIndices: [
        'zIndex', 
    ],
} as const

/**
 * @object themeTypePropertyMap
 * @description This object maps string literal types from ThemeValue['type']
 *      to theme properties from (keyof Theme).
 */
export const themeTypePropertyMap = {
    breakpoint: 'breakpoints',
    space: 'space',
    size: 'sizes',
    color: 'colors',
    font: 'fonts',
    fontSize: 'fontSizes',
    fontWeight: 'fontWeights',
    lineHeight: 'lineHeights',
    letterSpacing: 'letterSpacings',
    border: 'borders',
    borderStyle: 'borderStyles',
    borderWidth: 'borderWidths',
    radius: 'radii',
    shadow: 'shadows',
    zIndex: 'zIndices',
    grid: 'grid',
} as const

export type ThemeProperty = keyof typeof themeSpec
export type StyleProperty = typeof themeSpec[keyof typeof themeSpec][number]

export type ThemeBreakpoint = {
    type: 'breakpoint'
    id: string
    value: string | number
}

export type ThemeSize = {
    type: 'size'
    id: string
    value: string | number
    name: string
}

export type ThemeSpace = {
    type: 'space'
    id: string
    value: string | number
}

export type ThemeColor = {
    type: 'color'
    id: string
    value: string
    name: string
    groups: string[]
}

export type ThemeFont = {
    type: 'font'
    id: string
    value: string
    name: string
}

export type ThemeFontSize = {
    type: 'fontSize'
    id: string
    value: string | number
}

export type ThemeFontWeight = {
    type: 'fontWeight'
    id: string
    value: number
    name: string
}

export type ThemeLineHeight = {
    type: 'lineHeight'
    id: string
    value: string | number
}

export type ThemeLetterSpacing = {
    type: 'letterSpacing'
    id: string
    value: string | number
}

export type ThemeBorder = {
    type: 'border'
    id: string
    value: string
    name: string
}

export type ThemeBorderStyle = {
    type: 'borderStyle'
    id: string
    value: string
    name: string
}

export type ThemeBorderWidth = {
    type: 'borderWidth'
    id: string
    value: string | number
    name: string
}

export type ThemeRadius = {
    type: 'radius'
    id: string
    value: string
    name: string
}

export type ThemeShadow = {
    type: 'shadow'
    id: string
    name: string
    value: string
}

export type ThemeZIndex = {
    type: 'zIndex'
    id: string
    value: number
}

export type ThemeGrid = {
    type: 'grid'
    id: string
    value: string
    name: string
}

export type ThemeValueObject =
    ThemeSize
    | ThemeColor
    | ThemeFont
    | ThemeFontWeight
    | ThemeBorder
    | ThemeBorderStyle
    | ThemeBorderWidth
    | ThemeRadius
    | ThemeShadow
    | ThemeGrid

export type ThemeValueArray =
    ThemeBreakpoint
    | ThemeSpace
    | ThemeFontSize
    | ThemeLineHeight
    | ThemeLetterSpacing
    | ThemeZIndex

export type ThemeValue = ThemeValueObject | ThemeValueArray

export type ThemeGroup = {
    type: 'group'
    id: string
    groupType: ThemeValueObject['type']
    name: string
    members: string[]
}

export type ThemeComponent = {
    type: 'component'
    id: string
    name: typeof componentNames[number]
    styles: {
        [key in StyleProperty]?: string | number | (string | number)[]
    }
}

export type ThemeSnippet = {
    type: 'snippet'
    id: string
    name: string
    code: string
}

export type Theme = {
    breakpoints: ThemeBreakpoint['value'][] 
    space: ThemeSpace['value'][] 
    fonts: { [key in ThemeFont['name']]: ThemeFont['value'] }
    fontSizes: ThemeFontSize['value'][] 
    fontWeights: { [key in ThemeFontWeight['name']]: ThemeFontWeight['value'] }
    lineHeights: ThemeLineHeight['value'][] 
    letterSpacings: ThemeLetterSpacing['value'][] 
    colors: { [key in ThemeColor['name']]: ThemeColor['value'] | Theme['colors'] }
    sizes: { [key in ThemeSize['name']]: ThemeSize['value'] }
    grid: { [key in ThemeGrid['name']]: ThemeGrid['value'] }
    borders: { [key in ThemeBorder['name']]: ThemeBorder['value'] }
    borderWidths: { [key in ThemeBorderWidth['name']]: ThemeBorderWidth['value'] }
    borderStyles: { [key in ThemeBorderStyle['name']]: ThemeBorderStyle['value'] }
    radii: { [key in ThemeRadius['name']]: ThemeRadius['value'] }
    shadows: { [key in ThemeShadow['name']]: ThemeShadow['value'] }
    zIndices: ThemeZIndex['value'][]
}