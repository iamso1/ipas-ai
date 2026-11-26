# iPAS 輔考系統

v24.9 單檔網頁，搭配 v68 題庫（1,100 題）與 99 張圖卡。Git 儲存庫僅涵蓋本目錄。

## 目錄結構

```text
exam-web/
├── index.html
├── README.md
├── .github/workflows/pages.yml
└── assets/
    ├── question-banks/
    │   └── ipas-question-bank-v68.json
    └── flashcards/
        ├── ai-fundamentals/             # 人工智慧導論基礎：28 張
        ├── ai-advanced/                 # 人工智慧導論進階：17 張
        ├── generative-ai-fundamentals/  # 生成式 AI 基礎：25 張
        ├── generative-ai-advanced/      # 生成式 AI 進階：22 張
        └── supplementary/              # 補充考點：7 張
```

資料夾採英文命名；每個分類內圖卡統一使用數字檔名 `1.webp`、`2.webp` 等。原本檔名帶編號者沿用該編號；補充考點依既有清單編為 1–7。舊檔名對照保存在 `index.html` 的 `FLASHCARD_FILE_ALIASES`，供歷史紀錄轉換。

## 本機使用

在此目錄執行：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

1. 開啟 <http://localhost:8000/>。
2. 點「載入 JSON 題庫」，選取 `assets/question-banks/ipas-question-bank-v68.json`。
3. 考點圖卡預設自動載入專案內的 99 張圖卡；可點「選取圖卡資料夾」改讀本機圖片或 PDF。

圖卡清單由 `assets/flashcards/manifest.json` 管理；新增／移除圖卡時需同步更新其中的相對路徑。HTTP／Pages 優先使用同站資產；直接開啟本機 HTML 或同站清單讀取失敗時，改讀 GitHub `main` 的公開 raw 檔案，因此需網路連線。舊分類與檔名仍會轉換，保留收藏及閱讀進度。

## 備份與來源

作答、收藏與圖卡進度保存在瀏覽器，不會自動回寫檔案。更換環境前，請分別匯出作答紀錄、圖卡收藏與進度。不同協定、主機或連接埠的儲存資料不共用。

題庫包含歷屆整理與非官方模擬題，請參考各題驗證狀態。圖卡來自 `https://pub-cf806236d50445579e09cd2da6db1908.r2.dev/`，保留原作者內容；公開可讀不代表授權任意轉載。

題庫的 PDF 連結仍指向原套件 `../2_教材/`，相關教材尚未完整提供，因此部分引用連結無法開啟；未將舊版教材頁碼直接套用到新版。

## Git 與 GitHub Pages

遠端：<https://github.com/iamso1/ipas-ai>。網站：<https://iamso1.github.io/ipas-ai/>。

在本目錄操作 Git。推送 `main` 後，workflow 會將本目錄發布至 Pages；Source 設為 GitHub Actions。資產路徑採相對路徑，支援 `/ipas-ai/` 專案網址。線上圖卡會自動載入；題庫仍需手動選取，可先從 repo 下載 JSON 或 ZIP。
