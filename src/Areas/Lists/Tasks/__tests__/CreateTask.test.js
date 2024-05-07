import React from "react";
import CreateTaskView from '../View/CreateTaskView';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Create Task', () => {
    test('Render Create Task Component', () => {
        let props = {
            "taskDetails": [
                {
                    "index": 0.34044920454314087,
                    "name": "",
                    "taskDetails": "",
                    "status": "",
                    "dueDate": ""
                }
            ],
            "listTitle": "",
            "isFormValid": true,
            "invaidFormField": ""
        }

        const { getAllByRole } = render(<CreateTaskView {...props} />)
        
        const textboxs = getAllByRole('textbox')
        expect(textboxs).toHaveLength(3)

        const comboboxs = getAllByRole('combobox')
        expect(comboboxs).toHaveLength(1)

        const buttons = getAllByRole('button')
        expect(buttons).toHaveLength(2) // add and submit

    });

    test('Button Click on Create Task Component', () => {
        const add = jest.fn();
        const handleSubmit = jest.fn(e => e.preventDefault());
        let props = {
            "taskDetails": [
                {
                    "index": 0.9777250691653807,
                    "name": "w",
                    "taskDetails": "e",
                    "status": "Not Started",
                    "dueDate": ""
                }
            ],
            'add':add,
            'handleSubmit':handleSubmit
        }

        const { getByText } = render(<CreateTaskView {...props} />) 

        fireEvent.click(getByText('Add'))
        expect(props.add).toHaveBeenCalledTimes(1)

        fireEvent.click(getByText('Submit'))
        expect(props.handleSubmit).toHaveBeenCalledTimes(1)

    });
})