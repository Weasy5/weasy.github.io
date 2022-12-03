### 遇到的问题
#### javascript
+ 上传文件，图片等格式的文件，需要转换成formdata
+ 获取url？后面的内容：window.location.search
+ 判断值是否为空，如果是数字不能用 ||
+ map不能跳出循环
+ some ：return true 跳出循环

+ 判断为undefined 或者null  ，0的时候：?? 用于判断第一个数据是否为null或undefined,
```javascript
undefined || null || 0 // false
null ?? 1 // false
undefined ?? 1 false
​0 ?? 1 // true
0 || 1 false
```
+ valueEnum  object结构不能用数字做key


#### CSS
+ 模板字符串换行不生效：css属性：white-space： pre-line
+ Grid 布局应该用于页面，Flexbox 布局应该用于组件。
#### HTML

#### React
+ Q: 搜索操作，查询关键字，置空列表数组，没有效果，获取的数据会拼接到原有的数组中

+ A:如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 `setState`。该函数将接收先前的 state，并返回一个更新后的值。
```javascript
  setContentList(preContentList => [...preContentList, ...baseData.pageData]);
```
+ useState<array> => useState<any[]>
+ 改变表格数据后重新渲染最佳是重新调用请求列表的接口
+ useState会触发页面的重新渲染
+ 对于不一定返回的数据，一定要先判断，再渲染
+ 使用了keepAlive切换页面不更新，可以用umi带的useActivate钩子；同一路由，用state带参数，不会刷新页面
+ 数组，对象等结构，如果层次较深，react组件 set操作不会更新，需要浅拷贝
+ set操作会使组件重新渲染
#### Ant Design
+ 问题：展示表格有一列字数非常多，需要超出一行省略，鼠标移动元素上时，显示全部文字，column使用属性ellipsis无效
+ 解决： 由于antdesign table如果有列使用属性fixed，则ellipsis不生效 ，给需要的列添加类
+ 动画效果：对于modal关闭时设置效果，需要同时设置className和wrapperStyle
+ form.list 异步验证

```javascript
// 何时触发
validateTrigger: 'onBlur',
validator: async (_, value) => {
    if(!value || !form.getFieldValue('manyPoDeliveryDetailList').some((i, index2) =>  index2 !== index && i?.procurementNumber === value) ){
        if(!value) {
            return Promise.resolve()
        }
        const isValidate = await deliveryPoValidate({purchaseOrderItems: [{
            supplierId: details?.supplierId,
            poCode: value,
            productCode: details.productCode,
        }]})
        if(isValidate){
            return Promise.resolve()
        }
        return Promise.reject(new Error('采购单号无效'))

    } 
    return Promise.reject(new Error('采购单号不允许重复!'))
}
```
+ formItem 和input数字一起用，不能在formItem上用range规则

#### Vue
+ 子组件调用父组件的方法this.$emit不生效：不能使用驼峰命名

#### Http
+ 不要将https和http写死 ： //127.0.0.1:8080
+ 关于http请求：
  - axios：是基于XMLHttpRequest封装的接口，支持浏览器和node
  - fetch: 是浏览器支持的原生接口，在node环境下需要安装相应的包
+ 启用本地服务器 host不能为localhost，否则不能使用ip访问，需要设置为0.0.0.0
#### 浏览器
+ Q：接口一直请求不到菜单列的新的数据
+ A: 一直渲染的是缓存数据，需要清楚浏览器的缓存，查看请求的资源的时间
+ 存localStorage需要转json
#### 微信小程序
+ 企业微信网页授权：

  + 文档：https://work.weixin.qq.com/api/doc/90001/90143/91120

  https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwa2fceb831d35052b&redirect_uri=http%3A%2F%2Fyzm.111.com.cn%2Fweb%2Factivities%2Fmaster-code%2Findex.html&response_type=code&scope=snsapi_base#wechat_redirect

  + 获取的code不能二次消费

#### git
+ stash 
+ 

#### 算法
1. 排序算法
![排序](https://www.runoob.com/wp-content/uploads/2019/03/0B319B38-B70E-4118-B897-74EFA7E368F9.png)
