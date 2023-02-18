import { Link } from 'react-router-dom';

export const CreateTask: React.FC = () => {
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
                        <div className="task-card-img _2"></div>
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
                    </div>
                    <form className="task-card-right-col">
                        <label className="task-card-header">Task Description</label>
                        <textarea
                            className="task-card-textarea"
                            name="new-task-text"
                            placeholder="What do you want to get done"
                        ></textarea>
                        <button className="btn btn-dark btn-task-card">Create task</button>
                    </form>
                </div>
            </div>
        </section>
    );
};
