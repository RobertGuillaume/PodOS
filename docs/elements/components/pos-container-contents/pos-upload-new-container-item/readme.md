
<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute | Description | Type           | Default     |
| ------------------------ | --------- | ----------- | -------------- | ----------- |
| `container` _(required)_ | --        |             | `LdpContainer` | `undefined` |


## Events

| Event                         | Description | Type                |
| ----------------------------- | ----------- | ------------------- |
| `pod-os:upload-dialog-closed` |             | `CustomEvent<void>` |


## Dependencies

### Used by

 - [pos-container-contents](..)

### Depends on

- [pos-upload](../../pos-upload)

### Graph
```mermaid
graph TD;
  pos-upload-new-container-item --> pos-upload
  pos-container-contents --> pos-upload-new-container-item
  style pos-upload-new-container-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
