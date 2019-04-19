## Popup  

弹出层。

## 使用

```js
<o-popup
  onClose={this.closePopup}
  onConfirm={this.onConfirm}
  show={this.popupShow}  
  title='My Title'
  cancelText='cancel'
  confirmText='confirm'
>
  <div>I am content</div>
  <div>I am content</div>
  <div>I am content</div>
  <div>I am content</div>
</o-popup>
```

## API

### Props

|  **Name**  | **Type**        | **Defaults**  | **Details**  |
| ------------- |:-------------:|:-----:|:-------------:|
| show  | bool |   --    |           |
| title  | string |   --    |           |
| width  | number |   --    |           |
| cancelText  | string |   --    |           |
| confirmText  | string |   --    |           |
| onClose  |function |    --   |           |
| onConfirm  | function |    --   |           |
| children  | vdom json array |    --   |           |