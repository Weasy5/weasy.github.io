---
title: Javascript高级程序设计
date: 2021-11-09 14:24:47
tags: javascript
---




+ async: 表示应该立即开始下载脚本，但不能阻止其他页面动作
+ charset：可选。使用 src 属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不 在乎它的值。
+ crossorigin：可选。配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。crossorigin= "anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据 标志，意味着出站请求会包含凭据
+ defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。
+ integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI， Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错， 脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提 供恶意内容src：可选。表示包含要执行的代码的外部文件。
+ type：可选。代替 language，表示代码块中脚本语言的内容类型（也称 MIME 类型）。按照惯 例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript" 都已经废弃了。JavaScript 文件的 MIME 类型通常是"application/x-javascript"，不过给 type 属性这个值有可能导致脚本被忽略。在非 IE 的浏览器中有效的其他值还有 "application/javascript"和"application/ecmascript"。如果这个值是 module，则代 码会被当成 ES6 模块，而且只有这时候代码中才能出现 import 和 export 关键字。脚本执行在什么时候执行：因此第一个推迟的脚 本会在第二个推迟的脚本之前执行，而且两者都会在 DOMContentLoaded 事件之前执行异步(async)脚本保证会在页面的 load 事件前执行，但可能会在 DOMContentLoaded（参见第 17 章）之 前或之后。动态加载脚本：

#### 脚本执行

##### 在什么时候执行：

因此第一个推迟的脚 本会在第二个推迟的脚本之前执行，而且两者都会在 DOMContentLoaded 事件之前执行异步(async)脚本保证会在页面的 load 事件前执行，但可能会在 DOMContentLoaded（参见第 17 章）之 前或之后。

##### 动态加载脚本

```javascript
let script = document.createElement('script'); 
script.src = 'gibberish.js'; 
document.head.appendChild(script); 
// 在把 HTMLElement 元素添加到 DOM 且执行到这段代码之前不会发送请求。默认情况下，以这种方式创建的<script>元素是以异步方式加载的，相当于添加了 async 属性。不过这样做可能会有问题，因为所有浏览器都支持 createElement()方法，但不是所有浏览器都支持 async 属性。因此，如果要统一动态脚本的加载行为，可以明确将其设置为同步加载：
let script = document.createElement('script'); 
script.src = 'gibberish.js'; 
script.async = false; 
document.head.appendChild(script);
// 以这种方式获取的资源对浏览器预加载器是不可见的。这会严重影响它们在资源获取队列中的优先级。
<link rel="preload" href="gibberish.js">
```

##### 2.1.5 XHTML 中的变化

在 XHTML 中编写代码的规则比 HTML 中严格，这种格式适用于所有现代浏览器。它可以通过 XHTML 验证，而且对 XHTML 之前的浏览器也能优雅地降级

```javascript
<script type="text/javascript"> 
//<![CDATA[ 
 function compare(a, b) { 
 if (a < b) { 
 console.log("A is less than B"); 
 } else if (a > b) { 
 console.log("A is greater than B"); 
 } else { 
 console.log("A is equal to B"); 
 } 
 } 
//]]> 
</script>
```

#### 2.2 行内代码和外部文件

将js放在外部文件比放在行内更好：

+ 可维护性
+ **缓存**：这种格式适用于所有现代浏览器。虽然有点黑科技的味道，但它可以通过 XHTML 验证，而且对 XHTML 之前的浏览器也能优雅地降
+ 适应未来

#### 2.3 文档模式 &#x1F600;

#### 2.4 \<noscript>元素

任何一个条件被满足,浏览器将显示包含在中的内容：

+  浏览器不支持脚本
+ 浏览器对脚本的支持被关闭

## 第三章 语言基础

#### 3.1 语法

##### 3.1.1 区分大小写

##### 3.1.2 标识符

就是变量、函数、属性或函数参数的名称，第一个字符必须是一个字母、下划线（_）或美元符号（$）； 剩下的其他字符可以是字母、下划线、美元符号或数字。驼峰命名，写法并不是强制性的，但因为这种形式ECMAScript 内置函数和对象的命名方式一致， 所以算是最佳实践。

##### 3.1.3 注释

##### 3.1.4 严格模式

整个脚本启用严格模式，在脚本开头加上这一行： "use strict";  

单独指定一个函数在严格模式下执行，只要把这个预处理指令放到函数体开头即可： function doSomething() {  "use strict";  // 函数体  }  

它其实是一个预处理指令。任何支持的 JavaScript 引擎看到它都会切换到严格模式。选择这种语法形式的目的是不破坏 ECMAScript 3 语法。 所有现代浏览器 都支持严格模式。

##### 3.1.5 语句

#### 3.2 关键字和保留字

#### 3.3 变量

##### 3.3.1 var关键字

```javascript
// 在严格模式下，如果像这样给未声明的变量赋值，则会导致抛出 ReferenceError。
function test() { 
 message = "hi"; // 全局变量
} 
test(); 
console.log(message); // "hi" 
```

var的声明范围是函数作用域，会变量提升，可以反复声明

##### 3.3.2 let声明

let声明的范围是块作用域，在同一个作用域内不能重复声明

+ 暂时性死区：在 let 声明之前的执行瞬间被称为“暂时性死区”（temporal dead zone），在此 阶段引用任何后面才声明的变量都会抛出 ReferenceError。
+ **全局声明：使用 let 在全局作用域中声明的变量不会成为 window 对象的属性（var 声 明的变量则会）。**
+ 条件声明：
+ for循环中的let声明：使用 let 声明迭代变量时，JavaScript 引擎在后台会为每个迭代循环声明一个新的迭代变量。 每个 setTimeout 引用的都是不同的变量实例，所以 console.log 输出的是我们期望的值，也就是循 环执行过程中每个迭代变量的值。

##### 3.3.3 const声明

const 声明的限制只适用于它指向的变量的引用。换句话说，如果 const 变量引用的是一个对象， 那么修改这个对象内部的属性并不违反 const 的限制；不能用 const 来声明迭代变量（迭代变量会递增）

##### 3.3.4 声明风格最佳实践：

 不使用var，const优先，let次之

#### 3.4 数据类型

原始数据类型：

+ undefined: 声明了但没有赋值
+ Null： 空对象指针，在定义将来要保存对象值的变量时，建议使用 null 来初始化，不要使用其他值。
+ Boolean
+ Number
+ String
+ Symbol：es6新增属性

复杂数据类型：

Object

##### 3.4.1 typeof操作符

typeof是操作符，不是函数，不需要参数，使用typeof value会返回字符串：



```javascript
"undefined"
"boolean"
"string"
"number"
'object'
"function"
symbol
console.log(typeof null) // "object",null被认为是一个空对象
//在对未初始化的变量调用 typeof 时，返回的结果是"undefined"，但对未声明的变量调用它时，返回的结果还是"undefined"，
let message 
console.log(typeof message) // "undefined"
// age没有声明
console.log(typeof age) // "undefined"

```



##### 3.4.2 null类型

任何时候，只要变量要保存对象，而当时又没有那个 对象可保存，就要用 null 来填充该变量。这样就可以保持 null 是空对象指针的语义，并进一步将其 与 undefined 区分开来。

```javascript
// undefined是由null派生而来
console.log(undefined == null)//true
```



##### 3.4.3 boolean类型

| 数据类型  | true       | false     |
| --------- | ---------- | :-------- |
| string    | 非空字符串 | 空字符串  |
| number    | 非0        | 0，NaN    |
| object    | 任意对象   | null      |
| undefined |            | undefined |

##### 3.4.5 Number类型

八进制在严格模式下无效

1. 浮点值

​	因为存储浮点值使用的内存空间是存储整数值的两倍，所以 ECMAScript 总是想方设法把值转换为 整数。在小	数点后面没有数字的情况下，数值就会变成整数。类似地，如果数值本身就是整数，只是小 数点后面跟着 0		（如 1.0），那它也会被转换为整数。

​	**科学计数法**：表示一个应该乘以 10 的给定次幂的数值。eg：3.15e5 = 315000 3.15e-5 = 0.0000315

2. 值的范围

   ECMAScript 可以表示的最小 数值保存在** Number.MIN_VALUE** 中，这个值在多数浏览器中是 5e-324；可以表示的最大数值保存在 Number.MAX_VALUE 中，这个值在多数浏览器中是 1.797 693 134 862 315 7e+308。如果某个计算得到的 数值结果超出了 JavaScript 可以表示的范围，那么这个数值会被自动转换为一个特殊的 Infinity（无 穷）值。任何无法表示的负数以-Infinity（负无穷大）表示，任何无法表示的正数以 Infinity（正 无穷大）表示。

3. NaN

4. 

















