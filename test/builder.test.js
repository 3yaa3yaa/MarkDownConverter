import TextToJSX from "../src/TextToJSX";
import React from 'react';
import { shallow, mount, render } from 'enzyme';


describe('A suite', function() {

    it('should tokenize properly', function(){
        let ttj=new TextToJSX("rb(親譲りの無鉄砲で子どもの時から損ばかりしている)");
        ttj.FillReadingsFromDictionary().then(()=> {
            expect(ttj.filledText).toBe("rb(親譲り|オヤユズリ)のrb(無鉄砲|ムテッポウ)でrb(子ども|コドモ)のrb(時|トキ)からrb(損|ソン)ばかりしている");
        });
    });

    it('should return a JSX properly', function(){
        let ttj=new TextToJSX("rb(親譲り|オヤユズリ)");
        const wrapper = render(ttj.GetJSX());
        expect(wrapper.find('.description').text()).toBe("親譲りオヤユズリ");
        // expect(wrapper.find('.top').length).toBe(1);
        // expect(wrapper.find('.description').length).toBe(1);
        // expect(wrapper.find('.top').length).toBe(1);
    })

    it('should build a JSX properly', function(){
        let ttj=new TextToJSX("rb(親譲りの無鉄砲で子どもの時から損ばかりしている)");
        ttj.FillReadingsFromDictionary().then(()=> {
            const wrapper = render(ttj.GetJSX());
            expect(wrapper.find('.description').text()).toBe("親譲りオヤユズリの無鉄砲ムテッポウで子どもコドモの時トキから損ソンばかりしている");
            // expect(wrapper.find('.description').length).toBe(1);
            // expect(wrapper.find('.top').length).toBe(1);
            // expect(wrapper.find('.text').length).toBe(1);
        });
    })

    // it('should build a JSX properly', function(){
    //     let ttj=new TextToJSX("rb(親譲りの無鉄砲で子どもの時から損ばかりしている)");
    //     const wrapper = render(ttj.GetFilledJSX());
    //     expect(wrapper.find('.description').text()).toBe("親譲りオヤユズリの無鉄砲ムテッポウで子どもコドモの時トキから損ソンばかりしている");
    // })

});


