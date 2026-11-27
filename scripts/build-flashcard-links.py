"""Rebuild conservative, explainable card/question suggestions from question stems.

Run from the repo root: python3 scripts/build-flashcard-links.py
Only titleZh/titleEn/keywords/matchingTerms are curated. Never match options or answers.
"""
from pathlib import Path
import hashlib,json,re,unicodedata
ROOT=Path(__file__).resolve().parents[1]

def normalize(text):
    return unicodedata.normalize('NFKC',text).casefold().replace('–','-').replace('－','-')

def contains(text,term):
    text,term=normalize(text),normalize(term)
    if re.search('[a-z]',term):
        pattern=re.escape(term).replace(r'\ ',r'[\s-]*').replace(r'\-',r'[\s-]*')
        return bool(re.search(r'(?<![a-z0-9])'+pattern+r'(?![a-z0-9])',text))
    return re.sub(r'\s+','',term) in re.sub(r'\s+','',text)

def match_question(card,q):
    # A concept mentioned only by an incorrect option is not evidence of relevance.
    hits=[term for term in card['matchingTerms'] if contains(q['question'],term)]
    if not hits:return None
    distinct=list(dict.fromkeys(normalize(x) for x in hits))
    return {'questionId':q['id'],'matchedTerms':hits,'score':len(distinct),
            'basis':'question-stem-keyword','reviewStatus':'suggested',
            'questionTitle':q['question'][:180], 'exam':q.get('exam','')}

def build():
    path=ROOT/'assets/flashcards/metadata.json'
    data=json.loads(path.read_text())
    bank=json.loads((ROOT/'assets/question-banks/ipas-question-bank-v68.json').read_text())
    manifest=json.loads((ROOT/'assets/flashcards/manifest.json').read_text())
    assert set(c['path'] for c in data['cards'])==set(manifest['files'])
    for card in data['cards']:
        image=ROOT/'assets/flashcards'/card['path']
        assert hashlib.sha256(image.read_bytes()).hexdigest()==card['sha256'],f"Image changed: {card['path']}"
        matches=[m for q in bank['questions'] if (m:=match_question(card,q))]
        by_id={q['id']:q for q in bank['questions']}
        for link in card.get('curatedQuestionLinks',[]):
            assert link['questionId'] in by_id,link['questionId']
            q=by_id[link['questionId']]
            matches=[m for m in matches if m['questionId']!=q['id']]
            matches.append({'questionId':q['id'],'matchedTerms':[], 'score':100,
                            'basis':'curated-concept-link','reviewStatus':'reviewed',
                            'reason':link['reason'],'questionTitle':q['question'][:180], 'exam':q.get('exam','')})
        matches.sort(key=lambda m:(-m['score'],m['questionId']))
        card['relatedQuestionCount']=len(matches)
        card['relatedQuestions']=matches # UI paginates instead of silently dropping links.
    data['questionBank']={'path':'assets/question-banks/ipas-question-bank-v68.json','bankId':bank.get('bankId'),
                         'sha256':hashlib.sha256((ROOT/'assets/question-banks/ipas-question-bank-v68.json').read_bytes()).hexdigest()}
    data['matchingPolicy']={'sourceFields':['question'],'excludedFields':['options','answer','explanation'],
                           'status':'suggested','note':'題幹直接提及概念，不代表本題答案為該概念；不是官方配對或語意模型判定。'}
    path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    reviewed=sum(q['reviewStatus']=='reviewed' for c in data['cards'] for q in c['relatedQuestions'])
    print(f"{len(data['cards'])} cards; {sum(len(c['relatedQuestions']) for c in data['cards'])} total links ({reviewed} reviewed); "
          f"{sum(not c['relatedQuestions'] for c in data['cards'])} cards without direct matches")
if __name__=='__main__':build()
