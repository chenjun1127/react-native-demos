# React-Native 安装教程(windows平台下)
### 安装React Native
安装node，如不会安装，请[点击这里](https://github.com/kiss19861127/nodejs-demo/blob/master/README.md)，安装好node之后，就可以通过 npm（Node 包管理器）来安装 React Native 命令行工具了：
```javascript
npm install -g react-native-cli
```
这个步骤将会在你的系统全局安装 React Native 命令行工具。完成之后，祝贺你，此时React Native 已经安装成功了！
### Android依赖
Android 依赖的安装需要较多的步骤，应查看[官方文档](https://facebook.github.io/react-native/docs/android-setup.html)中最新的安装说明。需要注意的是，这些安装说明都假设你没有安装过 Android 开发环境。总体而言，安装分为三个主要阶段：安装 SDK、安装模拟器工具、创建模拟器。

1、需要安装 JDK（Java 开发工具包）和 Android SDK。

2、配置 ANDROID_HOME 环境变量

3、命令行执行 android 命令，从而打开 Android SDK 管理器。等待 SDK 管理更新并下载开发包列表。部分开发包会被默认选中，另外要确保选中了以下选项：
* Android SDK Build-tools version 23.0.1
* Android 6.0 (API 23)
* Android Support Repository

然后，点击 Install Packages 并接受合适的许可。等待安装完成可能会花费一些时间。

4、安装模拟器和相关的工具
再次运行 android 来启动 Android SDK 管理器。将安装一些其他的包。
* Intel x86 Atom System Image 
* Intel x86 Emulator Accelerator 

再次点击 Install Packages，接受合适的许可。

这些依赖包使我们能够创建 Android 虚拟设备（Android Virtual Devices，AVDs）或模拟器，命令行执行下面命令：
```javascript
android avd
```
创建任何你喜欢的模拟器（此处创建了一个 Galaxy Nexus 模拟器）,确保已经勾选了 Use Host GPU，否则模拟器会非常慢
### 创建一个新的应用
使用 React Native 命令行工具来创建一个新的应用，它会为你生成一个包含 ReactNative、iOS 和 Android 的全新模板工程：
```javascript
react-native init FirstProject
```
### 在Android平台运行React Native应用
前面介绍过了运行 AVD 管理器的方法
```javascript
android avd
```
选择希望运行的模拟器版本，然后点击 Start... 按钮。另外，也可以通过命令行来运行模拟器。通过以下命令显示出所有可用的模拟器类型：
```javascript
emulator -list-avds
```
然后通过名字和 @ 前缀来运行它们，例如，我有一个名为 galaxy 的模拟器，我可以这样来运行它：
```javascript
emulator @galaxy
```
无论采用何种方式来启动模拟器，一旦启动成功，只需要在工程的根目录运行如下命令即可加载 React Native 应用：
```javascript
react-native run-android
```
