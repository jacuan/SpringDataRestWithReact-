import React, { Component } from 'react';

class ReturnButton extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return <button className="btn btn-success" type="link" 
        href={this.props.url}>Return</button>
    }
}

export default ReturnButton
