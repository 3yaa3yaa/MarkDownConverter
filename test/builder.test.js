import TextToJSX from "../src/TextToJSX";
import React from 'react';
import { shallow, mount, render } from 'enzyme';


describe('A suite', function() {

    it('should tokenize properly', function(){
        let ttj=new TextToJSX("rb(親譲りの無鉄砲で子供の時から損ばかりしている)");
        ttj.FillReadingsFromDictionary().then(()=> {
            expect(ttj.filledText).toBe("rb(親譲り|オヤユズリ)のrb(無鉄砲|ムテッポウ)でrb(子供|コドモ)のrb(時|トキ)からrb(損|ソン)ばかりしている");
        });
    });

    it('should return a JSX properly', function(){
        let ttj=new TextToJSX("rb(親譲り|オヤユズリ)");
        const wrapper = render(ttj.GetJSX());
        expect(wrapper.find('.description').text()).toBe("親譲りオヤユズリ");
    })

    it('should return a link properly', function(){
        let ttj=new TextToJSX("https://google.com");
        console.log(mount(ttj.GetJSX()).debug());
        const wrapper = render(ttj.GetJSX());
        expect(wrapper.find('.description').text()).toBe("google.com");
    })



    it('should build a JSX properly', function(){
        let ttj=new TextToJSX("rb(親譲りの無鉄砲で子どもの時から損ばかりしている)");
        ttj.FillReadingsFromDictionary().then(()=> {
            const wrapper = render(ttj.GetJSX());
            expect(wrapper.find('.description').text()).toBe("親譲りオヤユズリの無鉄砲ムテッポウで子どもコドモの時トキから損ソンばかりしている");
        });
    })
    //
    // it('should build a JSX properly', function(){
    //     let ttj=new TextToJSX("rb(親譲りの無鉄砲で子どもの時から損ばかりしている)");
    //     const wrapper = render(ttj.GetFilledJSX());
    //     expect(wrapper.find('.description').text()).toBe("親譲りオヤユズリの無鉄砲ムテッポウで子どもコドモの時トキから損ソンばかりしている");
    // })

});


