import { createContext } from 'react';
import './App.css'
import Context from './components/Context';
import FirstComponent, { Category } from './components/FirstComponent'
import State from './components/State'

type textOrNull = string | null;

// contexto
interface IAppContext {
  language: string,
  framework: string,
  projects: number
}

export const AppContext = createContext<IAppContext | null>(null)

function App() {
// 1 - Variáveis  OBS: Geralmente é nessa área que se aplica a lógica
const name: string = "sarah"
const working = true

// 2 - Funções
const userGreeting = (name: string): string => {
  return `oi ${name}`
}


// type 
const myText:textOrNull = "Tem algum texto aqui"
const mySecondText:textOrNull = null;

// context
const contextValue: IAppContext = {
  language: "Javascript",
  framework: "Express",
  projects: 5
}

  return (
    <AppContext.Provider value={contextValue}>
    <div>
      nomeaaa: {name}
      {working && <p>is</p> }
      <h3>{userGreeting("sarah")}</h3>
      <FirstComponent name="pokerface" category={Category.TS} />
      <FirstComponent category={Category.JS} />
      <State />
      {myText}
      <Context />
    </div>
    </AppContext.Provider>
  )
}

export default App

/*  Context API: É uma forma de transmitir dados entre componentes no React;
A ideia principal é que podemos determinar quais componentes recebam estes dados; Ou seja, fazem parte do contexto. É bastante utilizado para autenticação do usuário.

*/