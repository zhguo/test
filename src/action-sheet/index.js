import { define, WeElement, classNames } from 'omi'
import css from './_index.css'

define('o-action-sheet', class extends WeElement {
  static defaultProps = {
    type: '',
    menus: [],
    actions: [],
    show: false
  }

  css() {
    return css
  }

  renderMenuItem() {
    return this.props.menus.map((menu, idx) => {
      const { label, className, ...others } = menu
      const cls = classNames({
        'weui-actionsheet__cell': true,
        [className]: className
      })

      return (
        <div key={idx} {...others} className={cls}>
          {label}
        </div>
      )
    })
  }

  renderActions() {
    return this.props.actions.map((action, idx) => {
      const { label, className, ...others } = action
      const cls = classNames({
        'weui-actionsheet__cell': true,
        [className]: className
      })

      return (
        <div key={idx} {...others} className={cls}>
          {label}
        </div>
      )
    })
  }

  handleMaskClick = e => {
    if (this.props.onClose) this.props.onClose(e)
  }

  render() {
    const { show, type, onClose, menus, actions, ...others } = this.props
    const cls = classNames({
      'weui-actionsheet': true,
      'weui-actionsheet_toggle': show
    })

    let styleType = type ? type : 'ios'

    return (
      <div className={styleType === 'android' ? 'weui-skin_android' : ''}>
        <div
          class="mask"
          style={{ display: show ? 'block' : 'none' }}
          onClick={this.handleMaskClick}
        />
        <div className={cls} {...others}>
          <div className="weui-actionsheet__menu">{this.renderMenuItem()}</div>
          <div className="weui-actionsheet__action">{this.renderActions()}</div>
        </div>
      </div>
    )
  }
})
