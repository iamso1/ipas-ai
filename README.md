# iPAS AI 備考專案

整理 iPAS AI 初級認證的練習系統、題庫、參考教材與考點圖卡。

## 目錄

```text
ipas-ai/
├── exam-web/                  # 輔考網頁與實際使用的題庫、圖卡
│   ├── index.html             # 原 v24.9 輔考系統，單檔網頁程式
│   ├── ipas-question-bank-v68.json
│   └── 考點圖卡/              # 5 個分類，共 99 張 WebP
└── flash-cards/               # 教材來源與自製圖卡工作區
    ├── sources/               # 參考教材 PDF、原始題庫副本
    ├── output/cheatsheets/    # 6 張自製 PNG 與提示詞紀錄
    └── tmp/pdfs/              # PDF 抽取文字快取，可重新產生
```

## 開始使用

建議在專案根目錄啟動本機伺服器，無須安裝 npm 套件：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

瀏覽器開啟 <http://localhost:8000/exam-web/>。點「載入 JSON 題庫」，選擇 `exam-web/ipas-question-bank-v68.json`；在考點圖卡頁點「選取圖卡資料夾」，選擇 `exam-web/考點圖卡/`。

也可以直接開啟 `exam-web/index.html`，再手動選擇題庫和圖卡；`file://` 的相對載入及儲存行為依瀏覽器而異。

## 內容與資料來源

- 題庫 v68：1,100 題，包含歷屆整理與非官方模擬題。答案的驗證狀態及來源以各題欄位為準，不代表全部經官方確認。
- 參考書：`flash-cards/sources/ipas-ai-junior-cert-textbook-v3.pdf`，357 頁。來源與加入紀錄見 [來源說明](flash-cards/sources/README.md)。
- 下載圖卡：人工智慧導論基礎 28 張、進階 17 張；生成式 AI 基礎 25 張、進階 22 張；補充考點 7 張。
- 自製 cheatsheet：位於 `flash-cards/output/cheatsheets/`，各圖卡附 `*-brief.md`，記錄內容依據與生成提示詞。

下載圖卡來自 R2 公開網域 `https://pub-cf806236d50445579e09cd2da6db1908.r2.dev/`，保留遠端分類與原始檔名；本地檔案不代表 R2 的完整目錄。

## 保存紀錄與維護

- 作答、收藏及圖卡進度保存在瀏覽器儲存空間，不會自動寫入專案。請使用網頁內的「匯出紀錄」及「匯出圖卡紀錄」備份。
- 更換瀏覽器、協定、主機或連接埠前先備份；不同來源的瀏覽器資料不會自動共用。
- `flash-cards/sources/` 保留題庫來源副本；`exam-web/` 的同名檔案是供練習載入的副本。更新時先確認版本與題目 ID 相容性，再同步兩份檔案。
- 圖卡下載於 R2 公開網址；公開可讀不表示可任意轉載或公開發佈，使用時保留來源並依原作者授權。
- `.gitignore` 排除系統雜檔與 PDF 文字快取。GitHub repo：<https://github.com/iamso1/ipas-ai>。

## 已知限制

題庫的 PDF 連結仍引用原套件的 `../2_教材/` 及多份尚未提供的 PDF（含 v2 教材）。本專案目前只保存上述 v3 教材，因此部分教材連結無法開啟。不能直接以 v3 取代 v2，因為頁碼可能不同。

詳細操作見 [輔考系統說明](exam-web/README.md)；圖卡製作區見 [flash-cards 說明](flash-cards/README.md)。


## GitHub Pages

網站入口：<https://iamso1.github.io/ipas-ai/>。

`.github/workflows/pages.yml` 在推送 `main` 或手動執行時，將 `exam-web/` 部署到網站根目錄；不發布 `flash-cards/`。GitHub repo 的 Settings → Pages → Source 應設為 GitHub Actions。

線上首次使用仍需載入題庫並選取本機圖卡資料夾；題庫可由 repo 下載，圖卡可下載 repo ZIP 後解壓選取。部署不會自動將本機瀏覽器的作答紀錄同步到線上來源，請先匯出備份再匯入。
