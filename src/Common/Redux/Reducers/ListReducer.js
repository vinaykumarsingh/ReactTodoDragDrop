import ListModel from '../../Constants/ListModel'

const initialState = {
    lists: [...ListModel]
}

const completeTask = (state, id) => {
    let stateCopy = Object.assign({}, state)
    stateCopy.lists.forEach(list => {
        console.log(list)
        list.taskDetails.forEach(task => {
            console.log(task)
            console.log(task.index)
            if (task.index === id) {
                task.status = 'Completed';
                task.backgroundColor = 'green'
            }

        })
    })
    return { ...state, stateCopy }

}
const dndList = (state, newObj) => {
    let stateCopy = Object.assign({}, state)
    stateCopy.lists.some(list => {
        console.log(list)
        if (list.id === newObj[0].id) {
            list.taskDetails = newObj[0]['taskDetails']
            list.isDND = true
            return true;
        }
    })
    return { ...state, stateCopy }

}
const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LISTS':
            let newLists = [action.payload, ...state.lists]
            return { ...state, lists: newLists }

        case 'COMPLETE_TASK':
            return completeTask(state, action.payload)

        case 'DND_LISTS':
            return dndList(state, action.payload)

        default:
            return state
    }
}

export default listReducer