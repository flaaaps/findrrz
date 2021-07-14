declare namespace Intl {
    interface ListFormat {
        format: (items: [string?] | string[]) => string
    }
    var ListFormat: {
        new (locales?: string | string[], options?: DateTimeFormatOptions): ListFormat
        (locales?: string | string[], options?: DateTimeFormatOptions): ListFormat
    }
}
