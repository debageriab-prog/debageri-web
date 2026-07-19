# Design Language

## Keywords

- Scandinavian
- Premium
- Minimal
- Warm
- Technical
- Trustworthy
- Friendly

## Avoid

- Bright gradients
- Generic SaaS look
- Stock photos
- Dark corporate themes
- Excessive animations

## Palette

| Role | Value |
|------|-------|
| Background | `#F7F2EA` |
| Primary text | `#3D3027` |
| Accent (warm brown) | `#9a7a63` |
| Card surface | `#fdfaf6` |
| Borders | `#e8d8c8` (very subtle) |

## Typography

- **Typeface:** Inter (variable)
- **Headings:** Large, semibold (600), tight tracking (`tracking-tight`)
- **Body:** 16–18px, `leading-relaxed`, medium brown (`#7a5e4a`)
- **Section labels:** 11–12px, uppercase, wide letter-spacing, tan (`#9a7a63`)

## Spacing

- Section vertical padding: `py-20 md:py-28` (80–112px)
- Max content width: `max-w-4xl` (896px)
- Horizontal page padding: `px-6`
- Card inner padding: `p-6` to `p-8`

## Components

### Buttons

```
Primary:   bg-[#3D3027] text-[#F7F2EA]  hover:bg-[#5a4535]  rounded-full
Secondary: border border-[#c4a98e]       hover:bg-[#e8d8c8]  rounded-full
Inverse:   bg-[#F7F2EA] text-[#3D3027]  hover:bg-[#e8d8c8]  rounded-full  (on dark bg)
```

### Cards

```
bg-[#fdfaf6] border border-[#e8d8c8] rounded-2xl
```

### Section labels (eyebrows)

```
text-xs font-medium tracking-widest text-[#9a7a63] uppercase
```

### Dividers

```
h-px bg-[#e8d8c8]
```

## Dark sections

When a section uses a dark background (`bg-[#3D3027]`):
- Headings: `text-[#F7F2EA]`
- Body text: `text-[#c4a98e]`
- Buttons: inverse (light background, dark text)

## Personality

Imagine if Apple, Linear and a Swedish coffee shop designed an engineering consultancy.

Clean, spacious, warm — not cold, not loud.
