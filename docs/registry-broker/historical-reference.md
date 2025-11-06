---
id: registry-broker-historical-reference
title: Historical Documentation Reference
description: Links to the original registry-broker documentation before reorganization
---

# Historical Documentation Reference

This document provides links to the original registry-broker documentation that was located in the hcs-improvement-proposals section before reorganization.

## Original Documentation Location

The comprehensive Registry Broker Client documentation was previously located at:
- **Original Path**: `/hcs-improvement-proposals/docs/libraries/standards-sdk/registry-broker-client.md`
- **New Location**: [`api/client.md`](api/client.md)

## Historical Context

Before this reorganization (November 2025), the registry-broker documentation was nested within the HCS improvement proposals section under the standards-sdk library documentation. This was part of a larger effort to organize and restructure the documentation for better discoverability and user experience.

## What Changed

### Before Reorganization
```
/hcs-improvement-proposals/docs/libraries/standards-sdk/registry-broker-client.md
```

### After Reorganization
```
/docs/registry-broker/
├── README.md (main index)
├── getting-started/
│   ├── quick-start.md
│   ├── installation.md
│   ├── first-registration.md
│   └── faq.md
├── architecture/
│   ├── overview.md
│   ├── core-concepts.md
│   └── protocols.md
├── api/
│   └── client.md (comprehensive API reference)
├── configuration/
│   └── configuration.md
├── configuration/
│   └── docker.md
└── examples/
    └── chat-demo.md
```

## Migration Notes

The content from the original comprehensive documentation has been reorganized into:

1. **Getting Started Section**: Quick start guide, installation, and first registration
2. **Architecture Section**: System overview, core concepts, and protocol support
3. **API Reference**: Complete API documentation with examples
4. **Configuration Guide**: Environment variables and configuration options
5. **Examples Section**: Practical implementation examples

## Backward Compatibility

- The original file remains in place for historical reference
- All links and references have been preserved where possible
- The content is still accessible via the original path

## Updated URLs

- **Old**: `/hcs-improvement-proposals/docs/libraries/standards-sdk/registry-broker-client.html`
- **New**: `/docs/registry-broker/api/client.html`

## Why This Change Was Made

The reorganization was driven by several factors:

1. **Discoverability**: Centralized registry-broker documentation makes it easier to find
2. **User Experience**: Logical grouping of related topics
3. **Scalability**: Better foundation for future documentation growth
4. **Maintenance**: Easier to update and maintain focused documentation sections

## Content Preservation

All content from the original documentation has been preserved and enhanced:
- No information was lost during migration
- Examples have been improved and expanded
- Cross-references have been updated
- Navigation has been enhanced

## Support

If you need to reference the original documentation structure or have questions about the migration:
- Original file: `/hcs-improvement-proposals/docs/libraries/standards-sdk/registry-broker-client.md`
- Current file: `/docs/registry-broker/README.md`
- Git History: Check the git log for the migration commit

---

*Note: This historical reference file documents the migration that occurred in November 2025. For current documentation, please refer to the dedicated registry-broker documentation section.*
