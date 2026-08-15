export interface MegaMenuLink {
  label:        string
  href:         string
  description?: string
}

export interface MegaMenuColumn {
  heading?: string
  links:    MegaMenuLink[]
}

export interface MegaMenuFeatured {
  eyebrow?: string
  title:    string
  excerpt?: string
  href:     string
  cta?:     string
}

export interface MegaMenuConfig {
  columns:   MegaMenuColumn[]
  featured?: MegaMenuFeatured
  cta?:      { label: string; href: string }
}

export interface NavItemConfig {
  label:     string
  /** href makes this a plain link; omit for trigger-only items */
  href?:     string
  megaMenu?: MegaMenuConfig
}
