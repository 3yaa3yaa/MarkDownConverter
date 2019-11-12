import kuromoji from 'kuromoji'
import { MarkdownTextBox } from '@3yaa3yaa/markdowntextbox';

export default class TextToJSX
{
    constructor(text) {
        this.text=text;
    }

    build()
    {
        let re = new RegExp('/.+(\n|$)','g');
        let arr = [...this.text.matchAll(re)].map((item)=>item[0]);
        console.log(arr);
        return Promise.all(arr.map((item)=>{
            return this.replaceRuby(item)
                .then((tokens)=>{
                    return new Promise((resolve)=>
                    {
                        const current=tokens.reduce(((acc,cur)=>acc+cur.surface_form),'');
                        const tobe=tokens.map((token)=>{
                                if(token.surface_form.match(/[\u30e0-\u9fcf]/))
                                    {return '=rb('+ token.surface_form + '|'+ token.reading +")"}
                                else
                                    {return token.surface_form}
                                })
                            .reduce(((acc,cur)=>acc+cur),'');
                        this.text=this.text.replace(current,tobe);
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
        );
    }

}
