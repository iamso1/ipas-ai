# iPAS AI 輔考系統

提供題庫練習、錯題與收藏複習、考點圖卡閱讀及進度備份。以 v24.9 單檔 HTML 為基礎，目前包含 v68 題庫 **1,100 題**及 **99 張 WebP 圖卡**，無須安裝 Node.js 或建置套件。

- [線上使用](https://iamso1.github.io/ipas-ai/)
- [GitHub 儲存庫](https://github.com/iamso1/ipas-ai)
- [Pages 部署狀態](https://github.com/iamso1/ipas-ai/actions)

## 線上快速開始

### 題庫練習

1. 開啟網站並進入題庫練習。
2. 點「匯入雲端 JSON 題庫」，直接載入 repo 提供的 1,100 題，不必下載檔案。
3. 選擇練習範圍並作答；提交答案後查看答案與解析。
4. 如需使用其他題庫，點「載入本機 JSON 題庫」選擇相容的 JSON。

雲端匯入沿用既有題庫識別、紀錄還原與收藏流程，不會因為來源改為雲端而刻意清除作答紀錄。不同題庫的紀錄是否相容，仍取決於題庫 ID、內容及程式的版本承接規則。

### 考點圖卡

- 網站預設自動載入專案圖卡。
- 點「匯入雲端圖卡」可重新載入 repo 清單，或從本機來源切回專案圖卡。
- 點「選取圖卡資料夾」可閱讀自己的本機圖片或 PDF；選取後只在瀏覽器內讀取，不會上傳到 repo。
- 圖卡依資料夾分層，可逐層展開／收合，或使用「全部展開／全部收合」。
- 「圖卡範圍」可選全部圖卡或單一資料夾（含子資料夾）；搜尋與只看最愛會在選取範圍內生效，左右翻頁也依此範圍切換。
- 可收藏圖卡、查看閱讀進度，並接續上次閱讀位置。
- 雲端匯入失敗時會顯示訊息，並保留已載入的圖卡。

兩個雲端匯入按鈕在 HTTP／GitHub Pages 環境優先讀取同站 `assets/`；直接開啟本機 HTML 時使用 GitHub `main` 的公開 raw 檔案。同站清單／題庫讀取失敗時也會嘗試 raw 來源。按鈕沒有提供任意 URL 輸入，來源固定為此專案。

## 快捷鍵

| 功能 | 快捷鍵 |
| --- | --- |
| 題庫上一題／下一題 | `←`／`→` |
| 選擇選項 | `Alt+1`～`Alt+8` |
| 提交答案 | `Alt+Enter` |
| 收藏題目 | `Alt+F` |
| 圖卡上一張／下一張 | `←`／`→`（圖卡頁） |

## 專案結構

```text
exam-web/                           # 本機 Git 儲存庫根目錄
├── index.html                      # HTML、CSS 與 JavaScript
├── README.md
├── .gitignore
├── .github/workflows/pages.yml      # main 推送後自動部署
└── assets/
    ├── question-banks/
    │   └── ipas-question-bank-v68.json
    └── flashcards/
        ├── manifest.json           # 雲端圖卡載入清單
        ├── ai-fundamentals/         # 人工智慧導論基礎：28 張
        ├── ai-advanced/             # 人工智慧導論進階：17 張
        ├── generative-ai-fundamentals/ # 生成式 AI 基礎：25 張
        ├── generative-ai-advanced/  # 生成式 AI 進階：22 張
        └── supplementary/          # 補充考點：7 張
```

資料夾使用英文，圖卡使用分類內的數字檔名，例如 `ai-fundamentals/1.webp`。生成式 AI 基礎保留原編號，缺號為 3、6、8。題庫來源 PDF、自製圖卡工作區等外層資料不在此 Git 儲存庫的追蹤範圍內。

## 本機啟動

在 `exam-web/` 內執行：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

開啟 [http://localhost:8000/](http://localhost:8000/)。本機伺服器會直接提供本目錄的資產，不需要連線到 GitHub 才能讀取它們。

也可直接開啟 `index.html`，但雲端匯入需要網路，且 `file://` 的儲存與資產存取行為依瀏覽器而異。離線可手動選取本機題庫與圖卡資料夾；本系統未實作 Service Worker 離線快取。

## 紀錄與備份

作答、錯題、收藏及圖卡進度保存在瀏覽器儲存空間，不會寫回 repo，也不會自動跨裝置同步。

- 使用「匯出紀錄」備份作答等資料；使用「匯入紀錄」還原。
- 使用圖卡頁的「匯出圖卡紀錄／匯入圖卡紀錄」備份及還原收藏、閱讀進度。
- 更換裝置、瀏覽器、網址來源或清除網站資料前，請先備份。
- 本機與 Pages、不同主機或連接埠的儲存資料不共用。
- 舊中文分類與英文描述檔名會透過 `FLASHCARD_CATEGORY_ALIASES`、`FLASHCARD_FILE_ALIASES` 轉成目前路徑，供既有收藏與閱讀進度使用。

## 更新資產

### 題庫

更新 `assets/question-banks/ipas-question-bank-v68.json`，並確認 JSON 有效、題目 ID 和版本承接規則正確。如果更換題庫檔名，需同步修改 `index.html` 中雲端匯入使用的 `path`。部署後，使用者可再次點「匯入雲端 JSON 題庫」載入新內容。

### 圖卡

1. 將圖片放入對應英文分類資料夾，使用未占用的數字檔名。
2. 同步更新 `assets/flashcards/manifest.json` 的 `files` 陣列；路徑以圖卡根目錄為基準，例如 `supplementary/8.webp`。
3. 若改名既有檔案，更新 `FLASHCARD_FILE_ALIASES`，避免收藏與進度失去對應。
4. 更新 README 的圖卡數量；部署後點「匯入雲端圖卡」重新載入清單。

清單格式如下，僅為格式示例：

```json
{
  "version": 1,
  "files": ["ai-fundamentals/1.webp", "supplementary/1.webp"]
}
```

清單中的每個檔案都必須存在；發布時會包含整個儲存庫根目錄，新增檔案前請確認用途。

## Git 與部署

在 `exam-web/` 內操作 Git，遠端使用 SSH：

```bash
git add .
git commit -m "feat: 更新輔考內容"
git push origin main
```

`.github/workflows/pages.yml` 在推送 `main` 或手動執行時部署網站。GitHub 的 **Settings → Pages → Source** 設為 **GitHub Actions**。其他分支的 push 不會發布；部署結果以 Actions 顯示為準。

網站使用相對資產路徑，支援 `/ipas-ai/` 專案網址。若部署成功但仍看到舊版，請強制重新整理（macOS：`⌘⇧R`）。

## 資料來源與限制

- 題庫包含歷屆整理及非官方模擬題，答案與解析的支持程度請看各題的來源、驗證狀態與說明。
- 下載圖卡的來源為 [R2 公開網域](https://pub-cf806236d50445579e09cd2da6db1908.r2.dev/)。本地已重新整理路徑與檔名，保留圖片內容；公開可讀不代表可任意轉載或公開再授權。
- 題庫 PDF 連結仍指向原套件的 `../2_教材/`，教材尚未完整提供，因此部分引用連結無法開啟。未將舊教材頁碼直接套用至新版。
- 本系統是靜態網站，沒有伺服器帳號系統或雲端紀錄同步。
