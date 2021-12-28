import Typed from "typed.js"
import { useRef, useEffect } from "react"

/**
 * 
 * @param {{ options: import("typed.js").TypedOptions } & import("react").HTMLAttributes} param0 
 * @returns 
 */

export function TypedText({ options = {}, ...props }) {
  const el = useRef(null)
  const conf = {
    typeSpeed: 100,
    backSpeed: 100,
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
