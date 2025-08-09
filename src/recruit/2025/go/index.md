---
title: Go
sidebar: true
author: [
  {
    name: '许伟强',
    url: ''
  },
  {
    name: '杨泽勋',
    url: ''
  },
 {
    name: '秦川',
    url: ''
  },
  {
    name: '梁佳琦',
    url: ''
  },
]
---

## 提交方式

### 提交地址

@许伟强 2629162585@qq.com（提交后请确保收到确认回复）

#### 完成要求

请提交相关源代码，并在md文档中附上编译运行结果截图。认真回答我们提出的问题，不仅仅包含你的答案，也包含你遇到的问题和解决方案，体现你的思考和理解，我们非常希望看到你的成长（有不懂的欢迎拷打出题人）。

请创建一个文件夹来保存你做题的答案。示例的文件夹的结构如下，在src文件夹下保存源代码，在notes文件夹下保存笔记，为每一道题都新建一个md文件（项目题算一道题）。特别注意md文档实际上不存储图片，你的所有图片请放在image文件夹中，md文档中的图片一律使用诸如`images\1234ans.png`
的相对路径。

```Bash
submission/
│
├── src/                    # 源代码文件夹
│   ├── 命令行参数/  
│   |   └── main.go          
│   ├── 数组与切片/        
│   ├── Map/               
│   └── ...                 # 其他源代码文件夹
│
├── notes/                  # 笔记文件夹
│   ├── images/				# 图片文件夹
│   ├── 命令行参数.md        
│   ├── 数组与切片.md      
│   ├── Map.md            
│   └── ...                 # 其他笔记文件
```

#### 提交格式

将文件夹打包成`.zip`压缩包，重命名为`学号-姓名-方向`，示例压缩包为`2023090309023-小明-Go.zip`。

## 简介

欢迎各位2025级的同学点开2025年YOLO工作室Go语言招新题，探索Go语言的神奇。我们期待你加入工作室，一起学习技术，探讨相关知识，共同进步；加入工作室，你也将得到学长学姐们在学业、生活上更多的指导。本文，我们将试图带你走进Go语言，学习Go语言的基础知识，包括命令行参数、数组与切片、Map等知识，了解Gin这个Web框架。

什么是Go语言？

> **Go**（又称**Golang**）是[Google](https://zh.wikipedia.org/wiki/Google)
> 开发的一种[静态](https://zh.wikipedia.org/wiki/静态类型)[强类型](https://zh.wikipedia.org/wiki/強類型)、[编译型](https://zh.wikipedia.org/wiki/編譯語言)、[并发型](https://zh.wikipedia.org/wiki/並行計算)
> ，并具有[垃圾回收](https://zh.wikipedia.org/wiki/垃圾回收_(計算機科學))
> 功能的[编程语言](https://zh.wikipedia.org/wiki/编程语言)。
>
> ——wiki

Go语言是由Google公司开发的开源语言，在语法上属于类C语言，被称为"21 世纪的 C 语言"，具有开发速度快、编写规范等特点。Go语言作为编译型语言，运行速度快，且很好地支持并发，有垃圾回收机制，因此广泛运用于Web后端开发、微服务和云原生、分布式系统等领域。

国内有很多大公司在使用Go语言开发，如字节跳动、腾讯等大厂，所以说有很多机遇在等待你，不用担心没米赚。但是想着挣大钱之前，让我们先来学习一下Go语言。

## 做题前的准备

1. 安装Go语言包（下载地址：[The Go Programming Language](https://golang.google.cn/)）
2. 安装GoLand（推荐）或者VSCode
3. 学习markdown语法来编写你的文档，推荐使用typora
4. 巧用AI，但是一定要有自己的理解和思想

### Tips

- [Go语言之旅](https://tour.go-zh.org/list)
- [Go语言圣经](https://gopl-zh.github.io/index.html)
- [【尚硅谷】Golang入门到实战教程](https://www.bilibili.com/video/BV1ME411Y71o/?spm_id_from=333.337.search-card.all.click&vd_source=508ff6de5741809cb4d996942618d73b)

- [Go 语言教程 | 菜鸟教程](https://www.runoob.com/go/go-tutorial.html)

以下是丁神语录：如果你想要进入大厂或外企，最好有一定的刷题量，所以大一开始接触Leetcode（而不是ACM如果是OI爷另说）对以后找工作更有帮助。这里也推荐几个辅助刷题的网站：代码随想录，和labuladong的算法小抄（现在好像要钱了，差评）。也可以自行搜索关注B站上讲解Leetcode题目的up主。

（网上还有个超牛的霜神，写了本用Go语言刷LeetCode的大集锦——[序 | LeetCode Cookbook (halfrost.com)](https://books.halfrost.com/leetcode/)）

## Go基础

### 一、命令行参数

出题人：@杨泽勋 3046250185@qq.com

知识点：命令行参数、编译运行

#### 你需要解决的问题

- Go语言基本语法以及相关环境的配置。
- 了解命令行参数的相关概念。
- 学会在终端上直接编译运行文件

#### 题目描述

> 实现一个能够打印出所输入命令行参数中最大数字的程序。需完成编译并以可执行文件的方式运行。

> 例如程序名为max，输入如下：

```Plaintext
./max 123 23 3
```

> 输出为：123

#### tips

- 学会Go语言中如何调取命令行参数
- 学会Go语言中如何将字符串转化为int类型

#### 题后思考

- 该程序倘若输入的命令行参数不是数字，那最大值的选取规则如何？
- 该程序倘若不将命令行参数转化为int类型就比较大小，最终结果还会一样吗？为什么？

### 二、数组与切片

出题人：@秦川 2294818214@qq.com

知识点：数组、切片

#### 你需要解决的问题

1. **Go语言中数组与切片的创建方式**
2. **数组和切片有什么区别?**
3. **切片的扩容策略**

#### 题目描述

给定一个**有且只有n个正整数**的**非空**数组 nums 。请你判断是否可以将这个数组分割成两个子集，使二者的元素和相等。

函数原型如下：

```Go
func canPartition(nums []int) bool {
    //To Do
}
```

[原题：分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/description/)

#### 测试用例

**示例 1：**

> **输入：**nums = [1,1,4,5,1,4] **输出：**true **解释：**数组可以分割成 [1,1,1,5] 和 [4,4] 。

**示例 2：**

> **输入：**nums = [1,9,1,9,8,1,0] **输出：**false **解释：**数组不能分割成两个元素和相等的子集。

### 三、Map

出题人：@秦川 2294818214@qq.com

知识点：Map

#### 你需要解决的问题

1. **map的基本概念和用途**
2. **map的底层结构（了解哈希表）**
3. **map的扩容策略**

#### 题目描述

> 给定两个二维整数数组 items1 和 items2 表示两个物品集合。items[i] = [value_i, weight_i] 其中 value_i 表示第 i 件物品的价值,
> weight_i 表示第 i 件物品的重量。同一 items 数组中每件物品的价值是唯一的。
>
> 你需要返回一个 map[int]int ，其中每个键（物品的价值）所对应的值是所有具有该价值的物品的**总重量**。

函数原型如下：

```Go
func mergeItems(items1, items2 [][]int) map[int]int {
    //To Do
}
```

[原题：合并相似物品](https://leetcode.cn/problems/merge-similar-items/description/)

#### 测试用例

**示例 1：**

> **输入：**items1 = [[1,1],[4,5],[3,8]], items2 = [[3,1],[1,5]] **输出：**map[1:6 3:9 4:5] **解释：** value = 1 的物品在
> items1 中 weight = 1 ，在 items2 中 weight = 5 ，总重量为 1 + 5 = 6 。 value = 3 的物品再 items1 中 weight = 8 ，在 items2 中
> weight = 1 ，总重量为 8 + 1 = 9 。 value = 4 的物品在 items1 中 weight = 5 ，总重量为 5 。

**示例 2：**

> **输入：**items1 = [[1,1],[3,2],[2,3]], items2 = [[2,1],[3,2],[1,3]] **输出：**map[1:4 2:4 3:4] **解释：** value = 1 的物品在
> items1 中 weight = 1 ，在 items2 中 weight = 3 ，总重量为 1 + 3 = 4 。 value = 2 的物品在 items1 中 weight = 3 ，在 items2 中
> weight = 1 ，总重量为 3 + 1 = 4 。 value = 3 的物品在 items1 中 weight = 2 ，在 items2 中 weight = 2 ，总重量为 2 + 2 = 4 。

### 四、接口与方法

出题人：@梁佳琦 2111691053@163.com

知识点：面向对象思想、接口

#### ”面向对象“初探

面向对象是编程中极为重要的一种思想，现代编程语言大多是基于面向对象的思想设计的，go虽然并不是一门典型的面向对象的语言（在面向对象上和JAVA、C++差别挺大的），但go也支持面向对象中的方法、接口、继承、多态等概念。这里只简单学习接口与方法的知识。

#### 你需要解决的问题

- 简单谈谈你对类的理解
- 方法和函数的区别
- 简单谈谈go中方法的继承
- 接口的意义是什么，谈谈你对“抽象”的理解
- go中的接口和其他语言（比如Java）中的有什么区别
- 简单谈谈空接口
- （拓展）go在执行时是如何通过接口找到对应类的方法的呢

#### 题目描述

暑假回味童年的小电在看神奇宝贝的时候灵机一动，想自己也实现一个简单的回合制游戏，他正好刚刚学习了面向对象的编程思想，不过他只完成了游戏的框架便玩黑神话去了。他希望你能帮他完成剩下的部分。

你需要帮他完成接口的实现，并在结算血量函数中通过接口调用写入血量的方法，更新传入对象的血量。

可能的输出结果：

```Plain
小电 的 皮卡丘 使用了技能造成 100 点伤害
小火龙 的血量为 50
小火龙 使用了技能造成 80 点伤害
皮卡丘 的血量为 120
小电 的 皮卡丘 使用了技能造成 100 点伤害
小火龙 的血量为 0
游戏结束
```

#### 文件结构

游戏实现分为三个文件:

```Plain
game/
│
├── main.go         # 项目的入口文件
├── interface.go    # 定义接口和通用函数
└── method.go       # 实现接口的方法
```

main函数已经给你写好了，简直不要太简单。

```Go
//main.go
package main

func main() {
    //完成对对象的创建并通过接口传入
    Sub := NewMyGenie("小电", "皮卡丘", 200)
    Obj := NewEnemy("小火龙", 150)
    //游戏开始循环
    var flag bool = true
    for flag {
        flag = OneRound(Sub, Obj)
    }
}
```

interface.go文件中包含游戏需要的接口和通用函数，需要你实现函数CountBlood（通过接口对方法进行调用）

```Go
//interface.go
package main

import "fmt"

type Genie interface {
    setName(string)//写入名字
    GetName() string
    setBlood(int)//写入血量
    GetBlood() int
    UseSkill() int
}

//结算血量
func CountBlood(g Genie, bloodval int) {
    //TODO
}

//每个回合
func OneRound(Sub Genie, Obj Genie) bool {
    CountBlood(Obj, Sub.UseSkill())
    flag := ifContinue(Sub, Obj)
    if flag {
        CountBlood(Sub, Obj.UseSkill())
        flag = ifContinue(Sub, Obj)
    }
    return flag
}

//判断能否继续游戏
func ifContinue(Sub Genie, Obj Genie) bool {
    if Sub.GetBlood() == 0 || Obj.GetBlood() == 0 {
        fmt.Println("游戏结束")
        return false
    }
    return true
}
```

method.go中已经给出类的定义以及部分方法，你需要补全剩下的方法来实现Genie接口。

```Go
//method.go
package main

import "fmt"

type MyGenie struct {
    player string
    name   string
    blood  int
}

//创建实例
func NewMyGenie(Player string, Name string, Blood int) *MyGenie {
    G := &MyGenie{player: Player}
    G.setName(Name)
    G.setBlood(Blood)
    return G
}

func (G *MyGenie) UseSkill() (bloodVal int) {
    bloodVal = 100
    fmt.Println(G.player, "的", G.name, "使用了技能造成", bloodVal, "点伤害")
    return bloodVal
}

type Enemy struct {
    name  string
    blood int
}

//创建实例
func NewEnemy(Name string, Blood int) *Enemy {
    E := &Enemy{}
    E.setName(Name)
    E.setBlood(Blood)
    return E
}

func (E *Enemy) UseSkill() (bloodVal int) {
    bloodVal = 80
    fmt.Println(E.name, "使用了技能造成", bloodVal, "点伤害")
    return bloodVal
}
```

### 五、Goroutine和Channel

出题人：@杨泽勋 3046250185@qq.com

知识点：进程与线程、并发与并行、Goroutine和Channel

#### 你需要解决的问题

- 进程与线程的相关概念与区别。
- 什么是并发？什么是并行？
- goroutine的使用方法
- channel的相关概念以及使用方法
- 线程安全的概念

#### 题目描述

> 你是一名星露谷农场的农夫，春天到了你准备开始种防风草并在皮埃尔杂货店购买了一百枚种子。现在你已经开垦了一个大小为10x10的农田并准备进行种植。

```Go
//单人种植
//其中问号是需要填写的部分
package main

import (
        "fmt"
        "time"
)

func main() {
        var field [10][10]int //开垦了面积大小为一百的农田
        ParsnipNum := 100     //一共要种植一百个防风草
        Player := 1           //玩家数量目前为一个

        /*
                ?
                在这之间创建一个管道模拟储物箱，将序号从1到100的防风草放置进去便于后续拿取。
                管道名称为PlantNum
        */

        plant(&field, PlantNum, Player) //开始种植

        fmt.Println(field) //观察是否全部种植

}

func plant(field *[10][10]int, PlantNum chan int, Player int) {
        for i := 0; i < 10; i++ {
                for j := 0; j < 10; j++ {
                        if field[i][j] != 0 {
                                continue
                        }
                        time.Sleep(time.Microsecond * 100) //种植所需要耗时
                        index := <-PlantNum                //从储物箱中拿取种子
                        field[i][j] = 1                    //成功种植
                        fmt.Printf("第%d个玩家种植了第%d个防风草\n", Player, index)
                }
        }
}
```

> 你的三个好朋友听说这件事决定帮助你一起种植。现在通过goroutine模拟四个玩家种植100个防风草吧。

```Go
package main

import (
        "fmt"
        "time"
        "sync"
)

var m sync.Mutex

func main() {
        var field [10][10]int //开垦了面积大小为一百的农田
        ParsnipNum := 100     //一共要种植一百个防风草

        /*
                ?
                在这之间创建一个管道模拟储物箱，将序号从1到100的防风草放置进去便于后续拿取。
                管道名称为PlantNum
        */

        for player := 1; player <= 4; player++ {
                //?
        }//四名玩家一起种植防风草

    for len(PlantNum) != 0 {
        }//便于观察结果
    
        fmt.Println(field) //观察是否全部种植

}

func plant(/* ？ */) {
        //？
}
```

#### 完成要求

- 在保证线程安全的情况下补全相关代码(使用sync包中的Mutex互斥锁)
- 补全单人种植
- 补全多人种植，其中plant函数种植部分可以在单人模板上进行修改，也可以自己补全函数(
  若自己补全函数，需要将成功种植的位置改为1如单人模板示例)

#### Tips

- [Go sync.Mutex - 简书](https://www.jianshu.com/p/9e5554617399)
- [golang 并发编程](https://zhuanlan.zhihu.com/p/113507545)
- [go中数组、切片、map是否线程(并发)安全？_go map 线程安全-CSDN博客](https://blog.csdn.net/qq_42410605/article/details/128089819#:~:text=非线程安全原因Go其他数据类型的并发安全性)

#### 题后思考：

- 什么是阻塞？
- 什么是死锁？如何处理死锁？
- 尝试用channel替代互斥锁

## Gin框架后端项目

出题人：@许伟强 2629162585@qq.com

知识点：HTTP协议、RESTful API、JSON、Gin框架、GORM、数据库

### 引言

温馨提醒：请在开始使用Gin框架前使用前熟练掌握Go语言基础，这部分内容需要学习较多的前置知识。

你有没有想过，每次你登录应用、发消息、在线购物时，背后到底发生了什么？其实，这就是后端开发的世界——一个控制数据流动、保证服务稳定、让整个系统在用户看不见的地方默默运转的地方。

在开始之前我们得了解一下什么是前端，什么是后端。**前端**是用户能看见和操作的部分，负责展示和交互，像网页和小程序这些可以直接看到的内容。
**后端**是用户看不见的部分，负责逻辑处理、数据管理和响应请求。

如果前端是舞台上的灯光和演员，那后端就是舞台背后的机械、音效和控制室，它们确保每场表演都顺利进行。后端开发不仅是让网站能跑起来，更是掌控数据、优化性能、设计高效系统的艺术。

连接用户的需求与数据、解决一个个“看不见”的挑战；写出让成千上万用户轻松互动的代码；设计出能支撑高并发的架构。这些听起来很高大上，但是都是后端的日常。看到这里，想必你对后端开发也有了点兴趣了吧！

### 一、什么是Gin框架

Gin 是一个用于 Go 语言的高性能 Web 框架。它以其简洁的设计和高效的性能而受到广泛欢迎，是构建 Web 应用和 RESTful API
的一个非常流行的选择。完成本阶段项目，需要重点掌握路由和HTML渲染。

学习资料：

- [Gin框架介绍及使用 - 李文周的博客](https://liwenzhou.com/posts/Go/gin/)
- [【最新Go Web开发教程】基于gin框架和gorm的web开发实战 (七米出品)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1gJ411p7xC/?share_source=copy_web&vd_source=754c29f5132127c81e7a06542776d77c)

### 二、环境搭建

下载和安装Gin框架，在终端执行以下命令即可：

```Go
go get -u github.com/gin-gonic/gin
```

### 三、HTTP、RESTful API、JSON

#### HTTP

每天上网的时候都能看到网站地址的前缀基本都是http或者https，你是否对它产生过好奇呢？这次让我们好好地学习一下HTTP协议吧。该部分主要涉及到计算机网络的知识，感兴趣的同学可以多了解了解（没有坏处）。

学习资料：

- [HTTP是什么？_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1zb4y127JU/?share_source=copy_web&vd_source=754c29f5132127c81e7a06542776d77c)
- [HTTP协议超级详解_xttb协议-CSDN博客](https://blog.csdn.net/alokka/article/details/115981135)
- [HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)

多问些问题是可以检验对知识掌握程度的，请在认真学习后回答以下问题：

1. 什么是URI？什么是URL？
2. HTTP协议的主要工作流程是什么样的？
3. HTTP协议有哪些常见的请求方式？
4. HTTP协议有哪些常见的状态码？

#### RESTful API

REST的全称是**Representational State Transfer**，**表现层状态转化**，RESTful代表着一种软件编写风格。话不多说，上学习资料！一样的，多问问题来检验自己的掌握程度：

1. RESTful的资源指的是什么？
2. RESTful风格和传统模式有什么区别？

学习资料：

- [RESTful 风格(详细介绍 + 案例实现)_resultful风格开发-CSDN博客](https://blog.csdn.net/zzvar/article/details/118164133)

#### JSON

简单掌握JSON格式即可，前后端传递数据时多用JSON格式文本。

学习资料：

- [Json 详解，5分钟学会_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1We411y7wn/?share_source=copy_web&vd_source=754c29f5132127c81e7a06542776d77c)
- [JSON 语法 | 菜鸟教程](https://www.runoob.com/json/json-syntax.html)

### 四、Hello, world!

Talk is easy, show me your code! 现在正式开始用gin框架写一个helloworld吧。

gin框架使用的简单流程如以下代码所示，首先需要创建路由引擎，然后编写对应请求方法的路由以及处理函数，最后是将服务在具体的端口启动。你可以试着敲敲以下的代码，然后运行它，在浏览器中输入127.0.0.1:8080就能看到响应的JSON文本了。

```Go
package main

import (
        "github.com/gin-gonic/gin"
)

func main() {
        // 创建一个默认的路由引擎
        r := gin.Default()
        // GET：请求方式；/hello：请求的路径
        // 当客户端以GET方法请求/hello路径时，会执行后面的匿名函数
        r.GET("/hello", func(c *gin.Context) {
                // c.JSON：返回JSON格式的数据
                c.JSON(200, gin.H{
                        "message": "Hello world!",
                })
        })
        // 启动HTTP服务，默认在0.0.0.0:8080启动服务
        r.Run()
}
```

你可能会对gin.Context和gin.H的具体含义有疑惑，请查看注释或者上网搜索获得更多的描述信息。

### 五、项目

为了让你进一步体验Gin框架的Go后端开发，我们准备了一个很小的项目，主要实现最基本的注册和登录逻辑，使用文本文件来模拟存储用户数据。

#### 项目结构

在项目结构上比较简单，请按照以下的顺序创建文件夹和文件。如果你是在GOPATH以外的地方创建项目，别忘了加上go.mod（放在src或者gin-simple-login文件夹下都可以，但是一定得有）。

```Go
gin-simple-login/
│
├── src/
|   ├── main.go       # 项目入口，启动 Gin 服务
|   ├── handler.go    # 处理路由、请求和响应逻辑
|   ├── utils.go      # 工具函数，例如用户数据验证和文件操作
|   ├── go.mod        # Go 模块管理文件
├── templates/        # 用于存放 HTML 模板的文件夹
│   └── index.html    # 登录/注册的页面模板
└── data/             # 存储模拟数据的文件夹
    └── users.txt     # 模拟用户数据存储，格式为逐行的"username:password"
```

##### main函数

在main.go中编写main函数，基本都给你写好了。

```Go
//main.go
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    //创建Gin实例
    r := gin.Default()
    // 加载 HTML 模板
    r.LoadHTMLGlob("./templates/*")
    // 设置静态文件目录（如果有额外的 CSS/JS）
    //r.Static("/templates", "./templates")
    // 路由设置
    r.GET("/", Index) //GET请求访问路径"/"，调用Index函数处理
    r.POST("/register", Register)
    r.POST("/login", Login)
    //启动服务器
    r.Run()
}
```

##### 路由处理函数

在handler.go里面编写路由处理函数

```Go
//handler.go
package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

// 用户数据结构
type User struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

// 首页
func Index(c *gin.Context) {
    //TODO
}

// 用户注册函数
func Register(c *gin.Context) {
    //TODO
}

// 用户登录处理函数
func Login(c *gin.Context) {
    //TODO
}
```

##### 工具函数

在utils.go中编写验证和保存用户数据的函数，会使用到GO语言的IO操作，如读写文件。

```Go
//utils.go
package main

import (
    "bufio"
    "os"
    "strings"
)

// 检查用户是否存在
func userExists(username string) bool {
    //TODO
}

// 验证用户密码
func validateUser(username, password string) bool {
    //TODO
}

// 保存用户数据到文件
func saveUser(user User) error {
    //TODO
}
```

#### 编译运行

在src目录下执行`go build main.go`，会在src目录下生成可执行文件`main.exe`，在终端输入`./main.exe`即可运行程序。

#### 测试

你需要测试程序的正确性，为了更好地测试，推荐下载并安装Postman，通过Postman向你编写的程序发起请求，请求的内容应该是JSON格式的文本。建议对正常执行的结果，在返回体中添加”message“和对应的正确信息；对错误结果返回”error“和对应的错误信息，应该包含登陆成功、登陆失败、注册成功、注册失败四种情况。

- 下载地址：[www.postman.com](https://www.postman.com/downloads/)

#### 前端网页

你或许对冷冰冰的后端数据感觉没那么直观，为了让你更直观地看到数据交互的效果，我为你准备了一个HTML文件（index.html）用于前端展示，可以直接使用，尝试着在Gin框架中融入使用HTML渲染吧。

温馨提示：HTML渲染是Gin框架自带的功能，属于前后端不分离。感兴趣的同学可以了解一下web开发的几种模式，包括什么是前后端分离，什么是前后端不分离。

代码如下:

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Authentication</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        input[type="text"], input[type="password"], input[type="email"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }

        .toggle-form {
            text-align: center;
            margin-top: 10px;
            cursor: pointer;
            color: #007bff;
        }

        .toggle-form:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
<div class="container">
    <h2 id="form-title">Login</h2>
    <form id="auth-form">
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit">Submit</button>
    </form>
    <div class="toggle-form" id="toggle-form">
        Don't have an account? Register here.
    </div>
</div>

<script>
    const formTitle = document.getElementById("form-title");
    const authForm = document.getElementById("auth-form");
    const toggleForm = document.getElementById("toggle-form");

    let isLogin = true;

    toggleForm.addEventListener("click", () => {
        isLogin = !isLogin;
        if (isLogin) {
            formTitle.textContent = "Login";
            toggleForm.textContent = "Don't have an account? Register here.";
        } else {
            formTitle.textContent = "Register";
            toggleForm.textContent = "Already have an account? Login here.";
        }
    });

    authForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const endpoint = isLogin ? "/login" : "/register";
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        });

        const result = await response.json();
        // 根据后端返回的字段显示对应的信息
        if (result.error) {
            alert(result.error);  // 处理错误信息
        } else if (result.message) {
            alert(result.message);  // 处理成功信息
        }

        if (response.ok && isLogin) {
            // Redirect to another page on successful login (optional)
            // window.location.href = "/dashboard";
        }
    });
</script>
</body>
</html>
```

### 六、拓展选做

#### 数据库使用

在实际的开发和生产中，往往需要大规模的数据存储和查询，对数据完整性和查询速度有一定的要求，单纯地使用文本文件是难以应对的，因此数据库应运而生。

什么是数据库？

> 简单来说，数据库是一种用于存储和管理数据的软件系统。它帮助我们以结构化的方式存储信息，并允许我们快速查询、更新和删除这些信息。最常见的数据库有
> SQLite、MySQL 和 PostgreSQL。

什么是SQLite？

> SQLite是一个进程内的库，实现了自给自足的、无服务器的、零配置的、事务性的 SQL
> 数据库引擎。它是一个零配置的数据库，这意味着与其他数据库不一样，不需要在系统中配置。她不用像其他数据库一样进行复杂的配置，所以用它来试试手吧！

什么是SQL？

> SQL（Structured Query Language，结构化查询语言）是一种用于管理和操作关系型数据库的标准编程语言。它允许用户创建、读取、更新和删除数据库中的数据。

什么是GORM？

> GORM 是一个用于 Go 语言的 ORM（Object-Relational Mapping，对象关系映射）库。它简化了数据库操作，通过将数据库表映射到 Go
> 语言中的结构体，使开发人员能够使用面向对象的方式来操作数据库。GORM 提供了一种高层次的接口，使得数据库操作更加直观和简便。

任务：在Go语言中使用SQLite，简单学习SQL语句或者GORM模型，修改项目（适当增加或修改文件和函数），改用数据库存储和读取用户数据。

学习资料：

- [Go 连接 SQLite 基础教程](https://www.sjkjc.com/posts/golang-basic-sqlite/)
- [www.cnblogs.com](https://www.cnblogs.com/cheyunhua/p/18301935)
