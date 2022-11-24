// 3 - componente
import { useState, ChangeEvent } from 'react';

const State = () => {
  const [text, setText] = useState<string | null>(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  return (
    <div>
      <h1>o texto é: {text}</h1>
      <input onChange={handleChange}></input>
    </div>
  );
}

export default State;