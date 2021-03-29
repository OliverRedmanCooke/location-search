# Questions

Q1: Explain the output of the following code and why

```js
    setTimeout(function() {
      console.log("1");
    }, 100);
    console.log("2");
```
Answer: "2" will be printed before 1 becuase the first console log is in a setTimeout function which will make it wait

Q2: Explain the output of the following code and why

```js
    function foo(d) {
      if(d < 10) {
        foo(d+1);
      }
      console.log(d);
    }
    foo(0);
```

Answer: The number is incremented until it is no longer less than 10, then it is decreased

Q3: If nothing is provided to `foo` we want the default response to be `5`. Explain the potential issue with the following code:

```js
    function foo(d) {
      d = d || 5;
      console.log(d);
    }
```

Answer: This is not checking the passed variable type, It wont accepet empty strings 

Q4: Explain the output of the following code and why

```js
    function foo(a) {
      return function(b) {
        return a + b;
      }
    }
    var bar = foo(1);
    console.log(bar(2))
```

Answer: The function foo is being passed 1 and the function it returns is being passed 2 by bar(2), meaning it does 1 + 2, then logs 3.

Q5: Explain how the following function would be used

```js
    function double(a, done) {
      setTimeout(function() {
        done(a * 2);
      }, 100);
    }
```
Answer: This would be used with another function i.e "done". This would multiply the number passed to done by two and delay done() being called