import { Link } from 'react-router-dom';
import { axiosInstance } from 'api';
import { useAuth } from 'context/auth/store';
import { useQuery } from 'react-query';
import { Spinner } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import TaskDetails from '../task-details';

export const ArchivedTasks: React.FC = () => {
    const [{ email }] = useAuth();
    const { notify, confirm } = useNotifications();

    const fetchArchivedTodos = async () => {
        try {
            const response = await axiosInstance.get(`/task/getArchivedTasks/email/${email}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch data');
        }
    };

    const { data, isLoading, refetch } = useQuery('archivedTodos', fetchArchivedTodos);

    const deleteTask = (id: number) => {
        confirm({
            onConfirm: () => {
                axiosInstance
                    .delete(`/task/delete/id/${id}`)
                    .then(() => {
                        notify({
                            type: 'success',
                            message: 'Task was deleted',
                        });
                        refetch();
                    })
                    .catch((error) => {
                        notify({
                            type: 'error',
                            message: error.response.data.message || 'Something went wrong',
                        });
                    });
            },
            description: 'This action cannot be undone',
            confirmText: 'Are you sure you want delete this task?',
        });
    };

    const unarchiveTask = (id: number) => {
        axiosInstance
            .put(`/task/unarchive/id/${id}`)
            .then(() => {
                notify({
                    type: 'success',
                    message: 'Task was unarchived',
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
                    <h2 className="tasks-caption-title">Archive</h2>
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
                    {data.map((todo) => (
                        <div className="task" key={todo.id}>
                            <h4 className="task-title">{todo.taskName}</h4>
                            <p className="task-start-time">{todo.taskCreateDate}</p>
                            <p className="task-deadline">
                                Deadline to: <span className="task-deadline-date">{todo.taskDeadlineDate}</span>
                            </p>
                            <p className="task-description">{todo.description}</p>
                            <div className="task-icons">
                                <IconButton onClick={() => unarchiveTask(todo.id)} title="Unarchive">
                                    <UnarchiveIcon color="success" />
                                </IconButton>
                                <IconButton onClick={() => deleteTask(todo.id)} title="Delete">
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </div>
                            <a href="#" className="task-btn">
                                Complete
                            </a>
                        </div>
                    ))}
                </div>

                {/* <TaskDetails /> */}
            </div>
        </section>
    );
};
