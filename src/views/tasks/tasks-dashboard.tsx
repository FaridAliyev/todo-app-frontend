import { Link } from 'react-router-dom';
import trashIcon from 'assets/img/trash-bin.png';
import { axiosInstance } from 'api';
import { useAuth } from 'context/auth/store';
import { useQuery } from 'react-query';
import { Spinner } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import { TaskStatus } from 'enum';

export const TasksDashboard: React.FC = () => {
    const [{ email }] = useAuth();
    const { notify } = useNotifications();

    const fetchTodos = async () => {
        try {
            const response = await axiosInstance.get(`/task/getTasks/email/${email}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch data');
        }
    };

    const { data, isLoading, refetch } = useQuery('todos', fetchTodos);

    const archiveTask = (id: number) => {
        axiosInstance
            .put(`/task/archive/id/${id}`)
            .then(() => {
                notify({
                    type: 'success',
                    message: 'Task was archived',
                });
                refetch();
            })
            .catch((error) => {
                notify({
                    type: 'error',
                    message: error.response.data.message || 'Something went wrong',
                });
            });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <section className="tasks">
            <div className="container">
                <div className="tasks-caption">
                    <h2 className="tasks-caption-title">Dashboard</h2>
                    <div className="tasks-caption-actions">
                        <form className="tasks-filter" action="" id="sort-tasks">
                            <label htmlFor="task-type" className="tasks-filter-label">
                                Sort by
                            </label>
                            <select className="tasks-filter-list" name="task-type" id="">
                                <option className="tasks-filter-item" value="deleted">
                                    Deleted
                                </option>
                                <option className="tasks-filter-item" value="overdue">
                                    Overdue
                                </option>
                                <option className="tasks-filter-item" value="today">
                                    Today
                                </option>
                                <option className="tasks-filter-item" value="done">
                                    Done
                                </option>
                            </select>
                        </form>
                        <Link to="/tasks/create" className="btn btn-dark btn-add-task">
                            Add task
                        </Link>
                    </div>
                </div>

                <div className="tasks-list">
                    {data
                        .filter((todo) => todo.taskStatus !== TaskStatus.ARCHIVED)
                        .map((todo) => (
                            <div className="task" key={todo.id}>
                                <h4 className="task-title">{todo.taskName}</h4>
                                <p className="task-start-time">{todo.taskCreateDate}</p>
                                <p className="task-deadline">
                                    Deadline to: <span className="task-deadline-date">{todo.taskDeadlineDate}</span>
                                </p>
                                <p className="task-description">{todo.description}</p>
                                <div className="task-icons">
                                    <img
                                        className="task-icons-item"
                                        src={trashIcon}
                                        alt="trash icon"
                                        onClick={() => archiveTask(todo.id)}
                                    />
                                </div>
                                <a href="#" className="task-btn">
                                    Complete
                                </a>
                            </div>
                        ))}
                </div>

                <div className="task-card-section">
                    <h3 className="task-card-title">Task 002</h3>
                    <div className="task-card">
                        <div className="task-card-left-col">
                            <div className="task-card-img _1"></div>
                            <div className="task-card-form">
                                <div className="task-card-form-row">
                                    <label htmlFor="task-card-date" className="task-card-label">
                                        Deadline to:
                                    </label>
                                    <input name="task-card-date" type="date" className="task-card-input" />
                                </div>
                                <div className="task-card-form-row">
                                    <label htmlFor="name-task" className="task-card-label">
                                        Name Task
                                    </label>
                                    <input
                                        name="name-task"
                                        type="text"
                                        placeholder="Task 002"
                                        className="task-card-input"
                                    />
                                </div>
                            </div>
                            <div className="task-card-actions">
                                <a href="#" className="task-card-actions-item">
                                    <img src={trashIcon} alt="" className="task-card-actions-icon" />
                                    Delete
                                </a>
                            </div>
                        </div>
                        <div className="task-card-right-col">
                            <h4 className="task-card-header">Task Description</h4>
                            <p className="task-card-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                                aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </p>
                            <a href="#" className="btn btn-dark btn-task-card">
                                Save
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
