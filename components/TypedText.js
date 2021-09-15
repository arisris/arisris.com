import Typed from "typed.js"
import { useRef, useEffect } from "react"

export function TypedText({ options = {}, ...props }) {
  const el = useRef(null)
  const conf = {
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
    cursorChar: "|",
    ...options,
  }
  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, conf)
      return () => typed.destroy()
    }
  }, [el])
  return <div ref={el} {...props}></div>
}
