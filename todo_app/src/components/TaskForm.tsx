// Interface
import { ITask } from '../interfaces/Task'

import { useState, ChangeEvent, FormEvent, useEffect } from 'react'



interface Props {
    btnText: string
    taskList: ITask[]
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>> // Tá alterando o state de uma lista
    task?: ITask | null
    handleUpdate?(id: number, title: string, difficulty:number): void
}

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {
    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [difficulty, setDifficulty] = useState<number>(0);

    useEffect(() => {
       if(task) {
        setId(task.id)
        setTitle(task.title)
        setDifficulty(task.difficulty)
       }
    }, [task]) // quando houver uma alteração no task, ele vai ser atualizado e vai rodar novamente

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // faz não recarregar a tela ao enviar o fomulário

        if(handleUpdate) {
    
            handleUpdate(id, title, difficulty)
        } else {
            const id = Math.floor(Math.random() * 1000)
    
            const newTask: ITask = { id, title, difficulty }
    
            setTaskList!([...taskList, newTask]) // exclamação pra forçar pra dizer que ele sim vai vir, se não dá erro
    
            setTitle("")
            setDifficulty(0);
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        } else {
            setDifficulty(parseInt(e.target.value))
        }
    }

  return <form onSubmit={addTaskHandler}>
    <div>
        <label htmlFor="title">Título:</label>
        <input type="text" name="title" placeholder="Título da tarefa" onChange={handleChange} value={title} />
    </div>
    <div>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input type="text" name="difficulty" placeholder="Dificuldade da tarefa" onChange={handleChange} value={difficulty} />
    <input type="submit" value={btnText} />
    </div>
  </form>;
};

export default TaskForm;
