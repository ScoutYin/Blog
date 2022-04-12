/**
 * 模拟实现new运算符
 * 需要以下关键操作
 * 1、创建一个对象obj；
 * 2、将该对象的__proto__属性指向构造函数的原型；
 * 3、调用该构造函数，并将obj作为该构造函数内的this上下文；
 * 4、返回一个对象（如果构造函数执行结果返回的是一个对象，则最终返回这个对象，否则返回obj）
 * @param {*} Ctor
 */
function newOperator(Ctor, ...args) {
  if (typeof Ctor !== 'function') {
    throw Error('Ctor must be a function');
  }
  // 创建一个对象，将该对象的__proto__属性指向构造函数Ctor的原型
  const obj = Object.create(Ctor.prototype);

  // 调用该构造函数，并将obj作为该构造函数内的this上下文
  const result = Ctor.apply(obj, args);
  // 如果构造函数执行结果返回的是一个对象，则最终返回这个对象，否则返回obj
  if (result && (typeof result === 'object' || typeof result === 'function')) {
    return result;
  }
  return obj;
}

// -------------- test cases -------------
// test case1: 构造函数不返回对象
console.log('测试用例：构造函数不返回对象');
function Person1(name) {
  this.name = name;
}
const person1 = new Person1('alice');
console.log(person1); // Person1 { name: 'alice' }
console.log(Object.getPrototypeOf(person1)); // {constructor: ƒ}
const mockPerson1 = newOperator(Person1, 'alice');
console.log(mockPerson1); // Person1 { name: 'alice' }
console.log(Object.getPrototypeOf(mockPerson1)); // {constructor: ƒ}

// test case2: 构造函数返回对象
console.log('测试用例：构造函数返回对象');
function Person2(name) {
  return {
    name: `hello, ${name}`
  };
}
const person2 = new Person2('bob');
console.log(person2); // { name: 'hello, bob' }
console.log(Object.getPrototypeOf(person2)); // {}
const mockPerson2 = newOperator(Person2, 'bob');
console.log(mockPerson2); // { name: 'hello, bob' }
console.log(Object.getPrototypeOf(mockPerson2)); // {}

// test case3: 构造函数返回函数
console.log('测试用例：构造函数返回函数');
function FunctionTest() {
  return function () {};
}
const functionTest = new FunctionTest();
console.log(functionTest);
console.log(Object.getPrototypeOf(functionTest));
const mockFunctionTest = newOperator(FunctionTest);
console.log(mockFunctionTest);
console.log(Object.getPrototypeOf(mockFunctionTest));
