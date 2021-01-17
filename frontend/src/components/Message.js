import React from 'react'
import '../styles/Message.css'

const Message = ({ msg, messageType, children }) => {
  return (
    <main>
      <div className={`message message-${messageType}`}>
        {msg} {children}
      </div>
    </main>
  )
}

Message.defaultProps = {
  messageType: 'info',
}

export default Message
