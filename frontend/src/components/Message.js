import React from 'react'
import '../styles/Message.css'

const Message = ({ msg, messageType, children }) => {
  return (
    <main className={`message message-${messageType}`}>
      {msg} {children}
    </main>
  )
}

Message.defaultProps = {
  messageType: 'info',
}

export default Message
