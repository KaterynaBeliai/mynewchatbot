 import './Chat.css'
 
 function Button({ placeholder, onClick, className }) {
        return <button className={className} onClick={onClick}>
          {placeholder}
        </button>;
      }

export default Button;