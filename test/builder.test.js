import TextToJSX from "../src/TextToJSX";
describe('A suite', function() {

    it('should tokenize properly', function(){
        let ttj=new TextToJSX("/親譲りの無鉄砲で\n/子どもの時から損ばかりしている");
        ttj.build().then(()=> {
            console.log(ttj.text);
            expect(text.match(/オヤユズリ/)[0]).toBe("オヤユズリ")
        });
    })

});
