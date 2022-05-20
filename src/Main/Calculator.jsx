import React, { Component } from "react";
import Display from "../Components/Display";
import Button from "../Components/Button";

import './Calculator.css';

const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
};
 
export default class Contador extends Component   {

    state = {...initialState}

    clearMemory()  {
        this.setState({...initialState});
    }

    setOperation(operation)    {
        if(this.state.current === 0)    {
            this.setState({operation, current: 1, clearDisplay: true});
        }
        else    {
            const equals = operation === "=";
            const currentOperation = this.state.operation;

            const values = {...this.state.values};

            switch(currentOperation)    {
                case "+":
                   values[0] = values[0] + values[1];
                   break;

                case "-":
                    values[0] = values[0] - values[1];
                break;
                    
                case "÷":
                    values[0] = values[0] / values[1];
                break;

                case "×":
                    values[0] = values[0] * values[1];
                break;

                default:
            }

            values[1] = 0;

            this.setState({
                displayValue: values[0],
                clearDisplay: !equals,
                operation: equals ? null : operation,
                values,
                current: equals ? 0 : 1,
            });
        }
    }

    addDigit(digit)   {
        if(digit === "." && this.state.displayValue.includes("."))  return;
    
        const clearDisplay = this.state.displayValue === "0" ||this.state.clearDisplay;

        const currentValue = clearDisplay ? "" : this.state.displayValue;

        const displayValue = currentValue + digit;

        this.setState({displayValue, clearDisplay: false});

        if(digit !== ".")   {
            const index = this.state.current;

            const newValue = parseFloat(displayValue);

            const values = {...this.state.values}

            values[index] = newValue;

            this.setState({values});
        }
    }

    render() {
        const addDigit = digit => this.addDigit(digit);
        const setOperation = operation => this.setOperation(operation);
        return (
            <div>
                <div className="calculator">
                    <Display value={this.state.displayValue} />
                    <Button label="AC" click={() => this.clearMemory()} triple />
                    <Button label="÷" click={setOperation} operation />
                    <Button label="7" click={addDigit} />
                    <Button label="8" click={addDigit} />
                    <Button label="9" click={addDigit} />
                    <Button label="×" click={setOperation} operation />
                    <Button label="4" click={addDigit} />
                    <Button label="5" click={addDigit} />
                    <Button label="6" click={addDigit} />
                    <Button label="-" click={setOperation} operation />
                    <Button label="1" click={addDigit} />
                    <Button label="2" click={addDigit} />
                    <Button label="3" click={addDigit} />
                    <Button label="+" click={setOperation} operation />
                    <Button label="0" click={addDigit} double roundOne />
                    <Button label="." click={addDigit} />
                    <Button label="=" click={setOperation} operation roundTwo />
                </div>
            </div>
        );
    };
}