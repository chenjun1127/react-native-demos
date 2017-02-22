# React-Native 安装教程(windows平台下面)
### 安装React Native
安装node，如不会安装，请[点击这里](https://github.com/kiss19861127/nodejs-demo/blob/master/README.md)，安装好node之后，就可以通过 npm（Node 包管理器）来安装 React Native 命令行工具了：
```javascript
npm install -g react-native-cli
```
这个步骤将会在你的系统全局安装 React Native 命令行工具。完成之后，祝贺你，此时React Native 已经安装成功了！
### Android依赖
Android 依赖的安装需要较多的步骤，应查看官方文档（https://facebook.github.io/react-native/docs/android-setup.html）中最新的安装说明。需要注意的是，这些安装说明都假设你没有安装过 Android 开发环境。总体而言，安装分为三个主要阶段：安装 SDK、安装模拟器工具、创建模拟器。
1、需要安装 JDK（Java 开发工具包）和 Android SDK。
2、配置 ANDROID_HOME 环境变量
3、命令行执行 android 命令，从而打开 Android SDK 管理器。等待 SDK 管理更新并下载开发包列表。部分开发包会被默认选中，另外要确保选中了以下选项：
* Android SDK Build-tools version 23.0.1
* Android 6.0 (API 23)
* Android Support Repository
然后，点击 Install Packages 并接受合适的许可。等待安装完成可能会花费一些时间。
4、安装模拟器和相关的工具
再次运行 android 来启动 Android SDK 管理器。我们将安装一些其他的包。
• Intel x86 Atom System Image (for Android 5.1.1–API 22)
• Intel x86 Emulator Accelerator (HAXM installer)
