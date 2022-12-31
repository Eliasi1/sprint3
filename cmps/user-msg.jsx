import { eventBusService } from "../services/event-bus.service.js"
const { useState, useEffect, useRef } = React

export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg)
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }
      timeoutIdRef.current = setTimeout(() => {
        setMsg(null)
      }, 3000);
    })

    return unsubscribe
  })

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`animate__animated animate__fadeInDown animate__faster user-msg ${msg.type}`}>
      <button className="fa-solid circle-xmark" onClick={closeMsg}></button>
      {msg.txt}
    </section>
  )
}

