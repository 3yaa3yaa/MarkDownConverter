import React, { Component } from 'react';
import { Reserved, MarkdownTextBox } from '@3yaa3yaa/markdowntextbox';

export default class MarkDownViewer extends Component {

    constructor(props) {
        super(props);
        this.text=this.props.text;
    }

    getReservedItems()
    {
        let original=(data)=>{return data.split('|')[0]}
        let reading=(data)=>{return data.split('|')[1]}
        let out = new Reserved('rb(',')',(data)=>{return (<div><ruby>{original(data)}<rt>{reading(data)}</rt></ruby></div>)})
        return [out];
    }

    render() {
        return (<MarkdownTextBox value={this.text}
                                 reservedItems={this.getReservedItems()}
                />);
    }
}


