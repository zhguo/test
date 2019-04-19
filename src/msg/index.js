import { define, WeElement, extractClass } from 'omi'
import style from './_index.css'
import '../icon'
import '../button'

define('o-msg', class extends WeElement {
  close() {
    this.props.close()
  }

  confirm() {
    this.props.confirm()
  }

  css() {
    return style
  }

  render(props) {
    const button = props.type === 'warn' ? 'warn' : 'primary'
    return (
      <div {...extractClass(props, 'o-msg')}>
        <o-icon
          type={props.type}
          scale={4}
          isFill
          color={props.type === 'warn' ? '#F95050' : '#07C160'}
        />
        <h2 class="title">{props.title}</h2>
        <p>{props.content}</p>
        <o-button type={button}>Ok</o-button>
        <o-button type="default">Cancel</o-button>
      </div>
    )
  }
})
