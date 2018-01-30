## React-Native 中使用MobX
#### 准备工作（环境配置）
MobX 是一款精准的状态管理工具库，相比 redux 更加容易上手，更简单。它的核心要点可分为三个：
* 定义状态并使其可观察
* 创建视图以响应状态的变化
* 更改状态

首先，先来创建一个 React Native 应用，
```
react-native init MobX
```
CD 到工程目录，安装依赖 mobx 和 mobx-react
```
yarn add mobx mobx-react
```
然后安装一些 babel 插件，以支持 ES7 的 decorator 特性：
```
yarn babel-plugin-transform-decorators-legacy babel-preset-react-native-stage-0 -D
```
接着，打开.babelrc文件，添加以下插件属性
```
"plugins": ["transform-decorators-legacy"]
```
以上，基本环境就已经配置好了，可以着手写代码了。
#### MobX常用标签及意义
* @observable: 使用此标签监控要检测的数据；
* @observer: 使用此标签监控当数据变化是要更新的Component（组件类）
* @action:使用此标签监控数据改变的自定义方法(当在需要数据改变的时候执行此自定义方法，那么View层也会跟着自动变化，默认此View层已经使用@observer标签监控)

 