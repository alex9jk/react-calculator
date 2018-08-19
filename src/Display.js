import React, { Component } from 'react'

class Display extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div id ="display">
                {this.props.currentVal}
            </div>
        )
    }
}

export default Display