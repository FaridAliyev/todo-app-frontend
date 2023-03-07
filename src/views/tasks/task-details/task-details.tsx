import { useEffect, useState } from 'react';
import { axiosInstance } from 'api';
import { useNotifications } from 'context/NotificationsContext';

interface Task {
    taskName: string;
    description: string;
    taskDeadlineDate: string;
}

export const TaskDetails: React.FC<{ id: number; setSelectedItemId; refetch }> = ({
    id,
    setSelectedItemId,
    refetch,
}) => {
    const { notify } = useNotifications();
    const [todo, setTodo] = useState<any>(null);
    const [task, setTask] = useState<Task>({
        taskName: '',
        description: '',
        taskDeadlineDate: '',
    });

    useEffect(() => {
        axiosInstance
            .get(`/task/getTaskById/id/${id}`)
            .then((response) => {
                const data = response.data;
                setTodo(data);
                setTask({
                    ...task,
                    taskName: data.taskName,
                    description: data.description,
                    taskDeadlineDate: data.taskDeadlineDate,
                });
            })
            .catch((error) => {
                console.error(error);
            });
        return () => {
            setTask({
                taskName: '',
                description: '',
                taskDeadlineDate: '',
            });
            setTodo(null);
        };
    }, [id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask({
            ...task,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        const newTask = { ...todo, ...task };
        axiosInstance
            .put(`/task/id/${id}`, newTask)
            .then(() => {
                notify({
                    type: 'success',
                    message: 'Task was updated',
                });
                setSelectedItemId(null);
                refetch();
            })
            .catch((error) => {
                notify({
                    type: 'error',
                    message: error.response.data.message || 'Something went wrong',
                });
            });
    };

    return (
        <div className="task-card-section">
            <h3 className="task-card-title">{todo?.taskName}</h3>
            <div className="task-card">
                <div className="task-card-left-col">
                    <div className="task-card-img _1"></div>
                    <div className="task-card-form">
                        <div className="task-card-form-row">
                            <label htmlFor="task-card-date" className="task-card-label">
                                Deadline to:
                            </label>
                            <input
                                value={task.taskDeadlineDate}
                                onChange={handleChange}
                                name="taskDeadlineDate"
                                type="date"
                                className="task-card-input"
                            />
                        </div>
                        <div className="task-card-form-row">
                            <label htmlFor="name-task" className="task-card-label">
                                Name Task
                            </label>
                            <input
                                value={task.taskName}
                                onChange={handleChange}
                                name="taskName"
                                type="text"
                                placeholder="Task name"
                                className="task-card-input"
                            />
                        </div>
                    </div>
                </div>
                <div className="task-card-right-col">
                    <h4 className="task-card-header">Task Description</h4>
                    <textarea
                        className="task-card-textarea"
                        name="description"
                        placeholder="What do you want to get done"
                        value={task.description}
                        onChange={handleChange}
                    ></textarea>
                    <a onClick={handleSubmit} className="btn btn-dark btn-task-card">
                        Save
                    </a>
                </div>
            </div>
        </div>
    );
};
