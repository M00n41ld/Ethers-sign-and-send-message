const Message = ({text, action, isVisible}) => {
  return (
    <div className={`message-def ${isVisible ? 'message_visible' : 'message_not-visible'}`}>
    <h4 className={`message`}>{text}</h4>
    {/* <span className={`message-action`}>{action}</span> */}
    </div>
  )
}

export default Message