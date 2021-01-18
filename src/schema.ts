/**
 * @string defaultVariantName
 * @description The name of the default variant that will be applied
 *      to every content component in `@i/components` via defaultProps.
 */
export const defaultVariantName = 'Primary'

/**
 * @object componentNames
 * @description The names of every `@i/components` component that can
 *      use ThemeVariants styles from the theme.
 */
export const componentNames = [
    'button', 'text', 'heading', 'label', 'link', 'icon', 'input',
] as const

/**
 * @object customThemeProps
 * @description The keys of this object are theme property names, and the 
 *      value assigned to each key is an array of custom style property 
 *      names. Each custom style property can be applied to `@i/components`,
 *      and can access the values from the corresponding theme property.
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
 * @description This object represents all possible theme property names, 
 *      and their corresponding style property names. Values from 
 *      `customThemeProps` need to be added to this object as well.
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
        'gridGap', 'gridColumnGap', 'gridRowGap',
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
 *      to theme property names from (keyof Theme).
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
} as const

/**
 * @object componentVariantsPropertyMap
 * @description This object maps string literal types from componentNames[number]
 *      to theme variant property names.
 */
export const componentVariantsPropertyMap = {
    button: 'buttons',
    text: 'texts',
    heading: 'headings',
    label: 'labels',
    link: 'links',
    icon: 'icons',
    input: 'inputs',
} as const

type ComponentVariantProperty = typeof componentVariantsPropertyMap[keyof typeof componentVariantsPropertyMap]

export type ThemeProperty = keyof typeof themeSpec
export type StyleProperty = typeof themeSpec[keyof typeof themeSpec][number]

export type ThemeBreakpoint = {
    type: 'breakpoint'
    id: string
    value: string
}

export type ThemeSize = {
    type: 'size'
    id: string
    value: string
    name: string
}

export type ThemeSpace = {
    type: 'space'
    id: string
    value: string
}

export type ThemeColor = {
    type: 'color'
    id: string
    value: string
    name: string
}

export type ThemeFont = {
    type: 'font'
    id: string
    value: string
    name: string
    family: string
    typeface: string
}

export type ThemeFontSize = {
    type: 'fontSize'
    id: string
    value: string
}

export type ThemeFontWeight = {
    type: 'fontWeight'
    id: string
    value: string
    name: string
}

export type ThemeLineHeight = {
    type: 'lineHeight'
    id: string
    value: string
}

export type ThemeLetterSpacing = {
    type: 'letterSpacing'
    id: string
    value: string
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
    value: string
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
    value: string
}

export type ThemeValueObject =
    | ThemeSize
    | ThemeColor
    | ThemeFont
    | ThemeFontWeight
    | ThemeBorder
    | ThemeBorderStyle
    | ThemeBorderWidth
    | ThemeRadius
    | ThemeShadow

export type ThemeValueArray =
    | ThemeBreakpoint
    | ThemeSpace
    | ThemeFontSize
    | ThemeLineHeight
    | ThemeLetterSpacing
    | ThemeZIndex

export type ThemeValue = ThemeValueObject | ThemeValueArray

export type ThemeVariant = {
    type: 'variant'
    id: string
    variantType: keyof typeof componentVariantsPropertyMap
    name: string
    styles: {
        [key in StyleProperty]?: ThemeValue['id'] | ThemeValue['id'][]
    }
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
    borders: { [key in ThemeBorder['name']]: ThemeBorder['value'] }
    borderWidths: { [key in ThemeBorderWidth['name']]: ThemeBorderWidth['value'] }
    borderStyles: { [key in ThemeBorderStyle['name']]: ThemeBorderStyle['value'] }
    radii: { [key in ThemeRadius['name']]: ThemeRadius['value'] }
    shadows: { [key in ThemeShadow['name']]: ThemeShadow['value'] }
    zIndices: ThemeZIndex['value'][]
} & {
    [key in ComponentVariantProperty]: {
        // Here, the value of each key is not an id, but an actual CSS value
        [key in StyleProperty]: string | string[]
    }
}