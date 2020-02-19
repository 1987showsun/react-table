React Best Table

Hooks for building lightweight, fast and extendable datagrids for React
Create new and better form components to make it easier for users to get started.

# Features
> Lightweight
> Auto out of the box, fully controllable API
> Server-side/controlled data/state
> Resizable
> Sorting
> Custom class name

# Documentation
## API
* theme
    * type        : string
    * default     : null
    * Description : dark / light
* customStyle
    * type        : object
    * default     : null
    * Description : { nomral: { css style }, thead: { css style }, titem: { css style } }, Custom table style 
* className
    * type        : string
    * default     : null
    * Description : Custom category name
* pagination
    * type        : object
    * default     : null
    * Description : 
        * total
            * type        : number
            * default     : 0
            * Description : dataitem total 
        * limit
            * type        : number
            * default     : 10
            * Description : display limit
        * display
            * type        : array
            * default     : null
            * Description : [current , arrows, first, Last, items, jumper]
* thead
    * type        : array
    * default     : null
    * Description : [ { key: data object key name (type: string), title: display text (type: string), sort: true/false (type: bool, default: false) },{...} ]
* handleSort
    * type        : function
    * default     : null
    * Description : return { sortStatus: 1(increasing)/0(initial)/-1(decrement), key: want sort key }
* handlePagination
    * type        : function
    * default     : null
    * Description : return Current page number 


使用 React Hooks 建構，可快速和擴展的數據網格的掛鉤。
創建新的更好的表單組件，使用戶更容易上手。

# 特徵
> 輕巧
> 開箱即用，完全可控制的API
> 服務器端/受控數據/狀態
> 可調整大小
> 排序
> 自定義類別名稱

# 使用文件
## API
* theme
    * type        : 字串
    * default     : 空
    * Description : dark(暗) / light(亮)
* customStyle
    * type        : 物件
    * default     : null
    * Description : { nomral: { css style }, thead: { css style }, titem: { css style } }, 自定表格樣式風格
* className
    * type        : 字串
    * default     : 空
    * Description : 自訂義類別名稱 { backgroundColor: '#---', ... }
* pagination
    * type        : 物件
    * default     : 空
    * Description : 
        * total
            * type        : 數字
            * default     : 0
            * Description : 資料總比數
        * limit
            * type        : 數字
            * default     : 10
            * Description : 每頁要顯示的資料比數
        * range
            * type        : 數字
            * default     : 2
            * Description : 顯示數量
        * display
            * type        : 陣列
            * default     : 空
            * Description : [current(顯示當前資訊), arrows(方向), first(最前頁), Last(最後頁), items(顯示頁買), jumper(跳頁輸入筐)]
* thead
    * type        : 陣列
    * default     : 空
    * Description : [ { key: 物件名稱 (type: 字串), title: 顯示的文字 (type: 字串), sort: true/false (排序開關)(type: 布林, default: false) },{...} ]
* handleSort
    * type        : 函式
    * default     : 空
    * Description : return { sortStatus: 1(遞增)/0(原始)/-1(遞減), key: 要排序的物件名稱 } (type: 物件)
* handlePagination
    * type        : 函式
    * default     : 空
    * Description : return 當前頁碼 (type: 數字)