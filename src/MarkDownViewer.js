import React, { Component } from 'react';
import { Reserved, MarkdownTextBox } from '@3yaa3yaa/markdowntextbox';
import Img from 'gatsby-image';


export default class MarkDownViewer extends Component {

    constructor(props) {
        super(props);
        this.text=this.props.text;
        this.images=this.props.images;

    }

    getImage(filename)
    {
        let filtered=this.props.images.filter((data)=>{return data.node.fixed.originalName===filename});
        if(filtered.length>0)
        {
            return filtered[0].node.fluid;
        }
        return "";
    }

    getReservedItems()
    {
        let original=(data)=>{return data.split('|')[0]}
        let reading=(data)=>{return data.split('|')[1]}
        let out=[]
        out.push(new Reserved('rb(',[')'],(data,index)=>{return (<div key={index} style={{display:'inline'}}><ruby>{original(data)}<rt>{reading(data)}</rt></ruby></div>)}))
        out.push(new Reserved('img(',[')'],(data,index)=>{return (<div key={index}><Img fluid={this.getImage(data)} style={{width:'100%'}}/></div>)}))
        out.push(new Reserved('https://',[' ','\n','$'],(data,index)=>{return (<div key={index}><a href={'https://'+ data} style={{display:'inline'}}>{data}</a></div>)}))

        return out;
    }

    render() {
        return (<MarkdownTextBox value={this.text}
                                 reservedItems={this.getReservedItems()}
                                 descriptionStyle={{maxWidth:'100%', width:'100%'}}
                />);
    }
}


