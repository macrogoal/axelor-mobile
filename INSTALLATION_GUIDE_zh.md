Ubuntu平台安装指南

## :leaves: 开发环境搭建

### 安装NodeJS

```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

详细文档请参阅 https://github.com/nodesource/distributions

检查NodeJS版本，运行 `node --version`

安装NodeJS后，npm也会一并安装。检查npm版本使用 `npm -version`

本项目基于Node版本 **16.x**

### :coffee: 安装Java 11

本项目需要Java 11。检查Java版本使用 `java -version`。

安装Java 11请运行：
`sudo apt install openjdk-11-jre-headless`

### :airplane_departure: 设置Android开发环境

首先，[下载Android Studio](https://developer.android.com/studio/index.html)来管理SDK和虚拟设备（[React Native文档](https://developer.android.com/studio/index.html)）。

下载完成后，使用以下命令解压：

```
tar -xf android-studio-xxxx.x.x.x-linux.tar.gz
```

然后运行以下命令启动Android Studio：

```
cd android-studio/bin
./studio.sh
```

这将启动安装过程，请按照标准步骤进行。
当进入欢迎界面后，启动SDK管理器

![](https://i.imgur.com/l0JZyPX.png)

在**SDK平台**选项卡中，确保至少安装了Android 10.0。

在**SDK工具**选项卡中，选中"显示包详情"复选框，并确保CMake版本为3.18.1和3.22.1。Android SDK需要至少安装版本30和31。您还需要安装Android模拟器和Android SDK平台工具。

![](https://i.imgur.com/VNOEKVa.png)

接下来，您需要设置环境变量。

将以下行添加到您的$HOME/.bash_profile或$HOME/.bashrc配置文件中：

```
export ANDROID_SDK_ROOT=$HOME/<Android文件夹路径>/Android/Sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

然后运行 `source .bashrc` 更新路径，并使用 `echo $ANDROID_SDK_ROOT` 检查是否设置成功。

下一步是使用Android Studio中的**虚拟设备管理器**创建一个虚拟设备。选择一个手机型号并下载系统镜像。

## :rocket: 启动项目

开发环境搭建完成后，您可以使用以下命令克隆项目：

```
git clone git@github.com:axelor/axelor-mobile.git
cd axelor-mobile/
```

本项目使用yarn运行。您可以使用以下命令安装yarn并检查版本。

```
sudo npm install --global yarn
yarn --version
```

安装依赖项，请运行：

```
yarn clean && yarn
```

一些重要的命令：

- `yarn start` 启动metro服务。
- `yarn android` 在虚拟设备上安装Android调试应用。
- `yarn dev` 启动开发环境，使您能够在应用中实时查看包中所做的更改。

一些有助于保持代码库整洁的辅助命令：

- `yarn format` 检查项目中文件的格式。
- `yarn lint` 检查项目中的eslint问题。
