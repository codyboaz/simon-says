import React from 'react'

export default class PatternPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'white',
      patternNumber: 0
    }
    this.showPattern = this.showPattern.bind(this)
  }
  componentDidUpdate(prevProps) {
    if (this.props.pattern.length) {
      if (JSON.stringify(prevProps.pattern) !== JSON.stringify(this.props.pattern)) {
        this.setState({
          patternNumber: 0
        })
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
      this.setState((prevState) => {
        return {
          backgroundColor,
          patternNumber: prevState.patternNumber === this.props.pattern.length ? '' : prevState.patternNumber + 1
        }
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
      >
        <div className='pattern-count'>
          {this.state.patternNumber === 0 ? null : this.state.patternNumber}
        </div>
      </div>
    )
  }
}