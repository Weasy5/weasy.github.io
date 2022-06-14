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
​	因为存储浮点值使用的内存空间是存储整数值的两倍，所以 ECMAScript 总是想方设法把值转换为 整数。在小数点后面没有数字的情况下，数值就会变成整数。类似地，如果数值本身就是整数，只是小 数点后面跟着 0（如 1.0），那它也会被转换为整数。

​	**科学计数法**：表示一个应该乘以 10 的给定次幂的数值。eg：3.15e5 = 315000 3.15e-5 = 0.0000315

2. 值的范围
   ECMAScript 可以表示的最小 数值保存在** Number.MIN_VALUE** 中，这个值在多数浏览器中是 5e-324；可以表示的最大数值保存在 Number.MAX_VALUE 中，这个值在多数浏览器中是 1.797 693 134 862 315 7e+308。如果某个计算得到的 数值结果超出了 JavaScript 可以表示的范围，那么这个数值会被自动转换为一个特殊的 Infinity（无 穷）值。任何无法表示的负数以-Infinity（负无穷大）表示，任何无法表示的正数以 Infinity（正 无穷大）表示。

3. NaN:not a number
   
```javascript
console.log(0/0); // NaN 
console.log(-0/+0); // NaN 
console.log(NaN === NaN) // false
console.log(isNaN(NaN)); // true 
console.log(isNaN(10)); // false，10 是数值
console.log(isNaN("10")); // false，可以转换为数值 10 
console.log(isNaN("blue")); // true，不可以转换为数值
console.log(isNaN(true)); // false，可以转换为数值 1
```
   + 涉及NaN的操作返回都NaN
   + NaN不等于包括NaN在内的任何值

4. 

## 第四章 变量、作用域与内存
### 4.1 原始值与引用值

### 4.2 执行上下文与作用域
1. 引用值的赋值实际上是指针的赋值，都是指向堆内存的同一对象
2. ECMAScript 中所有函数的参数都是按值传递的。
3. typeof是用来判断一个变量是否为原始类型的最好方法
4. 引用类型用 instanceof操作符来区分（variable instanceof constructor）
5. 当代码执行流进入函数时，函数的上下文被推到一个上下文栈上。
   在函数执行完之后，上下文栈会弹出该函数上下文，将控制权返还给之前的执行上下文。ECMAScript
   程序的执行流就是通过这个上下文栈进行控制的
6. **作用域链增强**
   + 作用域链增强：对 catch 语句而言，则会创建一个新的变量对象，这个变量对象会包含要抛出的错误对象的声明
   +  with 语句： 对 with 语句来说，会向作用域链前端添加指定的对象
### 4.3 垃圾回收
1. 垃圾回收程序每隔一定时间（或者说在代码执行过程中某个预定的收集时间）就会自动运行
2. 标记清理：
3. 解除引用
```javascript
function createPerson(name){ 
 let localPerson = new Object(); 
 localPerson.name = name; 
 return localPerson; 
} 
let globalPerson = createPerson("Nicholas"); 
// 解除 globalPerson 对值的引用
globalPerson = null; 
```
解除对一个值的引用并不会自动导致相关内存被回收。解除引用的关键在于确保相关
的值已经不在上下文里了，因此它在下次垃圾回收时会被回收
4. 内存管理（垃圾回收的优化）
+ 使用const let声明变量
+ 隐藏类和删除操作！important：
   避免先创建后补充的动态属性赋值，在动态函数中实现一次性声明所有属性；
   最佳实践是把不想要的属性设置为 null。这样可以保持隐藏类不变和继续共享，同时也能达到删除引用值供垃圾回收程序回收的效果。
```javascript
function Article(opt_author) { 
 this.title = 'Inauguration Ceremony Features Kazoo Band'; 
 this.author = opt_author; 
} 
let a1 = new Article(); 
let a2 = new Article('Jake'); 
function Article() { 
 this.title = 'Inauguration Ceremony Features Kazoo Band'; 
 this.author = 'Jake'; 
} 
let a1 = new Article(); 
let a2 = new Article(); 
delete a1.author; // 会导致使用两个隐藏类
```
+ 闭包容易造成内存泄漏
+ 静态分配与对象池

## 5. 基本引用类型
### 5.1 Date
   Date.parse()
   + “月/日/年”，如"5/23/2019"；
   + “月名 日, 年”，如"May 23, 2019"；
   + “周几 月名 日 年 时:分:秒 时区”，如"Tue May 23 2019 00:00:00 GMT-0700"；
   + ISO 8601 扩展格式“YYYY-MM-DDTHH:mm:ss.sssZ”，如 2019-05-23T00:00:00（只适用于兼容 ES5 的实现）。
### 5.2 RegExp
   包含两个实例方法
   + exec() ：包含两个额外的属性：index 和 input。index 是字符串中匹配模式的起始位置，input 是要查找的字符串。
   + test() :返回是否匹配（true or false）

   属性
   ```javascript
   let text = "this has been a short summer"; 
   let pattern = /(.)hort/g; 
   if (pattern.test(text)) { 
   // 原始字符串
   console.log(RegExp.input); // this has been a short summer 
   // 匹配的字符的左边
   console.log(RegExp.leftContext); // this has been a 
   // 匹配的字符的右边
   console.log(RegExp.rightContext); // summer 
   // 属性包含匹配整个正则表达式的上一个字符串
   console.log(RegExp.lastMatch); // short 
   // 属性包含捕获组的上一次匹配
   console.log(RegExp.lastParen); // s 
   } 
   ```
### 5.3 原始值包装类型

   ```javascript
   let s1 = "some text"; 
   let s2 = s1.substring(2);

   // 1.创建一个String类型实例
   // 2.调用实例上的特定方法
   // 3. 销毁实例

   let s1 = new String("some text"); 
   let s2 = s1.substring(2); 
   s1 = null; 
   ```
#### 5.3.1 Boolean
   **所有对象在布尔表达式中都会自动转换为 true**
   ```javascript
   // 原始Boolean值
   let booleanValue = false
   // Boolean对象(不要用)
   let booleanObj = new Boolean(false) 
   ```
#### 5.3.2 Number
#### 5.3.3 String
   + 操作字符串：concat, slice, substr, substring都不会改变原字符串
   + 检索字符串位置：indexOf():正序搜索；lastIndexOf():倒序搜索；第二个参数是搜索的位置（不包括该位置）
   + 字符串包含方法：startsWith(),endsWith(), includes()
   + padStart()和 padEnd()方法会复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件。这两个方法的第一个参数是长度，第二个参数是可选的填充字符串，默认为空格。
   + 字符串的匹配模式：match(), search()
### 5.4 单例内置对象
   定义：任何由 ECMAScript 实现提供、与宿主环境无关，并在 ECMAScript程序开始执行时就存在的对象

#### 5.4.1 Global
   + url编码：
   + eval():通过 eval()定义的任何变量和函数都不会被提升，这是因为在解析代码的时候，它们是被包含在一个字符串中的。它们只是在 eval()执行的时候才会被创建;在严格模式下，在 eval()内部创建的变量和函数无法被外部访问,赋值给 eval 也会导致错误
#### 5.4.2 Math
   + Math 计算的问题是精度会因浏览器、操作系统、指令集和硬件而异
   + Math.random()随机返回一个0到1的16位小数，需要用Math.floor()处理
   ```javascript
   // 返回lowerValue~upperValue之间的数
   function selectFrom(lowerValue, upperValue) { 
   let choices = upperValue - lowerValue + 1; 
   return Math.floor(Math.random() * choices + lowerValue); 
   }
   // 返回一个1~10的整数
   let res = Math.floor(Math.random()*10 +1)
   ```
## 6 集合引用类型
### 6.1 Object
+ 创建显式对象的方法：
   ```javascript
   // 使用 new 操作符和 Object 构造函数
   const obj1 = new Object()
   // 对象字面量
   const obj2 = {}
   ```
### 6.2 Array
+ from()用于将**类数组结构(即任何可迭代的结构,或者有一个 length 属性和可索引元素的结构)**转换为数组实例，而 of()用于将一组参数转换为数组实例
+ 一些数组方法（改变原数组的）: unshift,shift,pop,push,splice,fill,reverse, sort, copyWithin
```javascript
let arr = ['red', 'yellow', 'blue', 'pink']
// 删除
let removed = arr.splice(0,1) //(要删除的位置，要删除的数量)
console.log(arr) // [ 'yellow', 'blue', 'pink']
console.log(removed) // ['red']
// 添加
let add = arr.splice(1,0,'red') // (要插入的位置，删除元素的数量，添加的元素)
console.log(arr) // [ 'yellow', 'red', 'blue', 'pink']
console.log(add) //[]

// 替换
let replace = arr.splice(1,1,'orange') // (要替换的位置，删除的元素个数，替换的元素)
console.log(arr) // [ 'yellow', 'orange', 'blue', 'pink']
console.log(replace) // ['red']
```
+ 遍历数组的方法：map（返回调用结果组成的数组），forEach没有返回，some和every返回true or flase，filter（函数返回 true 的项会组成数组之后返回）
+ 归并方法：reduce(), reduceRight(),接收四个参数：上一个归并值，当前值，当前值索引，数组本身。
```javascript
let values = [1, 2, 3, 4, 5]; 
let sum = values.reduce((prev, cur, index, array) => prev + cur); 
alert(sum); // 15
```
### 6.3 Map
1. 键值可以是任何类型，Map 实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作。
2. 与object的比较
+ 内存：相同内存下，map比object多存储50%
+ 插入： map性能更好
+ 查找：大量查找操作下，object更好
+ 删除： map更好，delete操作对性能来说不友好

### 6.4 WeakMap[!important]
WeakMap 是 Map 的“兄弟”类型，其 API 也是 Map 的子集。WeakMap 中的“weak”（弱），
描述的是 JavaScript 垃圾回收程序对待“弱映射”中键的方式。
1. 构造方法
```javascript
const wm = new WeakMAp()
// 键值只能是Object或者继承自Object的类型
const key1 = {id: 1}
const key2 = {id: 2}

const wm1 = new WeakMap([ 
 [key1, "val1"], 
 [key2, "val2"], 
]);
```
2. 弱键
WeakMap 中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，这些键不属于正式的引用，不会阻止垃圾回收。但要注意的是，弱映射中值的引用可不是“弱弱地拿着”的。只要键存在，键/值对就会存在于映射中，并被当作对值的引用，因此就不会被当作垃圾回收。
3. 不可迭代键
因为 WeakMap 中的键/值对任何时候都可能被销毁，所以没必要提供迭代其键/值对的能力。当然，
也用不着像 clear()这样一次性销毁所有键/值的方法。
4. 使用弱映射

### 6.4 Set
加强的map

1. 基本api
+ 如果想在创建时初始化实例，则可以给Set构造函数传入一个可迭代对象
```javascript
const s1 = new Set(['val1, "val2", "val3"])
s1.size //3
s1.add('val4') // 增加值， 返回集合的实例
s1.has('val1') // 查询
s1.delete('val1') // 删除
s1.clear() // 销毁实例中所有的值
```
2. 顺序和迭代
Set会维护插入时的顺序，支持按顺序迭代

3. Set与Map相比

### 6.5 WeakSet

### 6.6 迭代与扩展操作
定性数组（？）

## 7.迭代器和生成器(不太懂)
ES6新增两个高级特性：迭代器和生成器
### 7.1 理解迭代
1. 循环执行迭代缺点
+ 迭代之前需要实现知道如何使用数据结构
+ 遍历顺序并不是数据结构固有的

### 7.2 迭代器模式
迭代器模式（特别是在 ECMAScript 这个语境下）描述了一个方案，即可以把有些结构称为“可迭代对象”（iterable），因为它们实现了正式的 Iterable 接口，而且可以通过迭代器 Iterator 消费。
可迭代对象是一种抽象的说法。基本上，可以把可迭代对象理解成数组或集合这样的集合类型的对象。它们包含的元素都是有限的，而且都具有无歧义的遍历顺序。

## 8.对象、类与面向对象编程

### 8.1 理解对象
#### 8.1.1 属性的类型
1. 对象属性分为： 数据属性和访问器属性
+ 数据属性： Configurable， Enumerable， Writable， Value
+ 访问器属性： Configurable，Enumerable，Get，Set
+ 设置和访问： Object.defineProperty() ，Object.getOwnPropertyDescriptor()
   - Configurable：是否可以删除并重新定义
   - Enumerable：是否可以通过 for-in 循环返回
   - Writable: 是否可以修改
#### 8.1.2 定义多个属性
Object.defineProperties()方法。这个方法可以通过多个描述符一次性定义多个属性。它接收两个参数：要为之添加或修改属性的对象和另一个描述符对象，其属性与要添加或修改的属性一一对应
#### 8.1.3 读取属性的特性
+ 使用 Object.getOwnPropertyDescriptor()方法可以取得指定属性的属性描述符。这个方法接
收两个参数：属性所在的对象和要取得其描述符的属性名。返回值是一个对象，对于访问器属性包含
configurable、enumerable、get 和 set 属性，对于数据属性包含 configurable、enumerable、
writable 和 value 属性。
 + getOwnPropertyDescriptors：会在每个自有属性上调用 Object.getOwnPropertyDescriptor()并在一个新对象中返回它们
```javascript
// 数据属性
let person = {}; 
Object.defineProperty(person, "name", { 
 writable: false, 
 configurable: false, 
 value: "Nicholas" 
}); 
// 在非严格模式下删除name会忽略，严格模式下会报错
console.log(person.name); // "Nicholas" 
person.name = "Greg"; 
console.log(person.name); // "Nicholas"
// 访问器
let book = {}; 
Object.defineProperties(book, { 
   year_: { 
      value: 2017 
   }, 
   edition: { 
      value: 1 
   }, 
   year: { 
   get: function() { 
      return this.year_; 
   }, 
   set: function(newValue){ 
      if (newValue > 2017) { 
      this.year_ = newValue; 
      this.edition += newValue - 2017; 
   } 
 } 
 } 
}); 
let descriptor = Object.getOwnPropertyDescriptor(book, "year_"); 
console.log(descriptor.value); // 2017 
console.log(descriptor.configurable); // false 
console.log(typeof descriptor.get); // "undefined" 
let descriptor = Object.getOwnPropertyDescriptor(book, "year"); 
console.log(descriptor.value); // undefined 
console.log(descriptor.enumerable); // false 
console.log(typeof descriptor.get); // "function" 

```
#### 8.1.4 合并对象
Object.assign()：浅复制，对象的引用；接收严格目标对象和一个或多个源对象作为参数，将源对象中可枚举的属性复制到目标对象；如果多个源对象有相同的属性，则用最后一个复制的值。
#### 8.1.5 对象标识及相等判定
Object.is()
```javascript
console.log(-0 === +0) // true
console.log(-0 === 0) // true
console.log(+0 === 0) // true

console.log(Object.is(+0, -0)); // false 
console.log(Object.is(+0, 0)); // true 
console.log(Object.is(-0, 0)); // false 

console.log(Object.is(NaN, NaN)); // true 

```
#### 8.1.6 增强的对象语法
ES6新增的语法糖:
1. 属性值简写
```javascript
let name = 'Matt'; 
let person = { 
 name: name 
}; 
//=======>
let person = { 
 name 
};
console.log(person); // { name: 'Matt' }

```
2. 可计算属性

3. 简写方法名

```javascript

```
#### 8.1.7 对象解构
+ null和 undefined 不能被解构，否则会抛出错误
+ 解构并不要求变量必须在解构表达式中声明。不过，如果是给事先声明的变量赋值，则赋值表达式必须包含在一对括号中
```javascript
let person = { 
 name: 'Matt', 
 age: 27 
};
// 不使用对象解构
let personName = person.name, 
 personAge = person.age; 
console.log(personName); // Matt 
console.log(personAge); // 27 
// 使用对象解构
let person = { 
 name: 'Matt', 
 age: 27 
}; 
let { name: personName, age: personAge } = person; 
console.log(personName); // Matt 
console.log(personAge); // 27 

let personName, personAge; 
let person = { 
 name: 'Matt', 
 age: 27 
}; 
({name: personName, age: personAge} = person); 
console.log(personName, personAge); // Matt, 27 
```
### 8.2 创建对象
#### 8.2.1 概述

#### 8.2.2 工厂模式
工厂模式虽然可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型）。
```javascript
function createPerson(name, age, job) { 
 let o = new Object(); 
 o.name = name; 
 o.age = age; 
 o.job = job; 
 o.sayName = function() { 
 console.log(this.name); 
 }; 
 return o; 
} 
let person1 = createPerson("Nicholas", 29, "Software Engineer"); 
let person2 = createPerson("Greg", 27, "Doctor");
```
#### 8.2.3 构造函数模式
构造函数名称的首字母都是要大写的。
调用构造函数会执行以下操作：
（1）在内存中创造一个新对象
（2）这个新对象的内部[[Prototype]]特性被赋值为构造函数的prototype属性
（3）构造函数内部的this被赋值给这个新对象（this指向新对象）
（4）执行构造函数的内部代码（给新对象添加属性）
（5）如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。
```javascript
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = function() { 
 console.log(this.name); 
 }; 
} 
let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor"); 
person1.sayName(); // Nicholas 
person2.sayName(); // Greg 

console.log(person1.constructor == Person); true
console.log(person2.constructor == Person); true 
console.log(person1 instanceof Object); // true 
console.log(person1 instanceof Person); // true 
console.log(person2 instanceof Object); // true 
console.log(person2 instanceof Person); // true 

```
1. 构造函数也是函数：任何函数只要使用了new操作符调用就是构造函数
2. 在调用一个函数而没有明确设置 this 值的情况下（即没有作为对象的方法调用，或者没有使用 call()/apply()调用），this 始终指向 Global 对象（在浏览器中就是 window 对象）
3. 特定对象指定为作用域。这里的调用将对象 o 指定为 Person()内部的 this 值，因此执行完函数代码后，所有属性和 sayName()方法都会添加到对象 o 上面。
```javascript
// 在另一个对象的作用域中调用
let o = new Object(); 
Person.call(o, "Kristen", 25, "Nurse"); 
o.sayName(); // "Kristen"
```
4. 构造函数的问题：定义的方法会在每个实例上都创建一遍。

#### 8.2.4 原型模式
每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。
```javascript
function Person() {} 
Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function() { 
 console.log(this.name); 
}; 
let person1 = new Person(); 
person1.sayName(); // "Nicholas" 
let person2 = new Person(); 
person2.sayName(); // "Nicholas" 
console.log(person1.sayName == person2.sayName); // true
```
1. 理解原型
*实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有*
```javascript
function Person() {}
let person = new Person()
// person和Peason之间没有直接联系，person和Person.prototype之间才有联系
// person._proto_ === Person.prototype
// Person.prototype.constructor === Person
// person1.__proto__.constructor === Person

```
![image.png]
+ Object.getPrototypeOf()
+ Object.isPrototypeOf()
+ Object.setPrototypeOf()
2. 原型层级
hasOwnProperty()方法用于确定某个属性是在实例上还是在原型对象上。这个方法是继承自 Object的，会在属性存在于调用它的对象实例上时返回 true

3. 原型和in操作符
+ in : 
   - 在单独使用时，in 操作符会在可以通过对象访问指定属性时返回 true，无论该属性是在实例上还是在原型上
   - for...in: 可以通过对象访问且可以被枚举的属性都会返回，包括实例属性和原型属性。(要获得对象上所有可枚举的实例属性，可以使用 Object.keys()方法。)
4. 枚举属性的性质

```javascript

```












