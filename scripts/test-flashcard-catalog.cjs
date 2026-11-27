const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const FlashcardCatalog=require('./flashcard-catalog.js');
const root=path.join(__dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const data=read('assets/flashcards/metadata.json');
const catalog=new FlashcardCatalog(data);
const bank=read(data.questionBank.path);

test('every manifest image has reviewed concept metadata and an up-to-date hash',()=>{
 const files=read('assets/flashcards/manifest.json').files;
 assert.equal(catalog.cards.size,files.length);
 assert.deepEqual([...catalog.cards.keys()].sort(),[...files].sort());
 for(const card of data.cards){
  assert.ok(card.titleZh&&card.titleEn&&card.keywords.length);
  assert.equal(card.contentReview.status,'reviewed');
  assert.equal(card.sha256,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'assets/flashcards',card.path))).digest('hex'));
 }
});
test('Chinese names, English names, keyword aliases, category and filename are searchable',()=>{
 assert.ok(catalog.matches('ai-advanced/10.webp','局部事後'));
 assert.ok(catalog.matches('ai-advanced/10.webp','lime'));
 assert.ok(catalog.matches('supplementary/6.webp','ＳＯＦＴＭＡＸ'));
 assert.ok(catalog.matches('supplementary/4.webp','one-hot'));
 assert.ok(catalog.matches('supplementary/6.webp','補充考點 6.webp','補充考點'));
 assert.ok(!catalog.matches('supplementary/6.webp','Softmax 不存在的詞'));
 assert.ok(!catalog.matches('unknown/1.webp','Softmax'));
});
test('question links resolve both ways without matching a changed question with the same ID',()=>{
 const questions=new Map(bank.questions.map(q=>[q.id,q]));
 for(const card of data.cards){
  assert.equal(card.relatedQuestionCount,card.relatedQuestions.length);
  assert.equal(new Set(card.relatedQuestions.map(q=>q.questionId)).size,card.relatedQuestions.length);
  for(const link of card.relatedQuestions){
   const q=questions.get(link.questionId);assert.ok(q);
   assert.equal(q.question.slice(0,180),link.questionTitle);
   assert.ok(catalog.forQuestion(q.id,q.question).some(x=>x.card.path===card.path));
  }
 }
 const q=questions.get('11503-1-Q09');
 assert.ok(catalog.forQuestion(q.id,q.question).some(x=>x.card.path==='supplementary/6.webp'&&x.link.reviewStatus==='reviewed'));
 assert.deepEqual(catalog.forQuestion(q.id,'新版完全不同題目'),[]);
 assert.deepEqual(catalog.forQuestion('unknown',q.question),[]);
});
test('invalid metadata paths and duplicate cards are rejected',()=>{
 const card=data.cards[0];
 assert.throws(()=>new FlashcardCatalog({...data,cards:[{...card,path:'../1.webp'}]}));
 assert.throws(()=>new FlashcardCatalog({...data,cards:[card,card]}));
 assert.throws(()=>new FlashcardCatalog({...data,version:2}));
});
