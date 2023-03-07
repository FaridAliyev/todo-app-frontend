import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const TaskDetails: React.FC<{ id: number }> = ({ id }) => {
    console.log(id);

    return (
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
                            <input name="name-task" type="text" placeholder="Task 002" className="task-card-input" />
                        </div>
                    </div>
                    <div className="task-card-actions">
                        <a href="#" className="task-card-actions-item">
                            <IconButton title="Delete">
                                <DeleteIcon color="error" />
                            </IconButton>
                            Delete
                        </a>
                    </div>
                </div>
                <div className="task-card-right-col">
                    <h4 className="task-card-header">Task Description</h4>
                    <p className="task-card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                        qui officia deserunt mollit anim id est laborum.
                    </p>
                    <a href="#" className="btn btn-dark btn-task-card">
                        Save
                    </a>
                </div>
            </div>
        </div>
    );
};
