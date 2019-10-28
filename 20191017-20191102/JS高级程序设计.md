[TOC]

> 有点懵逼
>
> p35 Object类型 在讲啥？我是谁我在哪/xk
>
> p79 垃圾收集
>
> p103 正则表达式
>
> p141访问器属性？

# JavaScript高级程序设计

## 1. JavaScript简介

### 1.2 JavaScript实现

* JavaScript组成部分

  * 核心：ECMAScript
  * 文档对象模型
  * 浏览器对象模型

* 文档对象模型：提供访问和操作网页内容的方法和接口

  * DOM将整个页面映射为一个**多层节点结构**

* 浏览器对象模型：提供与浏览器交互的方法和接口

  * 支持可以**访问和操作浏览器窗口的**浏览器对象模型


## 3. 基本概念

### 3.1 语法

* 标识符
  * 第一个字符：字母、下划线、`$`
  * 其他字符：字母、下划线、`$`、数字
  * 命名采用**小驼峰**命名
* 严格模式
  * 在整个脚本启用：在顶部添加`"use strict"`
  * 在函数内启用：在函数内添加`"use strict"`
* 语句
  * 即使控制语句中只有一条语句，也最好使用代码块

### 3.2 关键字与保留字

* 关键字
  * 表示控制语句的开始或结束
  * 执行特定操作
* 保留字
  * 将来可能被用作关键字的词语

关键字和保留字不能作为标识符，最好也不要作为属性名

### 3.4 数据类型

* Undefined类型
  * 只有一个值`undefined`
  * 在使用`var`声明变量但未初始化，那么其值为`undefined`
* Null
  * 只有一个值`null`
  * 空对象指针
    * `undefined`值实际上是派生自`null`值的，因此`console.log(null == undefined)`的结果为`true`

> ————————怎样区别理解`null`与`undefined`————————
>
> 将`null`理解为**没有值，不应该有值**；将`undefined`理解为**缺少值 ，缺省值**
>
> `null`转化数值时为0，`undefined`转化数值时为`NaN`

* Boolean类型

  * 两个字面值：`true`和`false`

* Number类型

  * 字面值

    * 十进制字面值
    * 八进制字面值：前面加`0`
    * 十六进制字面值：前面加`0x`

  * 浮点数值

    * 浮点数值的最高精度为17位小数，但其在进行算术计算时精度远不如整数

      如`0.1+0.2`的实际结果是`0.30000000000000004`，因此无法测试特定的浮点数值

    > ——————————————注意——————————————
    >
    > 基于`IEEE745`数值的浮点计算都会产生舍入误差的问题

  * 数值范围

    * 最大值：`Number.MAX_VALUE`
    * 最小值：`Number.MIN_VALUE`
    * 超出范围：自动转化为`Infinity`或`-Infinity`
    * 判断是否超出范围：`isFinite()`

  * NaN

    * Not a Number

    * 任何涉及到`NaN`的操作都会返回`NaN`

    * 任何值都不与`NaN`相等，包括其本身

    * 是否不是数值：`isNaN()`

      * 该函数会尝试将参数转化为数值
      * 如果可以转换，返回`false`；否则返回`true`

      ```javascript
      console.log(isNaN("1027"))		//false
      console.log(isNaN("hello"))		//true
      console.log(isNaN(false))		//false
      ```

  * 数值转换

    * `Number()`
      * `null`返回值为0
      * `undefined`返回值为`NaN`
      * 字符串
        * 忽略前导0
        * 包含有效的十六进制格式，转换成相应大小的十进制整数
        * 空串转换为0
        * 非上述，转换为`NaN`
    * `parseInt(num, decimal)`   <!--num为待转换的数字，decimal为转换时使用的进制数-->
      * 省略第二个参数时：
        * 将字符串解析成整数
        * 从字符串第一位开始找到第一个非空格字符
        * 如果第一个非空格字符为数字，则继续往后解析直到下一个字符不为数字
        * 如果第一个非空格字符不为数字或不存在第一个字符（空串），返回`NaN`
        * `0`开头且合法的八进制字符串会当作八进制数解析（ECMAScript）
          * ECMAScript3可以解析八进制值
          * ECMAScript5不具备解析八进制值的能力，因此会忽略前导0
        * `0x`开头且合法的十六进制字符串会当作十六进制解析
    * `parseFloat()`
      * 将字符串解析成浮点数
      * 从字符串第一位开始找到第一个非空格字符
      * 如果第一个非空格字符且不为0，则继续往后解析直到下一个字符不为小数点或数字
      * 只有第一个小数点是有效的
      * 只解析十进制字符串，因此`0x`开头的字符串会被解析成0
      * 结果可被解析为整数，则返回整数

* String类型

  * ECMAScript中，**字符串的值是不可变的**。因此要改变某个变量保存的字符串，首先要销毁原来的字符串，然后用另一个包含新值得字符串填充该变量
  * 字符串转换
    * `toString(decimal)`方法
      * 参数`decimal`可选，表示转换的输出数值的基数。参数为空时，输出数值的基数为`0`
      * `null`、`undefined`值没有这个方法
      
      <!--为什么这里基本数据类型还可以调用“方法”？读完p121 第五章5.6“基本包装类型”后可以得知，Number、Boolean等基本包装类型都重写了toString()、valueOf()等方法，而null、undefined不属于基本包装类型-->
    * `String()`函数
      * 如果待转换值含有`toString()`方法，则使用该方法
      * 如果是`null`，返回`"null"`
      * 如果是`undefined`，返回`"undefined"`

### 3.5 操作符

#### 一元操作符

只能操作一个值的操作符

* 递增/递减操作符

  * 适用于**任何值**

    * 对于字符串，使用`Number()`转换；

      若合法，字符串变量变为数字值再`+1`，得到结果为数字值

      若不合法，字符串变量变为数值变量`NaN`

    * 对于布尔值：

      `true`变为`1`再`+1`；`false`变为`0`再`+1`

    * 对于对象：

      先调用`valueOf()`方法再对该值应用上述规则

* 一元加和一元减操作符

#### 位操作符

按照内存中表示数值的位来操作数值

对于非数值应用位操作符，先**使用Number()**转化成数值，再进行操作，鸡国为数值

* 按位非：求反码`~`
* 按位与：`&`
* 按位或：`|`
* 按位异或：`^`
* 按位左移：`<<`，不影响符号位
* 有符号右移：`>>`
  * 符号位不移动
  * **使用符号位的值**填充空位
* 无符号右移：`>>>`
  * 正数：与有符号右移结果相同
  * 负数：无符号右移会**将负数的二进制码当成正数的二进制码**，因此得到的结果非常大

#### 布尔操作符 

* 逻辑非：`!`

* 逻辑与：`&&`

  逻辑与适用于**任何类型**的操作数。在**有一个操作数不是布尔数**的情况下，返回值不一定是布尔值

  | 第一个操作数              | 第二个操作数 | 返回结果     |
  | ------------------------- | ------------ | ------------ |
  | 求值结果为`false`的操作数 | 任意值       | 第一个操作数 |
  | 对象                      | 任意值       | 第二个操作数 |
  | `null`                    | 任意值       | `null`       |
  | `NaN`                     | 任意值       | `NaN`        |
  | `undefined`               | 任意值       | `undefined`  |

  逻辑与操作属于**短路操作**，即如果第一个操作数能决定结果，那么不会再对第二个操作数进行求值

* 逻辑或：`||`

  逻辑或适用于**任何类型**的操作数。在**有一个操作数不是布尔数**的情况下，返回值不一定是布尔值

  | 第一个操作数              | 第二个操作数 | 返回结果     |
  | ------------------------- | ------------ | ------------ |
  | 求值结果为`false`的操作数 | 任意值       | 第二个操作数 |
  | 对象                      | 任意值       | 第一个操作数 |
  | `null`                    | 任意值       | 第二个操作数 |
  | `NaN`                     | 任意值       | 第二个操作数 |
  | `undefined`               | 任意值       | 第二个操作数 |

#### 乘性操作符

如果有一个操作数不是数值，那么会先使用`Number()`将其转换为数值

* 乘法
* 除法
* 求模

#### 加性操作符

* 加法<!--这是我自己总结的，不知道对不对-->：结果为数值或字符串

  * 如果两个操作数**都不是字符串且不是对象**：则将两个操作数都转为数值，然后进行正常的加法操作

  * 否则：对两个操作数根据类型调用`toString()`方法或`String()`函数

    * 对象、布尔值、数值`toString()`方法
    * `null`、`undefined`使用`String()`函数

    然后再将两个操作数拼接起来，返回结果

* 减法：结果为数值
  * 如果两个操作数**都不是对象**：先在后台调用`Number()`函数将其转换为数值，进行减法操作
  * 如果有一个操作数是对象：
    * 有`valueOf()`方法：获取该对象的数值后进行减法
    * 没有`valueOf()`方法：调用`toString()`方法并将得到的字符串转换为数值，再进行减法

#### 关系操作符

* 如果两个操作数**都为字符串**：比较两个字符串对应的字符编码值
* 否则：将两个操作数按照规则转化为数值，再进行比较

#### 相等操作符

##### 相等和不相等`==`

先转换，再比较（也叫强制转型）

| 第一个操作数 | 第二个操作数 | 值                              |
| ------------ | ------------ | ------------------------------- |
| null         | undefined    | true                            |
| null         | 0            | false                           |
| undefined    | 0            | false                           |
| NaN          | NaN          | false                           |
| NaN          | 任意值       | false                           |
| false        | 0            | true                            |
| true         | 1            | true                            |
| 字符串       | 数值         | 字符串变为数值后比较            |
| 布尔值       | 任意值       | 变为数值后比较                  |
| 对象         | 对象         | 比较是否**指向**同一对象        |
| 对象         | 非对象       | 对对象调用`valueOf()`方法后比较 |

##### 全等和不全等`===`

不转换，直接比较

注意：`undefined === null`的结果为`false`



#### 条件操作符

`variable = boolean_expression ? true_value : false_value`

#### 赋值操作符

将右侧的值赋给左侧的变量

#### 逗号操作符

* 在一条语句中执行多个操作
* 在赋值时，逗号表达式**总会返回表达式中的最后一项**

```JavaScript
var num = (5, 1, 3, 0, 7) 	//num的值为7
```



### 3.6 语句

#### `for-in`语句

精准的**迭代语句，用来枚举对象的属性**

`ECMAScript`对象的属性没有顺序，因此通过该循环输出的属性名的**顺序是不可预测的**

```JavaScript
var a = {"name":"shaw","age":19};
for (i in a) {
    console.log(i);
}
//name
//age
```

#### `label`语句

`label: statement`

```JavaScript
start: for (let i = 0; i < 10; i++) {
    console.log(i);
}
```

`label`语句可以在**代码中添加标签**，以便将来使用

#### `break`和`continue`语句

`break`：立即退出循环，强制执行循环后的语句

`continue`：退出当前层循环，从循环顶部继续执行

**与`label`联合使用**

```JavaScript
mark:
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        if(i == 5 && j == 5) {
            break mark;
        }
        num++;
    }
}
console.log(num);//55
```

#### `with`语句

* `with`语句的作用是将代码的作用域设置到一个特定的对象中

* 严格模式下不允许使用`with`语句

* 大量使用`with`语句会导致性能下降

#### `switch`语句

* 可以使用**任意数据类型**
* `case`的值不一定是常量，也可以是**变量甚至表达式**
* 比较时使用的是**全等操作符**



### 3.7 函数

`return;`语句的返回值为`undefined`

##### 理解参数

* 在`ECMAScript`中参数是用一个数组来表示的，函数接收到的永远是一个数组，而不关心数组中包含哪些参数。因此**传递进来的参数个数/数据类型都不重要**

* 在函数体内可以使用`arguments`对象来访问参数数组

  ```javascript
  function hello() {
      console.log("Hello, " + arguments[0]);
  }
  hello("Shaw");
  //Hello, Shaw
  ```

* 使用`arguments.length`可获取参数个数
* 可以设置`arguments`中元素的值，并且它的值永远**与对应命名参数的值**保持同步（严格模式下无效）
* `ECMAScript`中的所有参数传递的都是**值**，**不能通过引用传参**

##### 没有重载

* 在`ECMAScript`中**后定义的函数会覆盖先定义的函数**

> 在`ECMAScript`中没有函数签名，其函数参数是以一个包含0/多个值的数组形式传递的，因此不能重载



## 4. 变量、作用域与内存

### 4.1 基本类型和引用类型的值

* 基本类型值：`Undefined`、`Null`、`Number`、`Boolean`、`String`

  这五种基本数据类型是按值访问的，因为可以**直接操作保存在变量中的实际的值**

* 引用类型值：保存在**内存**中的对象

  复制保存着对象的变量时：操作的是对象的引用

  为对象添加属性时：操作的是实际的对象

#### 动态的属性

只能给**引用类型值**动态地添加属性

#### 复制变量值

* 基本类型值
  * 原来的变量和新变量完全独立

* 引用类型值
  * 将存储在变量对象中的值复制一份放到为新变量分配的空间中
  * 但这个值的副本实际上是**指针**，指向存储在堆中的一个对象

#### 传递参数

**`ECMAScript`中的函数的参数都是按值传递的**

p71 详细理解为什么对象也是按值传递的

#### 检测类型

* 检测基本数据类型

  `typeof`函数检测

  注意：对象或`null`都会返回`object`

  > 为什么`null`也返回`object`，因为这是个历史遗留bug，太秀了
  >
  > 详见：<https://www.cnblogs.com/xiaoheimiaoer/p/4572558.html>

* 检测引用类型

  `instanceof`

  ~~~JavaScript
  console.log(person instanceof Object);
  console.log(a instanceof Array);
  console.log(b instanceof RegExp);
  ~~~

  判断变量是否为**给定引用类型的实例**

  > 用`instanceof`检测基本类型时返回值永远是`false`



### 4.2 执行环境及作用域

* 变量对象

  每个执行环境都有一个与之关联的变量对象，用于保存**环境中定义的变量和函数**

* 全局执行环境

  最外围的执行环境

* 环境栈

  每个函数都有自己的**执行环境**

  当**执行流**进入一个函数时，函数的环境就会被推入**环境栈**中

  当函数执行后，栈将该函数的执行环境弹出，把**控制权返回给**之前的执行环境

* 作用域链

  当代码在某一环境中执行时，会创建该环境的变量对象的**作用域链**

  作用域链用于保证当前执行环境中所有有权访问的函数和变量的**有序访问**

#### 延长作用域链

* `with`语句

  ```javascript
  function hello() {
      var extend = "hello there";
      with(extend) {
          console.log(toUpperCase());
      }
  }
  ```

  `with`语句接收`extend`对象，其变量对象被添加到了**作用域链的最顶端**

* `try-catch`语句



#### 没有块级作用域

* 声明变量

  `var`声明的变量会自动被添加到**最接近的环境**中

  没有使用`var`声明的变量会被添加到全局环境

### 4.3 垃圾收集

`JavaScript`具有**自动垃圾收集机制**，即**找出那些不再继续使用的变量，然后释放其占用的内存**。为此，垃圾收集器会按照固定的时间间隔，周期性的执行这一操作

标识无用变量的策略：

* 标记清除：

  变量进入环境，标记为”进入环境“；相应的，变量离开环境，则标记为“离开环境”

* 引用计数：

  跟踪记录每个值被引用的次数



## 5. 引用类型

对象是某个**特定引用类型**的实例，如`var person = new Object();`,

新对象使用`new`操作符，后面加一个**构造函数**来创建

### 5.1 Object类型

* 创建`Object`实例

  * **`new`操作符 + `Object()`构造函数**

  * **对象字面量表示法**

    ```javascript
    var person = {
        name : "Shaw",
        age : 19
    }
    ```

    左花括号`{`表示对象字面量的开始，因为他出现在了**表达式上下文**（expression context）中

    > 花括号出现在**表达式上下文**中，表示对象字面量的开始
    >
    > 花括号出现在**语句上下文**中，表示一个**语句块的开始**

    ```javascript
    var person = {}
    ```

    使用对象字面量表示法时，如果留空花括号，则相当于`new Object()`

* 访问对象属性

  * 点表示法：`person.name`
  * 方括号表示法：
    * `person["name"]`
    * `person["first name"]`（这种会导致语法错误的属性名不能用点表示法访问） 

  <!--方括号表示法的优点是：可以通过变量来访问属性-->

### 5.2 Array类型

* 创建数组

  * **`Array()`构造函数**

    `var colors = new Array()`

    * 构造函数中可以传项目的数量

      `var colors = new Array(10)`

    * 构造函数中可以传数组中包含的项

      `var colors = new Array("blue", "red", "green")`

    * 使用构造函数可以省略`new`操作符

      `var colors = Array(3)`

      `var colors = Array("blue", "green")`

  * **数组字面量表示法**

    `var colors = ["red", "blue", "white"]`

* 访问数组元素
  * 如果索引超过了数组大小，那么数组就会**自动增加到该索引值+1的长度**
  * 数组的`length`**不是只读**的，可以通过修改`length`修改数组的大小

* 检测数组

  * `instance of`操作符

    问题：**假设只有一个全局执行环境**；当网页包含多个框架时，那么存在2+个全局执行环境，则存在**两个以上不同版本的`Array`构造函数

  * `Array.isArray()`方法

    `ECMAScript5`新增方法，不会管它是在哪个全局执行环境中创建

* 转换方法

  * `valueOf()`：返回原数组
  * `toString()`：返回数组中每个值的字符串形式拼接而成的、以逗号分隔的 字符串

    > `alert(Array)`：`alert`接受字符串，因此会在后台**调用`toString()`方法
  * `toLocaleString()`：创建一个数组值的以逗号分隔的字符串

* 栈方法

  * `push()`
  * `pop()`

* 队列方法

  * `shift()`：从队首删除首项并返回该项
  * `push()`：从队尾插入元素并返回该数组长度
  * `unshift()`：从队首插入元素并返回新数组的长度
  * `pop()`从队尾删除元素并返回该项

* 重排序方法

  * `sort()`

    * 默认比较方法：调用数组中**每一项的`toString()`方法**，再进行比较

    * 自定义比较方法：比较函数

      如果第一个参数在第二个参数前，返回负数；

      如果第一个参数与第二个参数相等，返回`0`；

      如果第一个参数在第二个参数后，返回正数

      ```JavaScript
      function compare(v1, v2) {
          return v2 - v1;
      }
      ```

* 操作方法

  1. `concat()`方法：向当前数组插入一些值

     参数：一些值或者数组

     返回值：新构建的数组‘

  2. `slice()`方法：基于当前数组的一项或多项创建一个新的数组

     参数：一或两个参数

     * 一个参数：从该参数指定位置开始到数组末尾的所有项
     * 两个参数：左闭右开

  3. `splice()`方法：

     * 删除：删除任意数量项

       参数：`splice(pos, num)`

       > `pos`为起始位置，`num`为删除数量

     * 插入：向指定位置插入任意数量项

       参数：`splice(pos, 0, "red", "green")`

       > `pos`为起始位置，`0`表示删除0项，`"red", "green"`表示插入的项目

     * 替换：向指定位置删除任意项并插入任意项

       参数：`splice(pos, num, "red", "green")`

       > `pos`为起始位置，`num`指定删除数量

* 位置方法

  `indexOf(item, pos)`方法：从前往后找

  `lastIndexOf(item, pos)`方法：从后往前找

  参数：1. `item`待查找项；2. `pos`可选参数，索引起点位置

  比较是使用**全等操作符**


* 迭代方法
  * `every()`
  * `some()`
  * `map()`
  * `forEach()`
  * `filter()`

* 归并方法

  * `reduce()`

  * `reduceRight()`

    ```javascript
    var a = [1, 3, 10, 56, 1027, 512];
    
    var sum1 = a.reduce(function(prev, cur, index, array) {
      return prev + cur;
    })
    var sum2 = a.reduceRight(function(prev, cur, index, array) {
      return prev + cur;
    })
    console.log(sum1);
    console.log(sum2);
    ```

### 5.3 Date类型

* 创建`date`类型

  `var now = new Date()`

  无参数的新对象自动获取当前日期和时间

  带参数的`Date()`构造函数会在后台调用`Date.parse()`

* `Date.parse()`

  接收一个表示**日期的字符串参数**

  `5/12/2000`

  `May 12, 2000`

  `Tue May 25 2004 00:00:00 GMT-0700`

  `2004-05-25T00:00:00`

  ```JavaScript
  var someDate = new Date(Date.parse("May 12, 2000"));
  ```

  不同情况下支持的日期格式也不同

* `Date.UTC()`

  返回日期的毫秒数

* `Date.now()`

  表示日期和时间的毫秒数

  等价于`+new Date()`


### 5.4 RegExp类型

语法：`var expression = / pattern / flags`

`pattern`：任意正则表达式

`flags`：一个或多个标志，用来**标明正则表达式的行为**

* `g`：全局模式，模式将被应用于所有字符串
* `i`：不区分大小写模式
* `m`：多行模式，即达到一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项

### 5.5 Function类型

**函数实际上是对象**

* 函数名是指向函数的指针
* 每个函数都是`Function`类型的实例

#### 函数定义

* 函数声明语法

  ```javascript
  function f1 (num1, num2) {
    return num1 + num2;
  }
  ```

* 函数表达式定义

  ```javascript
  var f2 = function(num1, num2) {
    return num1 + num2;
  }
  ```

* ~~`Function`构造函数~~ （不推荐）

  ```javascript
  var f3 = new Function("num1", "num2", "return num1 + num2;")
  //接收任意个参数，最后一个参数为函数体
  ```

#### 函数名后带不带括号的区别

不带圆括号的函数名是**访问函数指针**

带圆括号的函数名是**调用函数**

#### 没有重载

函数名是指针，因此后面的函数会覆盖前面的函数

#### 函数声明与函数表达式的区别

* 解析器会**率先读取函数声明**，并**使其在执行任何代码之前可用**

  也就是说使用函数声明时，可以将其放在调用位置后

* 函数表达式必须**等到解析器执行到它所在的代码行**，才会真正被解析执行

#### 函数内部属性

* `arguments`：类数组对象

  有一个名为`callee`的属性，是一个**指向拥有这个`arguments`对象的函数的指针**

  用于**消除紧密耦合的现象**

  ```javascript
  function factorial(num) {
    if (num <= 1) {
      return 1;
    }
    else {
      return num * arguments.callee(num - 1);//递归与函数名不再有关
    }
  }
  ```

* `this`：引用**函数执行的环境对象**的指针

  在网页的全局作用域中调用函数时，`this`对象引用的是`window`

* `caller`：

  * 保存着**调用当前函数的函数的引用 **
  * 全局作用域中调用当前函数**值为`null`**

#### 函数的属性和方法

每个函数都有两个属性：`length`与`prototype`

* `length`：函数希望接收参数的个数

* `prototype`：保存`ECMAScript`引用类型的所有实例方法

  `prototype`属性不可枚举，因此使用`for-in`无法发现

每个函数都有两个非继承而来的方法：`apply()`与`call()`

​	两方法都用于在**特定作用域**中调用函数

`ECMAScript5`还定义了一种方法：`bind()`

​	创建一个函数的实例，其`this`值会被绑定到传给`bind()`函数的值

```javascript
o = {color:"blue"};
function sayColor {
  console.log(this.color);
}
var objSayColor = sayColor.bind(o);
//创建一个sayColor的实例		将o对象的this值绑定在objSaycolor上
objSaycolor();	//"blue"
```



### 5.6 基本包装类型

3个特殊的引用类型：`Boolean`，`Number`，`String`

* 引用类型与基本包装类型的**主要区别**：

  **对象的生存期**

  * 引用类型：执行流离开当前作用域之前，一直保存在内存中

  * 基本包装类型：只存在于在调用基本类型方法的一瞬间，然后立刻被销毁

    因此我们不能在运行时为基本类型添加属性/方法

#### Number类型

* 重写了`valueOf()`、`toString()`、`toLocaleString()`继承而来的方法
* Number类型提供的、将数值格式化为字符串的方法
  * `toFixed(num)`：返回含有`num`位小数的字符串，**自动舍入**（根据浏览器不同标准可能不同）
  * `toExponential(num)`：科学计数法表示，`num`指定小数位数
  * `toPrecision()`：自动判断调用`toFixed()`还是`toExponential()`

#### String类型

* `length`属性

* 字符方法

  * `charAt(pos)`：返回`pos`位字符
  * `charCodeAt(pos)`：返回`pos`位字符编码

* 字符串操作

  * `concat(str)`：拼接一/多个字符串

  * `slice(startpos, endpos)`：

    第二个参数可选，默认值为字符串长度

    参数为负时，转换为字符串长度 + 负数

  * `substring(startpos, endpos)`

    第二个参数可选，默认值为字符串长度

    参数为负数时，转换为0

  * `substr(startpos, num)`

    第二个参数可选，默认截取到字符串末尾

    第一个参数为负数时，转换为字符串长度 + 负数；

    第二个参数为负数时，转换为0

* 字符串位置方法：搜索给定子字符串

  * `indexOf(substr, pos)`

    `pos`可选，表示搜索起点

  * `lastIndexOf(substr, pos)`

    `pos`可选，表示搜索起点

* 字符串删除空格

  * `trim()`
  * `trimLeft()`
  * `trimRight()`

* 字符串大小写转换

  `toLowerCase()`、`toUpperCase()`

  `toLocaleLowerCase()`、`toLocaleUpperCase()`：针对地区的方法实现大小写转换

* 比较字符串大小

  `localeCompare(str)`

  字符串在字母表中排在字符串参数前，返回负数

  字符串等于字符串参数，返回0

  字符串在字母表中排在字符串参数后，返回正数

* `fromCharCode()`

  `String`构造函数**本身**的静态方法，用于接收一/多个字符编码，然后转换成字符串

  本质上与实例方法`charCodeAt()`是相反操作

### 5.7 单体内置对象

#### Global对象

不属于任何其他对象的属性/方法，都是`Global`对象的属性/方法

1. URI编码方法

   `encodeURI()`

   `encodeURIComponent()`

   `decodeURI()`

   `decodeURIComponent()`

2. `eval()`方法

   相当于一个完整的的`ECMAScript`解析器

   <!--有点小懵逼 到底有啥用-->

3. `window`对象

   Web浏览器都是将`Global`全局对象作为`window`对象的一部分加以实现的

   因此在全局作用域中声明的所有函数/变量都成为了`window`对象的属性

#### Math对象



## 6. 面向对象的程序设计

`ECMA-262`将对象定义为**无序属性的集合**，其属性可包含基本值、对象或函数

### 6.1 理解对象

#### 属性类型

* 数据属性

  * `[[Configurable]]`：
    * 能否通过`delete`删除属性从而重新定义属性；
    * 能否修改属性的特性
    * 能否把属性修改为访问器属性
    * 一旦把属性定义为不可配置的，就不能再把它变为可配置了
  * `[[Enumerable]]`：能否使用`for-in`循环遍历
  * `[[Writable]]`：能否修改
  
  > 以上属性对于**直接定义在对象上的属性**，其默认值均为`true`
  
  * `[[Value]]`
  
  要修改属性默认的特性，使用`Object.defineProperty(对象，属性名，描述符对象)`方法
  
  ```JavaScript
  var person = {};
  person.name = "p1";
  console.log(person.name);//p1
  Object.defineProperty(person, "name", {
    writable:false,//将属性改成只读的
    value:"p2"
  })
  console.log(person.name);//p2
  person.name = "p3"
  console.log(person.name);//p2
  ```
  
  注意：如果使用`Object.defineProperty()`方法创建一个新属性时，`configurable`、`enumerable`与`writable`的默认值均为`false`！！！

* 访问器属性

  * `[[Configurable]]`
  * `[[Enumerable]]`

  > 以上属性对于**直接定义在对象上的属性**，其默认值均为`true`

  * `[[Get]]`：在读取属性时调用的函数，默认值为`undefined`
  * `[[Set]]`：在写入属性时调用的函数，默认值为`undefined`

#### 修改多个属性

`defineProperties(对象，对象)`方法

```javascript
var book = {};
Object.defineProperties(book, {
  _year: {
    writable:true,
    value:2004
  },
  edition: {
    writable:true,
    value:1
  }
})
```

#### 读取属性的特性

`Object.getOwnPropertyDescriptor(对象，属性名称)`方法



### 6.2 创建对象

#### 工厂模式

用**函数**来封装以特定接口创建对象的细节

优点：解决创建多个相似对象的问题

缺点：没有解决对象识别的问题（怎样知道一个对象的类型）

```JavaScript
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  }
  return o;
}
```

#### 构造函数模式

```JavaScript
//构造函数模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  }
}
var person2 = new Person("Shaw", 19, "student");
```

<!--？？？为什么Person不是Function的实例啊-->

* 构造函数当作函数

  * 作为普通函数使用

    ```JavaScript
    Person("Shaw", 19, "student");//赋给全局变量window
    window.sayName();
    ```

  * 在另一个对象的作用域中使用

    ```JavaScript
    var o = new Object();
    Person.call(o, "Shaw", 19, "student");
    ```

* 构造函数的缺点

  **每个方法都要在每个实例上重新创建一一遍**

  ```Javascript
  var person2 = new Person("Shaw", 19, "student");
  var person1 = new Person("Shaun", 18, "student");
  console.log(person1.sayName == person2.sayName);//false
  ```

#### 原型模式

* **构造函数、原型对象与实例的关系**
  * 每个函数都有一个`prototype`属性：
    * `prototype`是指针
    * 该指针指向一个对象
    * 该对象包含**可以由特定类型的所有实例共享的属性和方法**，也叫**原型对象**
  * 每个原型对象都有一个默认的`constructor`属性
    * `constructor`是一个指针
    * 该指针指向`prototype`属性所在的函数
    * 每个原型对象还包括从`Object()`继承过来的方法
  * 每个实例都有一个内部属性`[[prototype]]`
    * `[[prototype]]`是指针
    * 该指针指向构造函数的**原型对象**

* **判断实例与函数之间是否有关联**
  * `isPrototypeOf()`方法

    ```JavaScript
    console.log(Person.prototype.isPrototypeOf(person1));
    ```

  * `Object.getPrototypeOf()`方法

    ```JavaScript
    console.log(Object.getPrototypeOf(person1));
    //Person { name: 'Shaw', age: 19, job: 'student', sayName: [Function] }
    ```

* **实例中定义的属性会屏蔽原型中同名的属性**

  ```javascript
  function Person() {};
  Person.prototype.name = "Shaw";
  Person.prototype.age = 19;
  Person.prototype.job = "student";
  Person.prototype.sayName = function() {
    console.log(this.name);
  }
  
  var person1 = new Person();
  var person2 = new Person();
  person2.name = "Shaun";
  console.log(person2.name);
  ```

  `hasOwnProperty()`方法：属性存在于实例中返回`true`，属性存在于原型中返回`false`

  `hasPtopotypeProperty()`方法：属性存在于实例中返回`false`，属性存在于原型中返回`true`

* **`for-in`循环**

  返回所有能**通过对象访问的**、**可枚举的**属性，其中包括实例、原型中的属性

* **获取对象上所有可枚举的实例属性**

  `Object.keys()`方法

  ```javascript
  function Person() {};
  Person.prototype.name = "Shaw";
  Person.prototype.age = 19;
  Person.prototype.job = "student";
  Person.prototype.sayName = function() {
    console.log(this.name);
  }
  
  var person = new Person();
  person.name = "Shaw";
  person.age = 18;
  
  console.log(Object.keys(Person.prototype));
  //[ 'name', 'age', 'job', 'sayName' ]
  console.log(Object.keys(person));
  //[ 'name', 'age' ]
  ```

* **获取对象上所有的实例属性**

  `Object.hasOwnPropertyNames()`方法

  ```JavaScript
  console.log(Object.getOwnPropertyNames(Person.prototype));
  //[ 'constructor', 'name', 'age', 'job', 'sayName' ]
  ```

  `constructor`属性不可枚举，因此用`Object.keys()`方法获取不到

* **简化原型模式语法**

  ```JavaScript
  function Person() {};
  
  Person.prototype = {
    name:"Shaw",
    age:19,
    job:"student",
    sayName:function() {
      console.log(this.name);
    }
  };
  ```

  问题：这样写会导致`constructor`属性不再指向`Person`函数，而是`Object`构造函数

  解决方法：在`Person.prototype`中将`constructor`设置为`Person`

  ​	问题：导致`constructor`属性变为可枚举属性

  ​	解决方法：使用`Object.defineProperty()`修改

* **原型的动态性**

  

#### 组合使用构造函数和原型模式

#### 动态原型模式



### 6.3 继承

#### 原型链



## 7. 函数表达式

* 函数声明

* 函数表达式

  ```javascript
  var functionName = function() {
    
  }
  ```

  这种形式看起来好像常规的变量赋值语句，即创建一个函数**并将它赋值给变量**，这样创建的函数叫做**匿名函数**


### 7.1 递归

递归函数是在一个函数通过名字调用自身的情况下构成的

前面我们说过，为了消除耦合，可将函数名写为`arguments.callee`

但是在严格模式下，访问这个属性会报错

我们还可以通过**命名函数表达式**的解决这个问题

```JavaScript
var factorial = (function f(num) {
  if num <= 1 {
    return 1;
  }
  else {
    return num * f(num - 1);
  }
});
```



### 7.2 闭包

闭包指的是**有权访问另一个函数作用域中的变量的函数**

> 函数a返回函数b时，如果函数b引用了函数a的局部变量，实际的返回值就变成了**函数b的函数体**和**一个闭包**，闭包里是函数b用到的全部变量

**创建函数：**

* 创建作用域链
* 将作用域链保存在函数内部属性`[[scope]]`中

**调用函数**：

* 创建执行环境
* 复制`[[scope]]`属性中的作用域链

***补充：变量对象与活动对象***

* 变量对象
  *  变量对象就是**执行环境**中包含了所有**变量**和**函数**的对象
  * 变量对象是后台的，保存在内存中的，代码无法直接访问的。 
* 活动对象
  * 函数调用了，函数中才会有活动对象，否则只有“处于静止状态”的变量对象，当然也没有创建执行环境。
  * 活动对象就是作用域链上正在被执行和引用的变量对象

______

```JavaScript
function closure(propertyName) {
  return function(obj) {			//定义并返回一个闭包
    return obj[propertyName];
  };
};

let person = {name: "Shaw", age: 19};
let sayName = closure("name");
let sayAge = closure("age");
console.log(sayName(person), sayAge(person))
```

第二行在`closure`函数执行完毕以后，它的活动对象`propertyName`有没有被销毁，因为匿名函数的作用域链仍然在**引用这个活动对象**；即外部函数返回后，**其执行环境的作用域链会被销毁，但活动对象仍存在于内存中**；直到匿名函数被销毁后，外部函数的活动对象才会被销毁。

```Javascript
function createFunctions() {
  var result = new Array();
  for(var i = 0; i < 10; i++) {
    result[i] = function() {
      return i;
    }
  }
  return result;
}
for(let i = 0; i < 10; i++) {
  console.log(createFunctions()[i]());
}
```

在声明函数`createFunctions()`时，给每个`result[i]`分配了一个函数定义，这个函数是一个匿名函数

在倒数第二行对每个`result[i]`执行这个匿名函数时，`return i`时会在这个匿名函数的作用域链中查找变量`i`的值，由于在定义函数时，`i`的值已经循环到了`10`，则返回值均为`10`



#### 关于`this`对象

匿名函数的执行环境具有**全局性**，因此`this`对象常常指向`window`

因为每个函数在被调用时都会自动获取两个特殊的变量`this`与`arguments`

内部函数在搜索这两个变量时，只会搜索到**内部函数的活动变量位为止**，因此永远不可能直接访问外部函数中的这两个变量

#### 内存泄漏

如果闭包的作用域里**保存着一个`HTML`元素**，那么该元素将无法被销毁

解决方案：

```JavaScript
function assignHandler() {
  var element = document.getElementById("whatever");
  var id = element.id;
  
  element.onclick = function() {
    alert(id);
  };
  element = null;
}
```

1. 将`element.id`的一个副本保存在一个变量中，并在闭包中引用该变量消除循环引用（13章）
2. 将`element`变量设置为`null`



