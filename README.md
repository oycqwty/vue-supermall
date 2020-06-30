# Supermall
```
1.Project setup
npm install

2.Compiles and hot-reloads for development
npm run serve

3.Compiles and minifies for production
npm run build
```

```
tabControl吸顶效果 HomeSwiper组件 轮播图通过@load监听加载完成事件,
然后向Home组件发射事件，加载完成计算offsetTop高度
重复定义一个tabControl组件，使用绝对定位，v-show超出距离显示
PS:子组件发射事件，父组件只需要在标签上接收即可 (点击新款，精选时需要进入首页前就加载数据，保证吸顶后高度始终大于offsetTop高度)
```

1.首页位置的保持
2.点击新款，图片所处高度新款位置和流行所处位置高度一样
3.详情页数据没有随地址栏id而更新那我关了

等下 第二个问题帮忙解决下
厉害啊老哥 