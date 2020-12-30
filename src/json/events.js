/**
 * type
 * 0 单击 1 双击 2 websocket 3 mqtt
 * action
 * 0 链接 1 动画开始 5 动画结束 2 自定义函数 3 window下的全局函数
 */
// { type: 3, action: 4, value: "", name: "kwd/1", params: true }
export const events = [
    {
        type:0,
        action:2,
        name:"开关",
        value:'pen'
    }
//   {
//     type: 0, // 单击
//     action: 0, // Link, 链接
//     value: `http://xxxxx`,
//     params: "_blank"
//   },
//   {
//     type: 1, // 双击
//     action: 1, // Animate,动画
//     value: `tag`, // 要播放动画的pen的tag
//     params: "" // 暂时没用
//   },
//   {
//     type: 1, // 双击
//     action: 5, // Animate,动画
//     value: `tag`, // 要停止播放动画的pen的tag
//     params: "" // 暂时没用
//   },
//   {
//     type: 2, // websocket
//     action: 2, // Function,自定义函数
//     name: "event name", // 监听websocket消息名
//     value: `console.log('pen', pen, 'params', params, client)`, // 这里只用写函数函数内容：即js代码
//     params: "false" // 仅当params==='false'时,不重绘；否则立刻重绘画布
//   },
//   {
//     type: 3, // mqtt
//     action: 2, // Function,自定义函数
//     name: "topic name", // 监听mqtt的topic
//     value: `console.log('pen', pen, 'params', params, client)`, // 函数js代码
//     params: "false" // 仅当params==='false'时,不重绘；否则立刻重绘画布
//   },
//   {
//     type: 0, // 单击
//     action: 3, // windowFn,window下的全局函数
//     value: `函数名`,
//     params: "{xxxxx,xxxx}" // 传递给函数的参数,必须为字符串。可以为json字符串,开发者自己parse
//   }
];
