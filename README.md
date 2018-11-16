# miniprogram-img
the miniprogram image component 

* [x] 缩略图加载
* [x] 自动重试
* [x] 错误处理
* [x] 成功通知

## install

```
npm i miniprogram-image -S
```

```json
{
  "usingComponents": {
    "img": "miniprogram-image"
  }
}
```

## usage

```html
<img
    src="大图.jpg"
    data-thumb="缩略图或者本地默认图片.jpg"
    data-retry="{{1}}"
    mode="scaleToFill"
    lazy-load="{{false}}"
    bind:fail="onFail"
    bind:update="onUpdate"
/>
```
