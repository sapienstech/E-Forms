# Manifest - Design

## Transformation

Find the `group.factType` array of the `asset` with type `FLOW`; all others are ignored.

    - modelMapping - > id
    - name - > description
    - dataType - > type
    - validValues - > oneOf
    - isList - > { type: 'array' }
    - isPersistent: false - > Fact Type Ignored
