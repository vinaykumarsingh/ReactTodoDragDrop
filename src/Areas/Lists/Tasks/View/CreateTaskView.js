import React from "react";

const CreateTaskView = props => {

    const itemToRender = props.taskDetails.map((val, idx) => {
        let name = `name-${idx}`,
            taskDetails = `taskDetails-${idx}`,
            dueDate = `dueDate-${idx}`,
            status = `status-${idx}`;

        return (
            <div className="form-row" key={val.index}>
                <div className="col">
                    <input
                        type="text"
                        className="form-control required"
                        placeholder="Task Title"
                        name="name"
                        data-id={idx}
                        id={name}
                    />
                </div>
                <div className="col-4">
                    <input
                        type="text"
                        className="form-control required"
                        placeholder="Task Details"
                        name="taskDetails"
                        id={taskDetails}
                        data-id={idx}
                    />
                </div>
                <div className="col">
                    <select className="form-control" name="status" id={status} data-id={idx}>
                        <option>Select</option>
                        <option>Not Started</option>
                    </select>
                </div>
                <div className="col">
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Enter Date"
                        name="dueDate"
                        id={dueDate}
                        data-id={idx}
                    />
                </div>
                <div className="col">
                    {idx === 0 ? (
                        <button onClick={() => props.add()} type="button" className="btn btn-primary text-center"> Add </button>
                    ) : (
                        <button className="btn btn-danger" onClick={() => props.delete(val)}> Remove </button>
                    )}
                </div>
            </div>
        )
    })

    const { listTitle, isFormValid, invaidFormField } = props

    return (
        <form onSubmit={props.handleSubmit} onChange={props.handleChange}>
            <div className="row" style={{ marginTop: 20 }}>
                <div className="col-sm-1" />
                <div className="col-sm-10">
                    <h2 className="text-center"> Create Your TODO</h2>
                    <div className="container toDoFormContainer">
                        <div className="row headerRow">
                            <div className="col">
                                <label>List Title</label>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-8">
                                <input
                                    type="text"
                                    className="form-control required"
                                    placeholder="List Title"
                                    name="listTitle"
                                    id={listTitle}
                                />
                            </div>
                        </div><br />
                        <div className="row headerRow">
                            <div className="col">
                                <label>Task Title</label>
                            </div>
                            <div className="col-4">
                                <label>Task Details</label>
                            </div>
                            <div className="col">
                                <label>Task Status</label>
                            </div>
                            <div className="col">
                                <label>Due Date</label>
                            </div>
                            <div className="col">
                                <label>Action</label>
                            </div>

                        </div>
                        {
                            itemToRender
                        }
                    </div><br />
                    {
                        !isFormValid && <div className="errorContainer">
                            {invaidFormField} is req field
                        </div>
                    }
                    <br />
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary text-center"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div className="col-sm-1" />
            </div>
        </form >
    );
};
export default CreateTaskView;
