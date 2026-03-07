# pos-upload

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute | Description              | Type                                                                           | Default       |
| ---------- | --------- | ------------------------ | ------------------------------------------------------------------------------ | ------------- |
| `accept`   | --        | The accepted file types. | `string[]`                                                                     | `['image/*']` |
| `uploader` | --        |                          | `(file: File) => ResultAsync<{ url: string; }, HttpProblem \| NetworkProblem>` | `undefined`   |


## Dependencies

### Used by

 - [pos-picture](../pos-picture)
 - [pos-tool-attachments](../../tools/pos-tool-attachments)
 - [pos-upload-new-container-item](../pos-container-contents/pos-upload-new-container-item)

### Graph
```mermaid
graph TD;
  pos-picture --> pos-upload
  pos-tool-attachments --> pos-upload
  pos-upload-new-container-item --> pos-upload
  style pos-upload fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
