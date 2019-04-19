import { define, WeElement, classNames } from 'omi'
import css from './_index.css'
import '../button'
import '../icon'

define('o-popover', class extends WeElement {
  css() {
    return css
  }

  static defaultProps = {
    x: 0,
    y: 0
  }

  close = () => {
    this.props.onClose && this.props.onClose()
  }

  confirm = () => {
    this.props.onConfirm && this.props.onConfirm()
  }

  left = 0
  top = 0

  bodyClickHandler = () => {
    this.props.onClose && this.props.onClose()
  }
  
  uninstall() {
    document.body.removeEventListener('mousedown', this.bodyClickHandler)
  }

  mouseDownHandler = (evt) => {
    evt.stopPropagation()
  }

  updated() {
    this._setPosition()
  }

  installed() {
    document.body.addEventListener('mousedown', this.bodyClickHandler)
    this._setPosition()
  }

  _setPosition() {
    if (this.props.show) {
      const rectA = this.base.getBoundingClientRect()
      const rectB = this.props.target.getBoundingClientRect()

      let tempLeft, tempTop
      let st = document.documentElement.scrollTop || document.body.scrollTop


      switch (this.props.direction) {
        case 'top-left':
          tempLeft = rectB.left
          tempTop = (rectB.top - rectA.height - 10)
          break
        case 'top':
          tempLeft = rectB.left + (rectB.width / 2 - rectA.width / 2)
          tempTop = (rectB.top - rectA.height - 10)
          break
        case 'top-right':
          tempLeft = rectB.left + rectB.width - rectA.width
          tempTop = (rectB.top - rectA.height - 10)
          break

        case 'left':
          tempLeft = rectB.left - rectA.width - 10
          tempTop = rectB.top + (rectB.height - rectA.height) / 2
          break
        case 'left-top':
          tempLeft = rectB.left - rectA.width - 10
          tempTop = rectB.top
          break

        case 'left-bottom':
          tempLeft = rectB.left - rectA.width - 10
          tempTop = rectB.top + (rectB.height - rectA.height)
          break

        case 'bottom-left':
          tempLeft = rectB.left
          tempTop = (rectB.top + rectB.height + 10)
          break
        case 'bottom':
          tempLeft = rectB.left + (rectB.width / 2 - rectA.width / 2)
          tempTop = (rectB.top + rectB.height + 10)
          break
        case 'bottom-right':
          tempLeft = rectB.left + rectB.width - rectA.width
          tempTop = (rectB.top + rectB.height + 10)
          break


        case 'right':
          tempLeft = rectB.left + rectB.width + 10
          tempTop = rectB.top + (rectB.height - rectA.height) / 2
          break
        case 'right-top':
          tempLeft = rectB.left + rectB.width + 10
          tempTop = rectB.top
          break

        case 'right-bottom':
          tempLeft = rectB.left + rectB.width + 10
          tempTop = rectB.top + (rectB.height - rectA.height)
          break
      }

      tempLeft = tempLeft + this.props.x + 'px'
      tempTop = tempTop + this.props.y + st + 'px'

      if (this.left !== tempLeft || this.top !== tempTop) {
        this.left = tempLeft
        this.top = tempTop
        this.update()
      }

    }
  }

  render(props) {
    if (!props.show) return

    const cls = classNames('_arrow', '_' + props.direction)
    const { style, ...other } = props
    return (
      <div class="o-popover" onMouseDown={this.mouseDownHandler} style={{ left: this.left, top: this.top, ...style }}  {...other}>
        <div class={cls}></div>
        <div class="o-inner">
          {props.children}
        </div>
      </div>

    )
  }
})
