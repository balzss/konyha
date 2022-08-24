---
sidebar_position: 3
---

# Data hooks

## Reading and modifying data

The graphql code generator creates data hooks that can be used directly however they are "proxied" in
`dataHooks/index.ts`. Any pre- or postprocessing of data is done here.
