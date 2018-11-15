/**
 * 全局配置
 */
export const config = {

  /**
  * onError event
  * @type Function
  */
  onError: console.error,

  /**
  * onLoad event
  * @type Function
  */
  onLoad: console.log,

  /**
  * @type number
  */
  retry: 1,
}

Component({
  properties: {
    src: {
      type: String,
      observer(newVal, oldVal) {
        if (oldVal !== newVal) {
          this._updateAsync({ imgSrc: newVal })
        }
      }
    },
    mode: {
      type: String,
      observer(newVal, oldVal) {
        if (oldVal !== newVal) {
          this._updateAsync({ imgMode: newVal })
        }
      }
    },
    lazyLoad: {
      type: Boolean,
      value: false,
      observer(newVal) {
        // 不能直接判断是否相等
        this._updateAsync({ lazy: newVal })
      }
    }
  },
  data: {
    imgThumb: '',
    imgSrc: '',
    imgMode: '',
    lazy: false,
    imgLoaded: false,
  },

  lifetimes: {
    attached() {
      this.setData({ imgThumb: this.dataset.thumb })
      if (this.dataset.retry === undefined) {
        this.dataset.retry = config.retry
      }
    }
  },
  methods: {
    /**
     * 图片加载成功
     * @param {*} e
     */
    onImageLoad(e) {
      const type = e.currentTarget.dataset.type
      const url = type === 'data' ? this.data.imgSrc : this.data.imgThumb
      if (type === 'data') {
        this._updateAsync({ imgLoaded: true })
      }
      this.triggerEvent('update', {
        type: 'data',
        src: this.data.imgSrc
      })
      config.onLoad && config.onLoad(e, url)
    },

    /**
     * 图片加载出错
     * @param {*} e
     */
    onImageError(e) {
      if (e.currentTarget.dataset.type === 'thumb') {
        config.onError && config.onError(e, this.data.imgThumb)
      } else {
        const url = this.data.imgSrc
        config.onError && config.onError(e, url)
        if (this.dataset.retry > 0) {
          this.setData({ imgSrc: url + ' ' })
          --this.dataset.retry
        } else {
          this.triggerEvent('fail', this.data.imgSrc)
        }
      }
    },

    /**
    * 异步更新数据
    * @param {object} data
    */
    _updateAsync(data) {
      wx.nextTick(() => {
        this.setData(data)
      })
    }
  },
})