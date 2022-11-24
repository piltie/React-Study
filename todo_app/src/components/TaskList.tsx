import * as React from 'react';
import { ITask } from '../interfaces/Task';

interface Props {
    taskList: ITask[]
    // obs: lá embaixo no onclick tem que passar uma callback ao invés colocar a função direto, se não ela vai executar assim que ver o html
    handleDelete(id: number): void
    handleEdit(task: ITask): void
}

const TaskList = ({taskList, handleDelete, handleEdit}: Props) => {
  return (
    <>
        { taskList.length > 0 ? (
            
            taskList.map((task) => (
                <div key={task.id}>
                    <div>
                        <h4>{task.title}</h4>
                        <p>Dificuldade: {task.difficulty}</p>
                    </div>
                    <div>
                        <span onClick={() => {handleEdit(task)}}>editar</span> <br />
                        <span onClick={() => {handleDelete(task.id)}}>excluir</span>
                    </div>
                    <hr/>
                </div>
                
            ))
        ) : (
            <p>Não há tarefas cadastradas</p>
        ) }
    </>
  );
};

export default TaskList;
