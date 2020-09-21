import React, {useState} from 'react';
import axios from 'axios';

import addSvg from "../../assets/img/add.svg";

const AddTaskForm = ({list, onAddTask}) => {
    const [isVisible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] =useState(false);

    const toggleFormVisible = () => {
        setVisible(!isVisible);
        setInputValue('');
    }

    const addTask = () => {
        const newTask = {
            'listId': list.id,
            'text': inputValue,
            'completed': false
        };
        setIsLoading(true);
        axios.post(`http://localhost:3001/tasks`, newTask)
            .then(({data}) => {
                onAddTask(list.id, data);
                toggleFormVisible();
            })
            .finally(() =>  setIsLoading(false));
    }

    return (
        <div className="tasks__form">
            {!isVisible ?
                <div className="tasks__form-new" onClick={toggleFormVisible}>
                    <img src={addSvg} alt={'Add icon'}/>
                    <span>Новая задача</span>
                </div>
                :
                <div className="tasks__form-block">
                    <input
                        className={'field'}
                        type={'text'}
                        placeholder={'Текст задачи'}
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button className="button" onClick={addTask} disabled={isLoading}>
                        {!isLoading ? 'Добавить задачу' : 'Добавление...'}
                    </button>
                    <button className="button button--grey" onClick={toggleFormVisible}>
                        Отмена
                    </button>
                </div>}
        </div>
    );
}

export default AddTaskForm;