# @i/theme

Theme tools and schemas for the Intouch Design System


### Architecture

##### `themeSpec`

The `themeSpec` object describes all available theme properties and their affected style properties. When updating the `customThemeProps`, you must also update the `themeSpec` accordingly. See the `themeSpec.colors` for an example.


##### `componentNames`, `customThemeProps`, and `processorThemeProps`

When adding new components which will inherit default styles from the `themeSpec`, you must update the `componentNames` array.

Any new theme properties which will be consumed by the `ThemeProvider` at runtime should be added to the `customThemeProps` object with their affected style properties. You must also update the `themeSpec` accordingly. Examples include `hoverColor` and `activeBorderColor` under the `colors` theme prop.

Any new theme properties which will not be consumed by the `ThemeProvider` at runtime should be added to the `preProcessCustomThemeProps` array. Use this when adding theme properties that will be consumed by the `themeProcessor` only. Examples include the `components` theme prop.