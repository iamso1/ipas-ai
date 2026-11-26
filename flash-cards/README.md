# 教材與自製圖卡

這裡保留製作 cheatsheet 的來源及成品；供輔考網頁閱讀的下載圖卡位於 `../exam-web/考點圖卡/`。

## 來源與成品

- `sources/`：教材 v3 PDF、題庫 v68 的來源副本，以及來源說明。
- `output/cheatsheets/`：自製 PNG 與各自的 `*-brief.md` 生成紀錄。
- `tmp/pdfs/textbook-pages.json`：從 PDF 抽取的逐頁文字快取，供搜尋用，不是另一份教材。快取頁次從陣列索引 0 開始；引用時需核對原 PDF 的實際頁次及印刷頁碼。

目前自製主題：

1. 資料漂移 vs 概念漂移。
2. Label、One-hot、Target Encoding。
3. Sigmoid vs Softmax。
4. 梯度消失 vs 梯度爆炸。
5. 梯度下降與優化器。
6. Q-learning vs DQN。

新增圖卡時，將成品與內容／提示詞紀錄一起存放，並保留引用頁碼。AI 生成文字、公式與圖解應經人工核對後使用。舊 brief 若包含整理前的絕對路徑，視為當時生成紀錄；目前檔案位置以本目錄結構為準。
