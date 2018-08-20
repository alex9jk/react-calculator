import React, { Component } from 'react'
import Display from './Display'
import Button from './Button'

const isOperator = /[x/+‑]/, endsWithOperator = /[x+‑/]$/
class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '0',
            prev: '0',
            evaluated: false,
            formula: '',
            currentSign: 'pos',
            lastClicked: ''
        }

        this.handleNums = this.handleNums.bind(this);
        this.handleOperators = this.handleOperators.bind(this);
        this.initialize = this.initialize.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.hover = this.hover.bind(this);
    }

    initialize() {
        this.setState({
            current: '0',
            prev: '0',
            formula: '',
            currentSign: 'pos',
            lastClicked: ''
        });
    }
    handleOperators(e) {
        if (this.state.formula.includes('=')) {
            this.setState({ formula: this.state.prev + e.target.id }); // comment 1
        }
        else {
            this.setState({ // comment 2
                prev: !isOperator.test(this.state.current) ? this.state.formula : this.state.prev,
                formula: !isOperator.test(this.state.current) ? this.state.formula += e.target.id : this.state.prev += e.target.id,
                current: e.target.id
            });
        }
    }
    handleNums(e) {
        this.setState({
            current: this.state.current == '0' || isOperator.test(this.state.current) ? e.target.id : this.state.current + e.target.id,
            formula: this.state.current == '0' && e.target.id == '0' ? this.state.formula : /([^.0-9]0)$/.test(this.state.formula) ?
                this.state.formula.slice(0, -1) + e.target.id : this.state.formula + e.target.id
        })

    }

    evaluate(e) {
        let expression = this.state.formula;
        if (endsWithOperator.test(expression)) expression = expression.slice(0, -1);
        expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
        let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
        this.setState({
            current: answer.toString(),
            formula: expression.replace(/\*/g, '⋅').replace(/-/g, '‑') + '=' + answer,
            prev: answer,
            evaluated: true
        });
    }

    hover(e){
        e.target.style.borderColor = "white";
    }
    hoverOut(e){
        e.target.style.borderColor = "black";
    }

    render() {
        return (
            <div id="calc">
                <Display currentVal={this.state.current} />
                <div className="buttonGroup">
                    <Button className="clear" display="AC" val={'AC'} buttonClicked={this.initialize} mouseOver={this.hover} mouseOut={this.hoverOut} />
                    <Button className="div" display="/" val={'/'} buttonClicked={this.handleOperators} mouseOver={this.hover} mouseOut={this.hoverOut} />
                    <Button className="div" display="X" val={'x'} buttonClicked={this.handleOperators} mouseOver={this.hover} mouseOut={this.hoverOut} />

                </div>
                <div className="buttonGroup">
                    <Button className="div" display="7" val={'7'} buttonClicked={this.handleNums} mouseOver={this.hover} mouseOut={this.hoverOut}/>
                    <Button className="div" display="8" val={'8'} buttonClicked={this.handleNums} mouseOver={this.hover} mouseOut={this.hoverOut}/>
                    <Button className="div" display="9" val={'9'} buttonClicked={this.handleNums} mouseOver={this.hover} mouseOut={this.hoverOut}/>
                    <Button className="div" display="-" val={'-'} buttonClicked={this.handleOperators} mouseOver={this.hover} mouseOut={this.hoverOut}/>

                </div>
                <div className="buttonGroup">
                    <Button className="div" display="4" val={'4'} buttonClicked={this.handleNums} mouseOver={this.hover} mouseOut={this.hoverOut}/>
                    <Button className="div" display="5" val={'5'} buttonClicked={this.handleNums} mouseOver={this.hover} mouseOut={this.hoverOut}/>
                    <Button className="div" display="6" val={'6'} buttonClicked={this.handleNums} mouseOver={this.hover} mouseOut={this.hoverOut}/>
                    <Button className="div" display="+" val={'+'} buttonClicked={this.handleOperators} mouseOver={this.hover} mouseOut={this.hoverOut}/>
                </div>
                <div className="buttonGroup">
                    <Button className="div" display="1" val={'1'} buttonClicked={this.handleNums} mouseOver={this.hover} mouseOut={this.hoverOut}/>
                    <Button className="div" display="2" val={'2'} buttonClicked={this.handleNums} mouseOver={this.hover} mouseOut={this.hoverOut}/>
                    <Button className="div" display="3" val={'3'} buttonClicked={this.handleNums} mouseOver={this.hover} mouseOut={this.hoverOut}/>

                </div>
                <div id="lastRow">
                    <Button className="eq" display="=" val='=' buttonClicked={this.evaluate} mouseOver={this.hover} mouseOut={this.hoverOut} />
                </div>
                <div className="buttonGroup">
                    <Button className="clear" display="0" val={'0'} buttonClicked={this.handleNums} mouseOver={this.hover} mouseOut={this.hoverOut}/>
                    <Button className="div" display="." val={'.'} buttonClicked={this.handleNums} mouseOver={this.hover} mouseOut={this.hoverOut}/>
                </div>
            </div>
        )
    }
}
export default Calculator