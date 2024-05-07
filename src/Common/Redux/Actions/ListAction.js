export const getListsAction = () => {
    return {
        type: 'GET_LISTS'
    }
}

export const setListsAction = (data) => {
    return {
        type: 'SET_LISTS',
        payload: data
    }
}

export const DNDListsAction = (data) => {
    return {
        type: 'DND_LISTS',
        payload: data
    }
}

export const completeTaskAction = (data) => {
    return {
        type: 'COMPLETE_TASK',
        payload: data
    }
}