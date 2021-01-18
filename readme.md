# @i/theme

Theme tools and schemas for the Intouch Design System


### Architecture

##### `themeSpec`

The `themeSpec` object describes all available theme properties and their affected style properties. When updating the `customThemeProps`, you must also update the `themeSpec` accordingly. See the `themeSpec.colors` for an example.


##### `ThemeVariant` type

The `ThemeVariant['styles']` property is a dictionary where each key is a `StyleProperty` and each value is a `ThemeValue['id']`, a raw value (i.e. `"uppercase"`), or an array of either. This flexibility allows for `ThemeVariants` to contain styles such as `textTransform: "uppercase"` that don't make sense to store as a `ThemeValue`.