/* Pure metadata index, shared by browser UI and Node tests. No answer/option text is indexed. */
(function(root){
 'use strict';
 const normalize=value=>String(value||'').normalize('NFKC').toLocaleLowerCase().replace(/[\s\-‐‑–—]+/g,'');
 class FlashcardCatalog {
  constructor(data){
   if(data?.version!==1||!Array.isArray(data.cards)||data.cards.length>10000)throw Error('圖卡 metadata 格式錯誤');
   this.cards=new Map();this.questions=new Map();this.searchText=new Map();
   for(const card of data.cards){
    if(typeof card.path!=='string'||!card.path||card.path.split('/').some(p=>!p||p==='.'||p==='..')||/[\\?#:\x00-\x1f]/.test(card.path)||
       typeof card.titleZh!=='string'||typeof card.titleEn!=='string'||!Array.isArray(card.keywords)||card.keywords.some(x=>typeof x!=='string')||
       !Array.isArray(card.relatedQuestions)||this.cards.has(card.path))throw Error('圖卡 metadata 含無效或重複欄位');
    if(card.relatedQuestions.some(q=>typeof q.questionId!=='string'||typeof q.questionTitle!=='string'||!['reviewed','suggested'].includes(q.reviewStatus)))throw Error('題目關聯格式錯誤');
    this.cards.set(card.path,card);
    this.searchText.set(card.path,normalize([card.titleZh,card.titleEn,...card.keywords].join(' ')));
    for(const link of card.relatedQuestions){
     if(!this.questions.has(link.questionId))this.questions.set(link.questionId,[]);
     this.questions.get(link.questionId).push({card,link});
    }
   }
  }
  get(path){return this.cards.get(path)||null;}
  matches(path,query,fallback=''){
   const tokens=String(query||'').trim().split(/\s+/).filter(Boolean).map(normalize);
   const text=normalize(path+' '+fallback)+(this.searchText.get(path)||'');
   return tokens.every(token=>text.includes(token));
  }
  forQuestion(id,text){
   return (this.questions.get(id)||[]).filter(({link})=>String(text).slice(0,180)===link.questionTitle)
    .sort((a,b)=>(b.link.score||0)-(a.link.score||0)||a.card.path.localeCompare(b.card.path,'en',{numeric:true}));
  }
 }
 if(typeof module!=='undefined'&&module.exports)module.exports=FlashcardCatalog;
 else root.FlashcardCatalog=FlashcardCatalog;
})(typeof globalThis!=='undefined'?globalThis:this);
