import { axiosInstance } from 'api';
import { useAuth } from 'context/auth/store';
import { useNotifications } from 'context/NotificationsContext';
import { TaskSortType, TaskStatus } from 'enum';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NewTask {
    taskName: string;
    taskSortType: TaskSortType;
    taskStatus: TaskStatus;
    description: string;
    taskDeadlineDate: string;
}

export const CreateTask: React.FC = () => {
    const [{ email }] = useAuth();
    const { notify } = useNotifications();
    const navigate = useNavigate();

    const [newTask, setNewTask] = useState<NewTask>({
        taskName: '',
        taskSortType: TaskSortType.TODAY,
        taskStatus: TaskStatus.ACTIVE,
        description: '',
        taskDeadlineDate: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axiosInstance
            .post(`/task/addTask/email/${email}`, newTask)
            .then(() => {
                notify({
                    type: 'success',
                    message: 'Task successfully created',
                });
                navigate('/tasks/dashboard');
            })
            .catch((error) => {
                notify({
                    type: 'error',
                    message: error.response.data.message || 'Something went wrong',
                });
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTask({
            ...newTask,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <section className="add-task">
            <div className="container">
                <div className="tasks-caption">
                    <h2 className="tasks-caption-title">Add new Task</h2>
                    <div className="tasks-caption-actions">
                        <Link to="/tasks/create" className="btn btn-dark btn-add-task">
                            Add task
                        </Link>
                    </div>
                </div>

                <div className="task-card">
                    <div className="task-card-left-col">
                        <div className="task-card-img _1"></div>
                        <div className="task-card-form">
                            <div className="task-card-form-row">
                                <label htmlFor="task-card-date" className="task-card-label">
                                    Deadline to:
                                </label>
                                <input
                                    name="taskDeadlineDate"
                                    type="date"
                                    className="task-card-input"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="task-card-form-row">
                                <label htmlFor="name-task" className="task-card-label">
                                    Name Task
                                </label>
                                <input
                                    name="taskName"
                                    type="text"
                                    placeholder="Task name"
                                    className="task-card-input"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <form className="task-card-right-col" onSubmit={handleSubmit}>
                        <label className="task-card-header">Task Description</label>
                        <textarea
                            className="task-card-textarea"
                            name="description"
                            placeholder="What do you want to get done"
                            onChange={handleChange}
                        ></textarea>
                        <button className="btn btn-dark btn-task-card" type="submit">
                            Create task
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
