# line-controller.js
Line Unit Editor for Multiple Files
[NPM page](https://www.npmjs.com/package/line-controller)

## Install

```
npm install line-controller
```

## **Usage**

### import line-controller

```jsx
const { insertLine, deleteLine, updateLine, selectLine } = require('line-controller');
```

![image](https://user-images.githubusercontent.com/49153756/91595653-dc660700-e99e-11ea-92c5-19e2a5a37a3b.png)

### insertLine

**example**

```jsx
/**
 * @description targetDir에 있는 파일들 중 파일명에 targetWord가 포함되는 파일에 원하는 line들을 삽입한다.
 * @param {String} targetDir 원하는 디렉토리의 경로 ex) 'files/'
 * @param {String} targetWord 파일명에 포함된 원하는 단어
 * @param {Number} targetLine 삽입하고 싶은 라인 번호
 * @param  {...String} lines 삽입하고 싶은 문자열 (여러 문자열 가능)
 * @return {Promise} 수행된 프로미스. resolve에 삽입된 결과 파일의 내용이 담긴다.
 */

insertLine('files/', 'javascript', 8, 'tag:', '\t- JavaScript');
```

- before

```
---
layout: post
title: "JavaScript 1"
subtitle: "JavaScript Study"
date: 2020-08-28 09:51:12
author: kwon
categories: JavaScript
---
# JavaScript 1
```

- after

```
---
layout: post
title: "JavaScript 1"
subtitle: "JavaScript Study"
date: 2020-08-28 09:51:12
author: kwon
categories: JavaScript
tag:
	- JavaScript
---
# JavaScript 1
```

### deleteLine

**example**

```jsx
/**
 * @description targetDir에 있는 파일들 중 파일명에 targetWord가 포함되는 파일에 원하는 line을 지운다.
 * @param {String} targetDir 원하는 디렉토리의 경로 ex) 'files/'
 * @param {String} targetWord 파일명에 포함된 원하는 단어
 * @param {Number} targetLine 삭제하고 싶은 라인 번호
 * @param {Number} deleteCount 삭제를 원하는 라인 수
 * @return {Promise} 수행된 프로미스. resolve에 목표 라인이 제거된 결과 파일의 내용이 담긴다.
 */

(async () => {
    const result = await deleteLine('files/', 'javascript', 8, 2);
    console.log(result);
})();
```

- before

```
---
layout: post
title: "JavaScript 1"
subtitle: "JavaScript Study"
date: 2020-08-28 09:51:12
author: kwon
categories: JavaScript
tag:
	- JavaScript
---
# JavaScript 1
```

- after(output)

```
---
layout: post
title: "JavaScript 1"
subtitle: "JavaScript Study"
date: 2020-08-28 09:51:12
author: kwon
categories: JavaScript
---
# JavaScript 1
```
