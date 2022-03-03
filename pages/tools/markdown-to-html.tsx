import { useSetState } from "ahooks";
import { CodeEditor } from "components/CodeEditor";
import { CopyableText } from "components/CopyableText";
import LayoutTools from "components/LayoutTools";
import marked from "marked";

const SAMPLE = `**Advertisement 😃**

*   **[pica](https://nodeca.github.io/pica/demo/)** - high quality and fast image resize in browser.
*   **[babelfish](https://github.com/nodeca/babelfish/)** - developer friendly i18n with plurals support and easy syntax.

You will like those projects!

* * *

h1 Heading 😎
=============

h2 Heading
----------

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

Horizontal Rules
----------------

* * *

* * *

* * *

Typographic replacements
------------------------

Enable typographer option to see result.

© © ® ® ™ ™ § § ±

test… test… test… test?.. test!..

!!! ??? , – —

“Smartypants, double quotes” and ‘single quotes’

Emphasis
--------

**This is bold text**

**This is bold text**

_This is italic text_

_This is italic text_

~Strikethrough~

Blockquotes
-----------

> Blockquotes can also be nested…
> 
> > …by using additional greater-than signs right next to each other…
> > 
> > > …or with spaces between arrows.

Lists
-----

Unordered

*   Create a list by starting a line with \`+\`, \`-\`, or \`*\`
*   Sub-lists are made by indenting 2 spaces:
    *   Marker character change forces new list start:
        
        *   Ac tristique libero volutpat at
        
        *   Facilisis in pretium nisl aliquet
        
        *   Nulla volutpat aliquam velit
*   Very easy!

Ordered

1.  Lorem ipsum dolor sit amet
    
2.  Consectetur adipiscing elit
    
3.  Integer molestie lorem at massa
    
4.  You can use sequential numbers…
    
5.  …or keep all the numbers as \`1.\`
    

Start numbering with offset:

57.  foo
58.  bar

Code
----

Inline \`code\`

Indented code

\`\`\`
// Some comments
line 1 of code
line 2 of code
line 3 of code
\`\`\`

Block code “fences”

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\`
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

Tables
------

| Option | Description |
| --- | --- |
| data | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| --- | --- |
| data | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext | extension to be used for dest files. |

Links
-----

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link [https://github.com/nodeca/pica](https://github.com/nodeca/pica) (enable linkify to see)

Images
------

![Minion](https://octodex.github.com/images/minion.png) ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text](https://octodex.github.com/images/dojocat.jpg "The Dojocat")

With a reference later in the document defining the URL location:

Plugins
-------

The killer feature of \`markdown-it\` is very effective support of [syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).

### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: 😉 :crush: 😢 :tear: 😆 😋
> 
> Shortcuts (emoticons): 😃 😦 😎 😉

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.

### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

*   19th
*   H2O

### [<ins>](https://github.com/markdown-it/markdown-it-ins)

Inserted text

### [<mark>](https://github.com/markdown-it/markdown-it-mark)

Marked text

### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[\[1\]](#fn1).

Footnote 2 link[\[2\]](#fn2).

Inline footnote[\[3\]](#fn3) definition.

Duplicated footnote reference[\[2:1\]](#fn2).

### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

Definition 1 with lazy continuation.

Term 2 with _inline markup_

Definition 2

\`\`\`
  { some code, part of Definition 2 }
\`\`\`

Third paragraph of definition 2.

_Compact style:_

Term 1

Definition 1

Term 2

Definition 2a

Definition 2b

### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts “HTML”, but keep intact partial entries like “xxxHTMLyyy” and so on.

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

_here be dragons_

* * *

1.  Footnote **can have markup**
    
    and multiple paragraphs. [↩︎](#fnref1)
    
2.  Footnote text. [↩︎](#fnref2) [↩︎](#fnref2:1)
    
3.  Text of inline footnote [↩︎](#fnref3)`;

export default function Page() {
  const [state, setState] = useSetState({
    endoded: "",
    decoded: "",
    encodingError: "",
    decodingError: ""
  });
  const clearErrors = () => setState({ encodingError: "", decodingError: "" });

  const handleDecodedChange = (value: string) => {
    setState({ decoded: value });
    clearErrors();
    try {
      if (!value) {
        setState({ endoded: "" });
      }
      const result = marked(value, {
        gfm: true
      });
      setState({ endoded: result });
    } catch (err) {
      console.error(err.message);
      setState({ encodingError: "Encoding Failed!" });
    }
  };

  return (
    <LayoutTools
      title="HTML To Markdown Converter"
      description="HTML To Markdown Converter On The FLY"
    >
      <div className="grid grid-cols-12 gap-4">
        <strong className="col-span-4">MARKDOWN</strong>
        {!!state.encodingError && (
          <span className="text-red-500 col-span-4">{state.encodingError}</span>
        )}
        <button
          type="button"
          className="w-full py-1 col-span-3 col-start-10 bg-green-600 rounded hover:bg-opacity-80 active:bg-opacity-80"
          onClick={() => {
            handleDecodedChange(SAMPLE);
          }}
        >
          Try Sample
        </button>
        <div className="col-span-12 relative">
          {state.endoded.length > 0 && (
            <CopyableText
              className="absolute bottom-10 right-6"
              iconSize={20}
              render={() => null}
              value={state.decoded}
            />
          )}
          <CodeEditor
            className="col-span-12 form-textarea dark:bg-gray-800 rounded-md w-full h-36"
            code={state.decoded}
            filename="file.html"
            onChange={handleDecodedChange}
          />
        </div>
        <strong className="col-span-4">HTML</strong>
        {!!state.decodingError && (
          <span className="text-red-500 col-span-4">{state.decodingError}</span>
        )}
        <div className="col-span-12 relative">
          {state.decoded.length > 0 && (
            <CopyableText
              className="absolute bottom-10 right-6"
              iconSize={20}
              render={() => null}
              value={state.endoded}
            />
          )}
          <CodeEditor
            className="col-span-12 form-textarea dark:bg-gray-800 rounded-md w-full h-36"
            code={state.endoded}
            disabled={true}
            filename="file.markdown"
          />
        </div>
      </div>
    </LayoutTools>
  );
}
