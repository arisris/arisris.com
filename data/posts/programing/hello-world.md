---
title: 'Hello World'
author: 'Aris Riswanto'
createdAt: '2021-03-04 09:00:01 PM'
summary: 'Just Simple Hello World'
image: ''
---

> This is sample post writen in markdown syntax

> Highlight.js use for syntax higlighter

### Example javascript

```js
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
  });
});
```

### Example jsx

```js
import Link from "next/link";
import Head from "next/head";
export default function Error404() {
  return (
    <div className="absolute flex flex-col justify-center items-center w-full h-full">
      <Head>
        <title>404 Page Not Found</title>
      </Head>
      <div className="p-4 rounded shadow-md hover:shadow-xl">
        <h1 className="flex items-center text-6xl font-bold text-purple-900 dark:text-white">
          404 <span className="ml-2 text-sm rounded-xl">Page Not Found</span>
        </h1>
      </div>
      <div className="text-center mt-4">
        <Link href="/">
          <a className="text-purple-900 dark:text-white text-sm ring px-3 py-1 ring-purple-900 dark:ring-gray-800">
            Back To Home
          </a>
        </Link>
      </div>
    </div>
  );
}

```

### Example php

```php
$msg = "Hello World";
$showHello = fn() => $msg;

class App extends Blah {
  protected $hi;
  private $hu;
  private static BROW = "Hey Brow";
  public function __construct($hi, $hu) {
    $this->hi = $hi;
    $this->hu = $hu;
  }
  public function showBrow() {
    return self::BROW;
  }
}
```