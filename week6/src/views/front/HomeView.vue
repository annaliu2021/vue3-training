<template>
  <div class="container">
    <h1>這是前台首頁</h1>
    <h3>主線任務</h3>
    <ul>
      <li>
        <del>使用 Vite 完成路由設定</del>
      </li>
      <li>
        <del>在 Vite 中完成登入、前台表單驗證功能</del>
      </li>
      <li>
        <del>建立 .env 檔案內容</del>
      </li>
    </ul>
    <ul>
      <li>
        LV1：參考範例程式碼，完成路由功能，並可瀏覽所有前台頁面（請提供導覽選單，進入頁面僅需要標題，不必加入內容）
      </li>
      <li>LV2：前台顯示完整的產品列表，並可進入產品細節頁面</li>
      <li><del>LV3：完成以上功能＋前台表單及登入頁面及登入驗證功能</del></li>
    </ul>
    <ul>
      <h5>2023-02-17 修正</h5>
      <li><del>加入404 頁面或重新導向的功能</del></li>
      <li><del>移除 console.log</del></li>
      <li><del>ProductsView.vue 的 :ked 要改為 :key</del></li>
      <li><del>ProductsView.vue 的getData應改為getProductsData</del></li>
      <li>
        <del
          >網頁中點擊後會發出 axios 請求的按鈕，在點擊後，可以先讓該按鈕狀態變為
          disabled (不可點擊)，等遠端資料回來(跑 .then 或 .catch，或者
          .finally)，再讓按鈕呈現可點擊的狀態=>加在finally</del
        >
      </li>

      <li>
        <del
          >訂單頁面，成功送出訂單後，備註的內容也需要清空(要用veevaild.feild包住textarea)</del
        >
      </li>
      <li>
        <del
          >DashboardLayout.vue的this.getOrders();應改為導向OrdersView.vue</del
        >
      </li>
    </ul>
  </div>
</template>
