# Assets — Media & Resources

This folder stores all visual and media assets for the Coachella Computer Aid project.

## 📁 Organization

```
06-Assets/
├── Illustrations/
│   ├── Characters/          (Robert, Maria, Ana, David, Helen, Carlos)
│   ├── Heroes/              (10 large hero images)
│   ├── Services/            (40 service-related illustrations)
│   ├── Community/           (25 community & workshop scenes)
│   ├── Devices/             (30 device illustrations)
│   └── Marketing/           (30 social & marketing graphics)
├── Icons/
│   ├── UI/                  (Navigation, actions, feedback)
│   ├── Services/            (Stay Connected, Stay Safe, etc.)
│   └── Social/              (Facebook, YouTube, etc.)
├── Backgrounds/
│   ├── Scenes/              (Mountains, locations, interiors)
│   └── Patterns/            (Decorative patterns)
└── Brand/
    ├── Logo/                (Logo files in various formats)
    ├── Colors/              (Color swatches)
    └── Templates/           (Email, social, flyers)
```

## 📚 Asset Documentation

Before adding any illustrations or assets, review:
- [[../04-Visual-System/Illustration-Strategy.md|Illustration Strategy]] — Philosophy and approach
- [[Illustration-Catalog.md|Illustration Catalog]] — Complete specifications by section
- [[../04-Visual-System/Character-Placement-Guide.md|Character Placement Guide]] — How to use characters
- [[Icon-Specifications.md|Icon Specifications]] — Icon design requirements
- [[Background-Assets.md|Background Assets]] — Background specifications
- [[Architecture-Reference.md|Architecture Reference]] — Actual `src/` folder structure and where assets land in code
- [[../01-Project-Foundation/Brand-Bible.md|Brand Bible]] — Brand colors and identity

### File Format
- **SVG:** Preferred (scalable, animatable)
- **WebP:** For complex illustrations
- **PNG:** Fallback with transparency
- **JPG:** Photographs only

### Naming Convention
```
[category]-[description]-[version].ext

Examples:
- character-robert-happy-v1.svg
- hero-video-call-v2.webp
- service-stayconcected-v1.svg
- background-senior-center-v1.webp
```

### File Size
- **SVG:** < 50KB
- **WebP:** < 200KB
- **Optimize:** Use TinyPNG, imagemin, or similar

## 🏷️ Icons

### Icon Set
- ~150 icons total
- Consistent stroke weight
- 24px base size
- Available in: SVG, font format

### Usage
- UI buttons and navigation
- Service descriptions
- Feature callouts
- Social media links

### Color
- Primary: Warm Orange (#F4A259)
- Secondary: Charcoal (#343434)
- Accent: Sky Blue (#78B8D9)
- Alternate: Sage Green (#8BAE7B)

## 🖼️ Backgrounds

### Collection
- San Jacinto Mountains (multiple variations)
- Community locations
- Interior spaces
- Seasonal variations

### Usage
- Hero sections
- Section backgrounds
- Promotional materials
- Email templates

### Properties
- High resolution (2x or 3x for retina)
- Optimized for web
- Subtle, not distracting

## 📋 Asset Checklist

Before using any asset in the website:
- [ ] Follows brand guidelines ([[../01-Project-Foundation/Brand-Bible.md|Brand Bible]])
- [ ] Uses only brand colors
- [ ] Consistent style with other assets
- [ ] Optimized for web (size, format)
- [ ] Tested on mobile and desktop
- [ ] Alt text written (for images)
- [ ] Accessible (meets WCAG AA)
- [ ] Licensed for use (if external)

## 🔐 Storage & Access

### Local Storage
- Assets stored in this `06-Assets/` folder
- Synced to GitHub (with git-lfs for large files)
- Backed up to cloud storage

### Web Access
- Illustrations embedded in website
- Icons used in code
- Backgrounds referenced in CSS/HTML
- CDN served from Vercel/Netlify

## 🎨 Creating New Assets

### Before You Start
1. Check existing assets — don't duplicate
2. Review guidelines for the type:
   - [[../04-Visual-System/Illustration-Strategy.md|Illustrations]]
   - [[../04-Visual-System/Character-Placement-Guide.md|Characters]]
   - [[Icon-Specifications.md|Icons]]
   - [[Background-Assets.md|Backgrounds]]
3. Get approval on design/concept
4. Create in appropriate software (Figma, Adobe, etc.)

### After Creation
1. Export in correct formats (SVG, WebP, PNG as needed)
2. Optimize file size
3. Name according to convention
4. Add to appropriate folder
5. Document in related spec file
6. Get reviewed before using on website

## 📞 Questions?

For questions about asset creation, usage, or organization:
- Check the style guide: [[../04-Visual-System/Illustration-Strategy.md|Illustration Strategy]]
- Review existing assets for examples
- Ask the design lead or project manager

---

**Status:** Asset Repository  
**Total Assets:** 300+ (in progress)  
**Related Sections:** [[../04-Visual-System/|Visual System]] | [[../03-Website-Design/Design-Language.md|Design Language]]
