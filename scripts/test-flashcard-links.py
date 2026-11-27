"""Matching regressions: distractor choices must never create associations."""
import importlib.util
from pathlib import Path
import unittest
spec=importlib.util.spec_from_file_location('builder',Path(__file__).with_name('build-flashcard-links.py'))
builder=importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)

class MatchingTests(unittest.TestCase):
    def test_ignores_answers_options_and_explanation(self):
        card={'matchingTerms':['Softmax']}
        q={'id':'test','question':'請問何者正確？','options':['Softmax'],'answer':'Softmax','explanation':'Softmax'}
        self.assertIsNone(builder.match_question(card,q))
        q['question']='輸出 Softmax 機率分布'
        self.assertEqual(builder.match_question(card,q)['matchedTerms'],['Softmax'])
    def test_english_boundaries_and_hyphen_variants(self):
        self.assertFalse(builder.contains('reshape data','APE'))
        self.assertFalse(builder.contains('tokenizer','Token'))
        self.assertTrue(builder.contains('使用 ONE HOT encoding','One-hot'))
        self.assertTrue(builder.contains('ＬＬＭ 的用途','LLM'))
    def test_chinese_ignores_spacing(self):
        self.assertTrue(builder.contains('資料 漂移','資料漂移'))

if __name__=='__main__':unittest.main()
