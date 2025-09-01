# 后端GO方向考核题
> > 从零到一，铸造你的第一个高并发短链接服务

**嘿，未来的顶尖工程师！**

欢迎来到 YOLO2025 GO 团队的这场特殊“试炼”。我们不相信冰冷的八股文，我们只信奉一行行鲜活的代码和那份将想法变为现实的极客热情。

在这里，你将告别枯燥的理论，亲手打造一个从无到有的简单短链接服务。这不仅是一次挑战，更是一场沉浸式的创造之旅。你准备好从“解题者”蜕变为“缔造者”了吗？

**我们的征途：星辰大海 or 短链接？**

想象一下，当一个冗长复杂的网址（比如 `https://www.example.com/a/very/long/path`）在你手中，瞬间化作一个干净利落的短链接（比如 `http://yolo.link/Abc123`），并能在毫秒之间触达全球用户。这背后，是技术与艺术的完美结合，是高性能、高可用、高并发的极致追求。

**你的使命：**

跟随我们的蓝图，你将分阶段攻克这个服务的心脏地带。每一关，都是一个真实世界的技术难题，等待你用智慧和代码去征服。

准备好点燃你的代码引擎，开启这场激动人心的构建之旅了吗？Let's Go!

## 1.1 第一部分：奠定服务基石 —— 核心数据结构设计

万丈高楼平地起，一个伟大的服务，其根基正是那看似不起眼却至关重要的数据结构。在我们的短链接世界里，核心魔法就是建立“短链接”与“原始长链接”之间的时空隧道。这一章，我们将深入 Go 语言的微观世界，探索内存、指针的奥秘，看看你是否能驾驭它们，为我们的服务打下坚如磐石的地基。

### 1.1.1 场景一：短链接的创建与追踪

我们需要一个函数来创建新的短链接记录。为了在服务的各个模块之间高效地传递和修改这条记录，我们大量使用了指针。

**请阅读以下代码：**

```Go
package main

import "fmt"

// LinkRecord 代表一条短链接记录
type LinkRecord struct {
    ShortPath string
    OriginalURL string
    VisitCount int
}

// updateVisitCount 尝试通过值传递来增加访问次数
func updateVisitCount(record LinkRecord) {
    record.VisitCount++
}

// effectiveUpdateVisitCount 通过指针来实际增加访问次数
func effectiveUpdateVisitCount(record *LinkRecord) {
    (*record).VisitCount++
}

// setOriginalURL 尝试修改原始URL
func setOriginalURL(record *LinkRecord, newURL string) {
    // 模拟一个场景：我们尝试将指针指向一个新的内存地址
    tempRecord := LinkRecord{ShortPath: record.ShortPath, OriginalURL: newURL, VisitCount: record.VisitCount}
    record = &tempRecord
}

// createLinkRecord 创建一个新的短链接记录并返回其指针
// 这个函数模拟了记录在数据库中创建并加载到内存中的过程
func createLinkRecord(shortPath, originalURL string) *LinkRecord {
    record := LinkRecord{
        ShortPath:   shortPath,
        OriginalURL: originalURL,
        VisitCount:  0,
    }
    return &record
}

func main() {
    // 挑战1：值传递 vs 指针传递
    link1 := LinkRecord{ShortPath: "abc", OriginalURL: "http://example.com", VisitCount: 10}
    updateVisitCount(link1)
    fmt.Printf("挑战1 - 值传递后，访问次数: %d", link1.VisitCount)

    effectiveUpdateVisitCount(&link1)
    fmt.Printf("挑战1 - 指针传递后，访问次数: %d", link1.VisitCount)

    // 挑战2：指针本身的传递
    link2 := LinkRecord{ShortPath: "def", OriginalURL: "http://google.com", VisitCount: 5}
    setOriginalURL(&link2, "http://new-google.com")
    fmt.Printf("挑战2 - setOriginalURL后，原始URL: %s", link2.OriginalURL)

    // 挑战3：变量的生命周期与逃逸分析
    newLink := createLinkRecord("xyz", "http://yolo.tech")
    fmt.Printf("挑战3 - 新创建的链接，访问次数: %d", newLink.VisitCount)
}
```

**请解答以下问题：**

1. **值传递 vs 指针传递：**
    1. 在“挑战1”中，为什么`updateVisitCount`函数未能成功修改`link1`的`VisitCount`，而`effectiveUpdateVisitCount`却成功了？请从 Go 函数调用的内存工作机制角度解释其本质区别。
2. **指针本身的传递：**
    1. 在“挑战2”中，`setOriginalURL`函数的本意是修改`link2`的`OriginalURL`。你认为它的输出结果会是什么？为什么没有达到预期的效果？这属于“引用传递”吗？
3. **逃逸分析入门：**
    1. 在“挑战3”中，`createLinkRecord`函数内部创建的`record`变量，是分配在栈（stack）上还是堆（heap）上？请解释你的判断依据。这对服务的垃圾回收（GC）有何影响？
    2. 你可以通过 `go build -gcflags="-m"` 命令来验证你的分析。

### 1.1.2 场景二：实现一个高效的短链接生成器

现在，你需要亲手实现一个函数，该函数用于生成并初始化一个新的短链接记录。

**编码挑战：**

请实现一个 Go 函数 `generateAndInitRecord`，并编写 `main` 函数来验证其功能。

- **generateAndInitRecord** 函数要求：
    - 接收一个 `originalURL string` 作为参数。
    - 在函数内部，创建一个 `LinkRecord` 实例。
    - 为这个实例生成一个随机的、6位长的字符串作为 `ShortPath`（字符可以包含 a-z, A-Z, 0-9）。
    - 将其 `OriginalURL` 设置为传入的参数。
    - `VisitCount` 初始化为 `0`。
    - 函数需要返回创建的 `LinkRecord` 实例的**指针**。
- **main** 函数要求：
    - 调用 `generateAndInitRecord` 函数，传入一个你选择的URL。
    - 打印出返回的 `LinkRecord` 实例的 `ShortPath` 和 `OriginalURL`，以验证函数是否工作正常。

**思考题：**

1. 在你实现的 `generateAndInitRecord` 函数中，用于生成随机 `ShortPath` 的字符串或字节切片，如果被多次引用（例如，传递给其他日志函数），是否可能发生逃逸？为什么？
2. 相比于返回一个 `LinkRecord` 的值，返回指针（`*LinkRecord`）在性能上通常有何优势？尤其是在处理大量记录时。

## 1.2 第二部分：优化数据管理 —— Slice 与 Map 的妙用

当服务的流量如潮水般涌来，如何优雅地驾驭成千上万的短链接数据，就成了对架构智慧的真正考验。在这一章，我们将深入 Go 语言的“军火库”，探寻两大利器——`slice` 与 `map` 的精妙用法。你将学会如何利用它们打造高性能的内存缓存，实现闪电般的数据处理。准备好，让我们一起在数据的海洋中乘风破浪！

### 1.2.1 场景一：批量管理短链接

假设我们需要从数据库中一次性加载一批“热门”短链接到内存中进行缓存。我们使用 `slice` 来存储这些记录。

**请阅读以下代码：**

```Go
package main

import "fmt"

// LinkRecord (from Part 1)
type LinkRecord struct {
    ShortPath   string
    OriginalURL string
    VisitCount  int
}

func main() {
    // 挑战1: Slice的初始化与扩容
    // 场景A：从一个固定的数组初始化
    initialLinks := [3]LinkRecord{
        {ShortPath: "aaa", OriginalURL: "url1"},
        {ShortPath: "bbb", OriginalURL: "url2"},
        {ShortPath: "ccc", OriginalURL: "url3"},
    }
    hotLinksSlice := initialLinks[:]
    fmt.Printf("挑战1 - 初始slice: len=%d, cap=%d", len(hotLinksSlice), cap(hotLinksSlice))

    // 运营人员决定临时加入一个新的热门链接
    hotLinksSlice = append(hotLinksSlice, LinkRecord{ShortPath: "ddd", OriginalURL: "url4"})
    fmt.Printf("挑战1 - append后: len=%d, cap=%d", len(hotLinksSlice), cap(hotLinksSlice))

    // 挑战2: 预分配容量的智慧
    // 场景B：预知今天会有5个热门链接，但逐个添加
    preAllocatedSlice := make([]LinkRecord, 0, 5)
    fmt.Printf("挑战2 - 预分配slice初始: len=%d, cap=%d", len(preAllocatedSlice), cap(preAllocatedSlice))

    preAllocatedSlice = append(preAllocatedSlice, LinkRecord{ShortPath: "eee", OriginalURL: "url5"})
    preAllocatedSlice = append(preAllocatedSlice, LinkRecord{ShortPath: "fff", OriginalURL: "url6"})
    preAllocatedSlice = append(preAllocatedSlice, LinkRecord{ShortPath: "ggg", OriginalURL: "url7"})
    preAllocatedSlice = append(preAllocatedSlice, LinkRecord{ShortPath: "hhh", OriginalURL: "url8"})
    preAllocatedSlice = append(preAllocatedSlice, LinkRecord{ShortPath: "iii", OriginalURL: "url9"})
    fmt.Printf("挑战2 - 添加5个元素后: len=%d, cap=%d", len(preAllocatedSlice), cap(preAllocatedSlice))

    // 突然又需要增加一个
    preAllocatedSlice = append(preAllocatedSlice, LinkRecord{ShortPath: "jjj", OriginalURL: "url10"})
    fmt.Printf("挑战2 - 再添加1个元素后: len=%d, cap=%d", len(preAllocatedSlice), cap(preAllocatedSlice))
}
```

**请解答以下问题：**

1. **Slice 扩容机制：**
    1. 在“挑战1”中，当向 `hotLinksSlice` 添加一个新元素后，它的 `len` 和 `cap` 会变成多少？请解释 Go `slice` 在遇到容量不足时的扩容策略（可以描述大致的规则，如“翻倍”等）。
    2. 在“挑战2”中，当向 `preAllocatedSlice` 添加第6个元素后，它的 `len` 和 `cap` 又会是多少？
2. **初始化方式的抉择：**
    1. 如果我们将 `preAllocatedSlice` 的初始化方式改为 `make([]LinkRecord, 5)`，它与 `make([]LinkRecord, 0, 5)` 在初始状态下有何根本区别？这对我们后续使用 `append` 添加新链接，或者通过索引（如 `slice[0] = ...`）赋值有何影响？

### 1.2.2 场景二：实现一个内存缓存（In-Memory Cache）

为了加速短链接的查找，我们决定在服务内存中实现一个简单的缓存。这个缓存需要能够通过短链接的 `ShortPath` 快速查找到对应的 `OriginalURL`。`map` 是实现这一功能的完美选择。

**请阅读以下代码：**

```Go
package main

import "fmt"

func main() {
    // 使用 map 作为短链接缓存
    // key: ShortPath, value: OriginalURL
    linkCache := make(map[string]string)

    // 添加缓存记录
    linkCache["abc"] = "http://example.com"
    linkCache["def"] = "http://google.com"
    linkCache["xyz"] = "http://yolo.tech"

    // 遍历缓存
    fmt.Println("--- 当前缓存内容 ---")
    for shortPath, originalURL := range linkCache {
        fmt.Printf("Path: %s -> URL: %s", shortPath, originalURL)
    }
}
```

**请解答以下问题：**

1. **Map 的无序性：**
    1. 多次运行上述代码，你认为 `for range` 循环打印出缓存内容的**顺序**是固定的吗？为什么？这与 `map` 的底层数据结构（哈希表）有何关系？
2. **哈希冲突：**
    1. 当两个不同的 `shortPath`（例如 `"az"` 和 `"za"`）经过哈希函数计算后，碰巧得到了相同的存储位置（即发生“哈希冲突”），`map` 的底层会如何处理这种情况以确保两个键值对都能被正确存储和访问？

**编码挑战：**

现在，你需要扩展这个缓存，实现一个功能：**按访问频次对缓存中的链接进行排序**，以便我们分析哪些链接最受欢迎。

你需要补全下面的代码，实现一个函数 `getRankedLinks`，该函数接收一个 `map[string]int`（`ShortPath` -> `VisitCount`），并返回一个按 `VisitCount` **从高到低**排序的 `ShortPath` 列表。

```Go
package main

import (
    "fmt"
    "sort"
)

// getRankedLinks 接收一个记录访问次数的map，并返回按访问次数降序排列的短链接列表
func getRankedLinks(visitCounts map[string]int) []string {
    // TODO: 在此处编写代码，实现排序逻辑
    // 提示：你可能需要一个中间数据结构来辅助排序
    return nil // 替换为你的结果
}

func main() {
    visitCounts := map[string]int{
        "abc": 150,
        "xyz": 88,
        "def": 230,
        "ghi": 150,
        "jkl": 12,
    }

    fmt.Println("--- 热门链接排行榜 ---")
    ranked := getRankedLinks(visitCounts)

    // 打印排序结果
    for i, path := range ranked {
        fmt.Printf("Top %d: %s (访问次数: %d)", i+1, path, visitCounts[path])
    }
}
```

**预期输出（abc 和 ghi 的顺序可以不同）：**

```Plain
--- 热门链接排行榜 ---
Top 1: def (访问次数: 230)
Top 2: abc (访问次数: 150)
Top 3: ghi (访问次数: 150)
Top 4: xyz (访问次数: 88)
Top 5: jkl (访问次数: 12)
```

## 1.3 第三部分：迎接高并发挑战 —— Goroutine 并发模型

我们的短链接服务一经上线，瞬间便吸引了汹涌的流量洪峰！单枪匹马处理请求的时代已然过去，现在，是时候唤醒 Go 语言体内沉睡的巨兽——那无与伦比的并发能力了。在这一章，你将直面真实世界的高并发场景，亲手调度 `goroutine` 大军，架设 `channel` 通信管道，玩转 `select` 和 `context` 等并发神器。这不仅是对你技术的考验，更是对你作为一名架构师，能否在并发的狂潮中游刃有余、掌控全局的终极试炼。

### 1.3.1 场景一：并发处理请求

当成百上千个用户同时点击我们的短链接时，服务器需要为每个请求启动一个处理流程。我们将使用 `goroutine` 来模拟这一过程。

**背景介绍：**

- **单线程 vs. 并发：** 如果按顺序（单线程）处理请求，一个耗时100毫秒的请求会阻塞后面所有请求，导致用户需要漫长等待。而并发处理（使用 `goroutine`）则可以同时处理多个请求，大大提高系统的吞吐量和响应速度。
- **Goroutine：** 你可以把它想象成一个“轻量级”的、由 Go 语言自身管理的执行单元。启动一个 `goroutine` 的成本极低（仅需 `go` 关键字），因此我们可以轻松创建成千上万个来应对并发请求。
- **Channel：** 这是 `goroutine` 之间进行通信的“管道”。为了避免多个 `goroutine` 同时修改共享数据（如一个全局的访问计数器）而导致数据竞争，我们提倡“通过通信来共享内存”，而不是“通过共享内存来通信”。

**编码挑战：模拟并发访问**

你需要补全下面的代码。该程序会模拟多个并发请求，每个请求都会增加一个链接的访问次数。你需要使用 `goroutine` 和 `channel` 来安全地完成这个任务。

```Go
package main

import (
    "fmt"
    "sync"
)

// processRequest 模拟处理一个访问请求
// 它会接收一个用于通信的channel，并在处理完成后发送一个信号
func processRequest(requestID int, visitChan chan<- bool) {
    fmt.Printf("处理请求 #%d...", requestID)
    // 模拟一些工作，比如数据库查询
    // time.Sleep(10 * time.Millisecond)

    // TODO: 任务完成，通过 channel 发送一个 true 值，表示成功处理了一次访问
}

func main() {
    totalRequests := 1000
    visitCount := 0

    // TODO: 创建一个带缓冲的 channel，用于接收访问信号
    // 思考：为什么这里使用带缓冲的channel更好？
    var visitChan chan bool

    // 启动多个 goroutine 来模拟并发请求
    for i := 0; i < totalRequests; i++ {
        // TODO: 为每个请求启动一个 goroutine 来执行 processRequest
    }

    // TODO: 使用一个循环来收集所有 goroutine 的处理结果
    // 每从 channel 中收到一个值，就将 visitCount 加一
    // 直到收集完所有请求的结果

    fmt.Printf("所有请求处理完毕。总访问次数: %d", visitCount)
}
```

**请解答以下问题：**

1. 在你的实现中，如果不使用 `channel`，而是让每个 `goroutine` 直接执行 `visitCount++`，会有什么潜在风险？（提示：数据竞争）
2. `channel` 分为“无缓冲”和“带缓冲”两种。在这个场景中，如果使用无缓冲 `channel`，程序的行为会发生什么变化？为什么说带缓冲 `channel` 在这种“扇入”（fan-in）模式下性能可能更好？

### 1.3.2 场景二：超时控制与优雅退出

一个健壮的后端服务必须能够处理“慢请求”并能“优雅地”关闭。如果一个数据库查询卡住了，我们不能让请求永远等待下去。同样，当服务需要重启时，我们应该等待所有正在处理的请求完成后再退出。

**背景介绍：**

- **context**：** 这是 Go 中专门用于处理请求生命周期的“上下文”工具。它可以轻松地将“超时”、“取消”等信号传递给一个请求处理链上的所有 `goroutine`。
- **sync.WaitGroup**：** 这是一个“等待组”，用于等待一组 `goroutine` 全部执行完毕。你可以把它看作一个并发任务的计数器。

**编码挑战：实现一个带超时的请求处理器**

这次，你需要实现一个更复杂的请求处理循环。它会持续接收并处理请求，但整个处理过程必须在指定的时间内完成。如果超时，所有正在进行的任务都应被取消。

```Go
package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

// handleRequest 模拟一个可能耗时较长的请求处理过程
func handleRequest(ctx context.Context, wg *sync.WaitGroup, requestID int, resultChan chan<- string) {
    // TODO: 使用 defer 来确保每个 goroutine 执行完毕时，都会调用 wg.Done()

    fmt.Printf("开始处理请求 #%d", requestID)
    // 模拟一个耗时操作
    processingTime := time.Duration(50+requestID*10) * time.Millisecond

    select {
    case <-time.After(processingTime):
        // 正常处理完成
        resultChan <- fmt.Sprintf("请求 #%d 处理成功", requestID)
    case <-ctx.Done():
        // TODO: 如果 context 被取消（例如，因为超时），
        // 则向 resultChan 发送一条消息，说明该请求被取消
    }
}

func main() {
    // 创建一个带有300毫秒超时的 context
    // TODO: 创建一个 `mainCtx` 和它的 `cancel` 函数
    var mainCtx context.Context
    var cancel context.CancelFunc

    var wg sync.WaitGroup
    resultChan := make(chan string, 10)

    // 模拟连续来了5个请求
    for i := 1; i <= 5; i++ {
        // TODO: 每来一个请求，就调用 wg.Add(1) 增加计数
        // 并启动一个 goroutine 来执行 handleRequest
    }

    // 创建一个 goroutine，用于等待所有任务完成或超时
    go func() {
        // TODO: 等待所有在 wg 中注册的 goroutine 完成
        // 完成后，关闭 resultChan
    }()

    // 循环打印处理结果，直到 channel 关闭
    for result := range resultChan {
        fmt.Println(result)
    }

    fmt.Println("主程序结束。")
}
```

**请解答以下问题：**

1. `context` 在 `handleRequest` 函数中的核心作用是什么？它是如何实现将“超时”信号广播给所有正在执行的 `goroutine` 的？
2. `sync.WaitGroup` 在这个程序中扮演了什么角色？如果去掉 `wg.Wait()`，主程序可能会在所有请求处理完成前就退出，为什么？
3. `select` 语句的用途是什么？它如何帮助我们同时处理“正常完成”和“被动取消”这两种情况？
4. 如果在所有请求都处理完成后（例如，在200毫秒内），我们主动调用 `cancel()` 函数，会对程序产生什么影响？

## 1.4 第四部分：数据持久化保障 —— 数据库操作

内存中的缓存快如闪电，却也如过眼云烟，服务一旦重启，所有辉煌都将归零。真正的服务，需要一块坚实的土地来永久安放我们的宝贵数据。欢迎来到最后一站——数据库的世界。在这里，我们将以经典的 MySQL 为例，带你从零开始，亲手搭建数据表，编写 SQL，并最终挑战一个真实的性能优化难题。这不仅是对你 SQL 功底的考验，更是对你作为后端工程师，能否为数据的安全与高效提供终极保障的试金石。

### 1.4.1 场景一：数据库的建立和表的生成

想要了解数据库，肯定需要从数据库的搭建做起，千里之行，始于足下。

你需要完成的任务：

1. 在你的电脑或者服务器上下载mysql并且启动起来
2. 新建一个数据库，命名为`recruit_db`
3. 新建几张表，每张表的结构如下图

**学生表(students)**

![img](https://dcn2187ziwgk.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDVjYTYzNTM3NmNjNTFmOTI2MjUxYjBjNGE5NGQ2MTVfM1FPa0xGY0VtS0ZyMGQxbEd0Z01PdElyOHFqNFJoWW5fVG9rZW46VTdmeWIySFdLb2lCUkt4RWxIcmNMaXlFbkVlXzE3NTY2MjEwNDc6MTc1NjYyNDY0N19WNA)

**班级表(classes)**

![img](https://dcn2187ziwgk.feishu.cn/space/api/box/stream/download/asynccode/?code=YjMwMGRjZjBiYWU3YjMzOTc2OWYyOGIxMzFmODhjNTdfZEROYzZKTFFpYmFxOG5qaUNvY3p6TXg3Z2gzVFpJYjdfVG9rZW46Q1BJNGJxMmllb1JLOXd4T0t2eGM3WURRbmJoXzE3NTY2MjEwNDc6MTc1NjYyNDY0N19WNA)

**教师表(teachers)**

![img](https://dcn2187ziwgk.feishu.cn/space/api/box/stream/download/asynccode/?code=OWRmOTViZDc3MGM1NTE5ZjEwMTU1YTMyZjNiMzQ4Y2FfejJLemtEY2dvRU1YU0IxZkVkN0lNcXM0YXlDMmdRSUZfVG9rZW46RHJIWWJFRVlHb0xRODd4SFNEM2NTT3BGbmhoXzE3NTY2MjEwNDc6MTc1NjYyNDY0N19WNA)

**课程表(courses)**

![img](https://dcn2187ziwgk.feishu.cn/space/api/box/stream/download/asynccode/?code=NzViMTE2MjcyZDRiODQ0MTExNmM2NTMyYzlmOWI2NDdfMzJKeGRZNW1DY0NBdGQ0ZjRnVXpUWGlFeFlWRGVJYnNfVG9rZW46VmtPN2J1NzVmb2dlRkt4WG16NmNPaEI5blRnXzE3NTY2MjEwNDc6MTc1NjYyNDY0N19WNA)

**成绩表(scores)**

![img](https://dcn2187ziwgk.feishu.cn/space/api/box/stream/download/asynccode/?code=YTBkMDIxNmNlNWQ5MDAwNWRlNzU4MjUzMTAzNTgxZWVfTVZEYmdha3UyRk5aZ05wSTdPTlYwZWw2V1lWZ2l4NkZfVG9rZW46UG05NmJZclI1b0p0R0d4N010M2N3b2lCblhjXzE3NTY2MjEwNDc6MTc1NjYyNDY0N19WNA)

### 1.4.2 场景一：基础数据查询

作为服务开发者，你经常需要从数据库中查询各种运营数据。

**挑战：编写基础 SQL 查询**

请连接到上述数据库，并针对 `recruit_db` 中的表，编写 SQL 语句来回答以下问题：

1. 查询所有姓“张”或姓“李”的学生信息。
    1. **考察点:** `WHERE`, `LIKE`, `OR`
2. 查询所有在2003年出生的女学生名单。
    1. **考察点:** `WHERE`, `AND`, `YEAR()` 或 `BETWEEN`
3. 查询“数据库原理”这门课的平均分、最高分和最低分。
    1. **考察点:** `AVG()`, `MAX()`, `MIN()`, `JOIN`, `WHERE`
4. 查询每个班级的学生人数，并只显示人数大于2的班级。
    1. **考察点:** `GROUP BY`, `COUNT()`, `HAVING`
5. 查询所有学生的平均分，并按平均分从高到低列出前3名学生的姓名和平均分。
    1. **考察点:** `JOIN`, `GROUP BY`, `AVG()`, `ORDER BY`, `LIMIT`

### 1.4.3 场景二：查询性能优化

随着我们的短链接服务用户量激增，订单表（`orders`）的数据已达数百万条。现在，一个看似简单的查询变得异常缓慢，严重影响了后台管理系统的效率。

**待优化的表结构与查询：**

```SQL
CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,          -- 用户ID
    short_path VARCHAR(10),  -- 关联的短链接路径
    status VARCHAR(20),      -- 订单状态，如 "待支付", "已支付", "已取消"
    create_time DATETIME     -- 订单创建时间
);

-- 这个查询变得非常慢
SELECT * FROM orders WHERE status = '已支付';
```

**请解答以下问题：**

1. **定位瓶颈：** 你认为上述查询缓慢的根本原因是什么？（提示：数据扫描方式）
2. **提出优化建议：**
    1. 从**表结构设计**（或调整）的角度，你会提出什么修改建议来加速这个查询？请写出具体的 SQL DDL 语句（如 `CREATE INDEX` 或 `ALTER TABLE`）。
    2. 除了修改表结构，从**SQL查询写法**本身，或者应用架构层面，还有没有其他的优化思路？（例如，当需要同时查询多种状态时，如何避免多次查询？或者在应用层面可以引入什么组件来分担数据库压力？）

## 1.5 第五部分：终极试炼 —— 铸就一个工业级的并发缓存

恭喜你，勇士！你已经成功穿越了指针的丛林，驾驭了 Slice 与 Map 的洪流，抵御了高并发的冲击，并为数据找到了安身之所。但真正的挑战，现在才刚刚开始。

一个工业级的服务，不仅要快，更要“聪明”。它需要知道如何管理自己的内存，如何自动淘汰无用的数据，以保持巅峰性能。在最后的试炼中，你将综合运用前面所学的一切，亲手打造一个带有“生命周期”的、线程安全的内存缓存。这不仅是一个缓存，更是你作为一名准系统设计师的毕业作品。

### 1.5.1 编码挑战：实现一个带过期策略的并发缓存

你需要实现一个 `ConcurrentCache` 结构体及其方法，它必须满足以下要求：

1. **线程安全**：多个 `goroutine` 可以同时安全地调用 `Set` 和 `Get` 方法，不会发生数据竞争。
2. **自动过期**：`Set` 方法可以为每个键值对设置一个“存活时间”（TTL, Time-To-Live）。当一个键过期后，它应该被自动从缓存中移除。
3. **后台清理**：需要有一个后台 `goroutine` 定期扫描并清理过期的键。

**请补全以下代码：**

```Go
package main

import (
        "fmt"
        "sync"
        "time"
)

// CacheItem 代表缓存中的一个条目
type CacheItem struct {
        Value      interface{}
        Expiration int64 // 过期时间，Unix纳秒
}

// IsExpired 判断条目是否已过期
func (item CacheItem) IsExpired() bool {
        if item.Expiration == 0 {
                return false // 0 表示永不过期
        }
        return time.Now().UnixNano() > item.Expiration
}

// ConcurrentCache 线程安全的、带过期功能的缓存结构体
type ConcurrentCache struct {
        items map[string]CacheItem
        // TODO: 你需要一个锁来保护 items map
        // mu sync.RWMutex

        // TODO: 你可能需要一个关闭渠道来优雅地停止后台清理goroutine
        // stop chan bool
}

// NewConcurrentCache 创建一个新的并发缓存实例
// interval 参数代表后台清理的扫描间隔
func NewConcurrentCache(interval time.Duration) *ConcurrentCache {
        c := &ConcurrentCache{
                items: make(map[string]CacheItem),
                // TODO: 初始化你的锁和channel

        }

        // TODO: 在这里启动一个后台goroutine，
        // 每隔 interval 时间，就调用一次 c.deleteExpired()
        
        return c
}

// Set 添加或更新一个缓存条目
// ttl 参数代表该条目的存活时间
func (c *ConcurrentCache) Set(key string, value interface{}, ttl time.Duration) {
        // TODO: 实现Set方法
        // 1. 加锁
        // 2. 计算过期时间
        // 3. 将键值对存入 c.items
        // 4. 解锁
}

// Get 获取一个缓存条目
func (c *ConcurrentCache) Get(key string) (interface{}, bool) {
        // TODO: 实现Get方法
        // 1. 加读锁
        // 2. 从 c.items 中查找
        // 3. 如果找到，检查是否过期
        //    - 如果已过期，则返回 nil, false
        //    - 如果未过期，则返回其值和 true
        // 4. 解读锁
        return nil, false
}

// deleteExpired 删除所有已过期的条目
func (c *ConcurrentCache) deleteExpired() {
        fmt.Println("开始清理过期缓存...")
        // TODO: 实现清理逻辑
        // 1. 加写锁
        // 2. 遍历 c.items，找出所有已过期的key
        // 3. 将这些过期的key从 c.items 中删除
        // 4. 解写锁
}

// Stop 停止后台清理goroutine
func (c *ConcurrentCache) Stop() {
        // TODO: 实现停止逻辑，优雅地关闭后台goroutine
}

func main() {
        // 创建一个清理间隔为1秒的缓存
        cache := NewConcurrentCache(1 * time.Second)
        defer cache.Stop()

        // --- 测试基础功能 ---
        fmt.Println("--- 测试基础功能 ---")
        cache.Set("name", "YOLO", 5*time.Second)
        if val, found := cache.Get("name"); found {
                fmt.Printf("找到 'name': %v", val)
        } else {
                fmt.Println("'name' 未找到")
        }

        // --- 测试过期 ---
        fmt.Println("--- 测试过期 ---")
        cache.Set("session", "active", 2*time.Second)
        fmt.Println("设置 'session' 存活2秒")
        time.Sleep(3 * time.Second) // 等待超过2秒

        if _, found := cache.Get("session"); !found {
                fmt.Println("'session' 已按预期过期并被清理")
        } else {
                fmt.Println("错误: 'session' 未被清理")
        }

        // --- 测试并发 ---
        fmt.Println("--- 测试并发 ---")
        var wg sync.WaitGroup
        for i := 0; i < 1000; i++ {
                wg.Add(1)
                go func(i int) {
                        defer wg.Done()
                        key := fmt.Sprintf("key-%d", i)
                        cache.Set(key, i, 10*time.Second)
                        if _, found := cache.Get(key); !found {
                                fmt.Printf("错误: 刚设置的 key '%s' 却找不到", key)
                        }
                }(i)
        }
        wg.Wait()
        fmt.Println("1000次并发读写测试完成。")
}
```

### 1.5.2 思考与进阶

1. **锁的选择**：在 `ConcurrentCache` 中，我们使用了读写锁 (`sync.RWMutex`) 还是互斥锁 (`sync.Mutex`) 更为合适？为什么？这两种锁在什么场景下性能表现差异最大？
2. **清理策略的瓶颈**：我们的 `deleteExpired` 方法在执行时会锁定整个 `map`。如果缓存中有数百万个键，这种“全局锁定”的清理方式会带来什么性能问题？你有什么更优化的设计思路吗？（例如：分片加锁、惰性删除等）
3. **时间的“捉弄”**：如果用户的电脑时间突然向后跳跃（例如，从网络同步了一个错误的时间），我们的过期策略会发生什么？如何让我们的缓存机制对系统时间的跳变不那么敏感？
4. **终极形态**：一个真正的工业级缓存（如 `Redis` 或 `Memcached`）还具备哪些我们的简单实现所没有的关键特性？