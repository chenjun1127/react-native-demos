# 基于 React-Native 开发的音乐、天气、电影、新闻综合APP
### 一、简介
本APP基于 React-Native 开发，只兼容了android端，是一个综合类的APP，实现了播放音乐、获取当前位置天气、查看电影、查看新闻等功能；
#### 1、APP涉及版本及第三方组件
* "moment": "^2.18.1"
* "qs": "^6.5.0"
* "react": "16.0.0-alpha.6"
* "react-native": "0.43.3"
* "react-native-html2native": "^2.0.0"
* "react-native-scrollable-tab-view": "^0.7.4"
* "react-native-swiper": "^1.5.4"
* "react-native-toast": "^1.0.1"
* "react-native-vector-icons": "^4.0.1"
* "react-native-video": "^1.0.0"

#### 2、基本功能
* 使用网易云音乐API获取最新歌碟、最新歌手，并通过歌手ID或者歌曲ID可实现音乐播放功能；
* 实现了音乐搜索功能，并存储当前搜索的历史；
* 根据当前地理位置获取7天内天气，下拉更新；
* 使用豆瓣API获取正在热映、即将上映、TOP250电影，上拉加载更多数据；
* 获取国内新闻，下拉刷新、上拉加载更多；

#### 4、使用的基本API接口
* 网易云音乐API
* 百度地理位置API
* 京东万象天气API
* 豆瓣电影API
* 京东万象新闻API

感谢以上API接口提供服务！

### 二、APP基本截图看[这里](https://github.com/chenjun1127/React-Native-Demos/blob/master/ThirdProject/images.md)
### 三、运行环境及Node版本
Windows 平台 + Android Studio + 真机（模拟器）+ Nodejs，当前node v6.9.2 运行正常；
### 四、安装及运行
1、下载项目
```bash
git clone git@github.com:chenjun1127/React-Native-Demos.git
```
2、cd到目录
```bash
cd ThirdProject
```
3、安装依赖
```bash
npm install 
```
4、连上真机（模拟器）运行
```bash
react-native run-android
```
Tips：screenshot 与 images.md 为截图说明文件，是为了方便查看，与项目无关！

### 五、存在不足及总结
不足：
* 在windows下开发，所以只兼容了android，暂未兼容ios；
* 由于使用react-native-video来播放音乐，导致该APP在播放音乐的时候，有些卡顿，暂无好的解决方案；
* 返回键暂未做处理；
* 某些页面暂不完整（电影未做详情页面）；
* 获取地理位置要确保网络良好，否则会导致获取位置失败，无法获取天气；

总结：
以上问题都有待优化完善，总体而言，本APP具有很好的参考价值，react-native 里面的基本组件都有涉及到，并且某些组件在官方的基础上做了许多的封装，适合范围更广。

使用过程如有问题，请联系QQ:402074940。

