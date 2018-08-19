import React, { Component } from 'react'

class Button extends Component {
    render() {
        return (
            <div className={this.props.className} id={this.props.val} onClick={this.props.buttonClicked}>
                {this.props.display}
            </div>
        )
    }
}
export default Button