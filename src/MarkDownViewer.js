import React, { Component } from 'react';
import { Reserved, MarkdownTextBox } from '@3yaa3yaa/markdowntextbox';
import { Map}  from 'treemindmap'
import Img from 'gatsby-image'

export default class MarkDownViewer extends Component {

    constructor(props) {
        super(props);
        this.text=this.props.text;
    }

    getReservedItems()
    {
        let original=(data)=>{return data.split('|')[0]}
        let reading=(data)=>{return data.split('|')[1]}
        let out=[]
        out.push(new Reserved('rb(',')',(data,index)=>{return (<div key={index}><ruby>{original(data)}<rt>{reading(data)}</rt></ruby></div>)}))
        out.push(new Reserved('^tmm:\n','^\n',(data,index)=>{return (<div key={index}><Map initialState={data}/></div>)}))
        out.push(new Reserved('img(',')',(data,index)=>{return (<div key={index}><Img fixed={data}/></div>)}))
        return out;
    }

    render() {
        return (<MarkdownTextBox value={this.text}
                                 reservedItems={this.getReservedItems()}
                                 descriptionStyle={{maxWidth:'100%', width:'100%'}}
                />);
    }
}


