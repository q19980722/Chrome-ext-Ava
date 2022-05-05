import { createApp } from 'vue'
import App from './App/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';


// var pageWidth
// var pageHeight

// chrome.storage.local.get("workmode", (workmode) => {console.log(workmode)})

chrome.storage.local.get("workmode", (workmode) => {
  if (workmode.workmode) {
    chrome.storage.local.get("blockList", (entry) => {
      var list = (typeof(entry.blockList) == 'undefined') ? [] : Object.values(entry.blockList);
      list.forEach(element => {
        console.log(window.location.href,element)
        if (window.location.href.indexOf(element.keyword) != -1) {
          joinContent(App)
          return
        }
      });
    });
  }
})
// document.body.scrollTop=100
// sc()
// joinContent(App)

function joinContent () {
  const div = document.createElement('div')
  div.id = 'content'
  document.body.appendChild(div)
  createApp(App).use(ElementPlus).mount('#content')
}


// chrome.extension.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     if (request.action === "getPage") {
//       sendResponse(getPageSize())
//     }
//   }
// );


// function getPageSize () {
//   return [document.body.scrollWidth, document.body.scrollHeight]
//   // pageWidth = document.body.scrollWidth
//   // pageHeight = document.body.scrollHeight
// }


// function sc() {
//         var scrollWidth = document.body.scrollWidth;
//         var scrollHeight = document.body.scrollHeight;
//         var visibleWidth = document.documentElement.clientWidth;
//         var visibleHeight = document.documentElement.clientHeight;

//         // 根据可视区域计算整个网页可以拆分成多少行多少列 
//         var columns = Math.ceil(scrollWidth*1.0 / visibleWidth); 
//         var rows = Math.ceil(scrollHeight*1.0 / visibleHeight); 

//         var canvas_data = {
//           'size': {'scrollWidth':scrollWidth, 'scrollHeight': scrollHeight, 'visibleWidth':visibleWidth, 'visibleHeight':visibleHeight},
//           'table':{'rows': rows, 'colums': columns},
//           'screenshots': [] 
//         };

//         console.log(canvas_data);

//         // 最后一行行的循环滚动页面截屏 
//         for(var r=0; r<rows; r++) { 
//           document.body.scrollTop = r*visibleHeight; 
//           for(var c=0; c<columns; c++) { 
//             document.body.scrollLeft = c*visibleWidth; 
//             // 截屏并保存 
//             chrome.tabs.captureVisibleTab({format:'png'}, function(screenshotUrl) {
//                 canvas_data.screenshots.push({row: r, column: c, data_url: screenshotUrl});
//             });
//           } 
//         }  
// }
