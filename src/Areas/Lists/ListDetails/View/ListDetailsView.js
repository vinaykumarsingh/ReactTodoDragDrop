import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const ListDetailsView = ({ list, completeTask, handleDND, redirectHome }) => {
    const itemToRender =
        <div className="listDetailContainer">
            <div className="listTitleContainer">
                <h2>{list.listTitle}</h2>

                <div className="colorIndicator">
                    <div className="colorBoxContainer"><div className="colorBox expired"></div> <span>Expired</span></div>
                    <div className="colorBoxContainer"><div className="colorBox expireToday"></div> <span>Expiring Today</span></div>
                    <div className="colorBoxContainer"><div className="colorBox completed"></div> <span>Completed</span></div>
                </div>
            </div>


            <ul className="listDetailsHeader">
                <li>Task Name</li>
                <li>Task Details</li>

                <li>Due Date</li>
                <li>Status</li>
                <li>Action</li>

            </ul>
            {<DragDropContext onDragEnd={handleDND}>
                <Droppable droppableId="to-dos">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef} className="taskContainer">
                            {
                                list.taskDetails.map((task, id) => {
                                    return (
                                        <Draggable
                                            key={task.index}
                                            draggableId={task.index.toString()}
                                            index={id}
                                        >
                                            {(provided, snapshot) => (
                                                <li
                                                    id={task.index}
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    key={task.index}
                                                    data-testid="taskDetailRow"
                                                    className={
                                                        `${snapshot.isDragging ? "selected" : task.bgColor} `
                                                    }

                                                >
                                                    <span>{task.name}</span>
                                                    <span>{task.taskDetails}</span>

                                                    <span>{task.dueDate}</span>

                                                    <span>{task.status}</span>
                                                    <button
                                                        className="btn btn-primary"
                                                        disabled={task.status === "Completed"}
                                                        onClick={() => completeTask(task.index)}
                                                    >
                                                        Complete
                                                    </button>

                                                </li>
                                            )}
                                        </Draggable>
                                    )
                                })}
                            {provided.placeholder}

                        </ul>
                    )}

                </Droppable>
            </DragDropContext>
            }
        </div>

    return (
        <React.Fragment>
            {itemToRender}
            <button className="btn btn-primary" onClick={() => redirectHome()}>
                Home
            </button>
        </React.Fragment>
    )
}

export default ListDetailsView