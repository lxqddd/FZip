# FZip [![Build Status](https://travis-ci.org/audiojs/audio-play.svg?branch=master)](https://travis-ci.org/audiojs/audio-play)

## 项目介绍

一个将文件或目录压缩为 zip 格式的命令行工具

## 使用方法

[![NPM](https://nodei.co/npm/npm.png?mini=true)](https://nodei.co/npm/npm/)

## 参数说明

| 参数 | 参数来源 | 参数注解                                         |
| ---- | -------- | ------------------------------------------------ |
| -f   | From     | 压缩目标来源（必选）                             |
| -o   | Output   | 压缩产物输出位置（可选，不传则为来源同级目录）   |
| -l   | Level    | 压缩级别 0~9（可选，不传则默认为 6）             |
| -n   | Name     | 压缩包名称（可选，不传则默认为文件或目录的名字） |
| -h   | help     | 查看帮助                                         |
| -V   | version  | 查看版本                                         |

## 使用示例

```tree
.
├── LICENSE
├── README.md
├── gulpfile.js
├── package.json
├── src
│   ├── cli.ts
│   ├── core
│   │   └── index.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── index.ts
├── tsconfig.json
└── yarn.lock

```

- 基础用法

  - `fzip -f ./src`，指令执行之后会在 `src` 的同级目录输出一个 `src.zip` 的压缩包。

- 指定输出位置

  - `fzip -f ./src -o ~/Desktop`，指令执行之后会在桌面上输出一个 `src.zip` 的压缩包。

- 指定压缩等级

  - `fzip -f ./src -o ~/Desktop -l 9`，压缩产物的压缩级别为 9。

- 重命名

  - `fzip -f ./src -n test`，指令执行之后会在 `src` 的同级目录下输出一个名为 `test.zip` 的压缩包。

- 不指定参数
  - `fzip ./src`，指令执行之后会在 `src` 的同级目录下输出一个名为 `src.zip` 的压缩包，这是一种懒惰的做法，我不建议这么做！如果在指令后边跟了多个路径，则默认制取第一个。

> 上边说的都是压缩目录的，也可以压缩单个文件，使用方法类似，只需要将输入路径指向被压缩的目标文件即可。

- 压缩单个文件
  - `fzip -f ./src/cli.ts -o ~/Desktop -n test -l 9`，指令执行之后会在桌面输出一个名为 `test.zip` 的压缩包。
