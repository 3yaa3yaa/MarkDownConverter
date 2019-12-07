import React from "react";
import kuromoji from 'kuromoji'
import MarkDownViewer from "./MarkDownViewer";


export default class TextToJSX
{
    constructor(text,images) {
        this.text=text;
        this.images=images;
        this.rubyPattern = /rb\(([^|]+)\)/g
        this.filledText=this.text.replace(this.rubyPattern,'$1')
    }

    GetJSX()
    {
        return (<MarkDownViewer text={this.filledText} images={this.images}/>);
    }

    // GetFilledJSX() //under development
    // {
    //     let out=1;
    //     let called=false;
    //     this.FillReadingsFromDictionary().then(()=>{out= this.GetJSX(); called=true});
    //     do
    //     {
    //         if(called)
    //         {
    //             return out;
    //         }
    //         setTimeout(()=>{console.log("waiting..."), 5000});
    //     }while(true===true);
    // }

    FillReadingsFromDictionary()
    {
        let arr = [...this.text.matchAll(this.rubyPattern)].map((item)=>item[1]);
        return Promise.all(arr.map((item)=>{
            return this.replaceRuby(item)
                .then((tokens)=>{
                    return new Promise((resolve)=>
                    {
                        const current=tokens.reduce(((acc,cur)=>acc+cur.surface_form),'');
                        const tobe=tokens.map((token)=>{
                                if(token.surface_form.match(/[\u30e0-\u9fcf]/))
                                    {return 'rb('+ token.surface_form + '|'+ token.reading +")"}
                                else
                                    {return token.surface_form}
                                })
                            .reduce(((acc,cur)=>acc+cur),'');
                        this.filledText=this.filledText.replace(current,tobe);
                        resolve();
                    })
                });
        }))
    }

    replaceRuby(text)
    {
        return new Promise(
            (resolve, reject)=>{
                kuromoji.builder({ dicPath: "node_modules/kuromoji/dict" })
                .build(
                    (err, tokenizer)=>{
                        if (err) {
                            reject(err)
                        } else {
                            const tokens = tokenizer.tokenize(text);
                            resolve(tokens)
                        }
                    }
                )
            }
        )
    }

}
