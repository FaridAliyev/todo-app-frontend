import { Link } from 'react-router-dom';
import { axiosInstance } from 'api';
import { useAuth } from 'context/auth/store';
import { useQuery } from 'react-query';
import { Spinner } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import { TaskSortType, TaskStatus } from 'enum';
import ArchiveIcon from '@mui/icons-material/Archive';
import { Box, IconButton } from '@mui/material';
import TaskDetails from './task-details';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';

export const TasksDashboard: React.FC = () => {
    const [{ email }] = useAuth();
    const { notify } = useNotifications();
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [selectedSort, setSelectedSort] = useState<TaskSortType | string>('');

    const handleClick = (itemId: number) => {
        setSelectedItemId((prevItemId) => (prevItemId === itemId ? null : itemId));
    };

    const fetchTodos = async () => {
        try {
            const response = await axiosInstance.get(`/task/getTasks/email/${email}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch data');
        }
    };

    const { data, isLoading, refetch } = useQuery('todos', fetchTodos, {
        select: (data) => {
            if (selectedSort) {
                switch (selectedSort) {
                    case TaskSortType.DELETED:
                        return data.filter((item) => item.taskStatus === TaskStatus.ARCHIVED);
                    case TaskSortType.OVERDUE:
                        return data.filter((item) => new Date() > new Date(item.taskDeadlineDate));
                    case TaskSortType.TODAY:
                        return data.filter(
                            (item) =>
                                new Date().getFullYear() === new Date(item.taskCreateDate).getFullYear() &&
                                new Date().getMonth() === new Date(item.taskCreateDate).getMonth() &&
                                new Date().getDate() === new Date(item.taskCreateDate).getDate(),
                        );
                    case TaskSortType.DONE:
                        return data.filter((item) => item.taskSortType === TaskSortType.DONE);
                    default:
                        return data;
                }
            } else {
                return data;
            }
        },
    });

    const archiveTask = (id: number, e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();

        if (selectedItemId === id) {
            setSelectedItemId(null);
        }

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

    const completeTask = (todo, e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        const newTodo = { ...todo, taskSortType: TaskSortType.DONE };
        axiosInstance
            .put(`/task/id/${todo.id}`, newTodo)
            .then(() => {
                notify({
                    type: 'success',
                    message: 'Task was marked as done',
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

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value as TaskSortType;
        setSelectedSort(selected);
        setSelectedItemId(null);
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
                            <select
                                value={selectedSort}
                                onChange={handleSelectChange}
                                className="tasks-filter-list"
                                name="task-type"
                            >
                                <option value="">Choose...</option>
                                {Object.values(TaskSortType).map((sort) => (
                                    <option key={sort} value={sort} className="tasks-filter-item">
                                        {sort}
                                    </option>
                                ))}
                            </select>
                        </form>
                        <Link to="/tasks/create" className="btn btn-dark btn-add-task">
                            Add task
                        </Link>
                    </div>
                </div>
                {data.filter((todo) => todo.taskStatus !== TaskStatus.ARCHIVED).length ? (
                    <>
                        <div className="tasks-list">
                            {data
                                .filter((todo) => todo.taskStatus !== TaskStatus.ARCHIVED)
                                .map((todo) => (
                                    <div className="task" key={todo.id} onClick={() => handleClick(todo.id)}>
                                        <Box sx={{ position: 'relative' }}>
                                            <h4 className="task-title">{todo.taskName}</h4>
                                            {todo.taskSortType === TaskSortType.DONE && (
                                                <DoneIcon
                                                    color="success"
                                                    fontSize="large"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: 0,
                                                        transform: 'translateY(-50%)',
                                                    }}
                                                />
                                            )}
                                        </Box>

                                        <p className="task-start-time">{todo.taskCreateDate}</p>
                                        <p className="task-deadline">
                                            Deadline to:{' '}
                                            <span className="task-deadline-date">{todo.taskDeadlineDate}</span>
                                        </p>
                                        <p className="task-description">{todo.description}</p>
                                        <div className="task-icons">
                                            <IconButton onClick={(e) => archiveTask(todo.id, e)} title="Archive">
                                                <ArchiveIcon color="warning" />
                                            </IconButton>
                                        </div>
                                        <a onClick={(e) => completeTask(todo, e)} className="task-btn">
                                            Complete
                                        </a>
                                    </div>
                                ))}
                        </div>
                        {selectedItemId && <TaskDetails id={selectedItemId} />}
                    </>
                ) : (
                    <h1
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '50vh',
                            fontSize: '26px',
                        }}
                    >
                        No data found
                    </h1>
                )}
            </div>
        </section>
    );
};
