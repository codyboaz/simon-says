import React from 'react'

export default class PatternPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'white'
    }
    this.showPattern = this.showPattern.bind(this)
  }
  componentDidUpdate(prevProps) {
    if (this.props.pattern.length) {
      if (JSON.stringify(prevProps.pattern) !== JSON.stringify(this.props.pattern)) {
        this.showPattern()
      }
    }
  }
  showPattern() {
    let index = 0
    this.timeout = setInterval(() => {
      if (index === this.props.pattern.length) {
        clearInterval(this.timeout)
      }
      const backgroundColor = index === this.props.pattern.length ? 'white' : this.props.colors[this.props.pattern[index]].color
      this.setState({
        backgroundColor
      })
      index++
    }, 1000)
  }
  render() {
    return (
      <div
        className='pattern-box'
        style={{
          background: this.state.backgroundColor
        }}
      ></div>
    )
  }
}
