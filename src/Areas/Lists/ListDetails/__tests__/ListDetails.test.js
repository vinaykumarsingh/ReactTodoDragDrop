import React from 'react';
import ListDetailsView from "../View/ListDetailsView";
import * as reactRedux from 'react-redux';
import ListDetailsController from "../Controller/ListDetailsController";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));


describe("ListDetailsController Works !", () => {
    const mockStore = {
        "listReducer": {
            "lists": [
                {
                    "id": 1,
                    "listTitle": "Team 1",
                    "taskDetails": [
                        {
                            "dueDate": "2022-07-03",
                            "index": 0.4653066358719111,
                            "name": "Check Timesheet",
                            "status": "Completed",
                            "taskDetails": "Check Timesheet and send the report",
                            "backgroundColor": ""
                        }
                    ]
                }
            ]
        }
    }
    beforeEach(() => {
        useDispatchMock.mockImplementation(() => () => { });
        useSelectorMock.mockImplementation(selector => selector(mockStore));
    })
    afterEach(() => {
        useDispatchMock.mockClear();
        useSelectorMock.mockClear();
    })

    const useSelectorMock = reactRedux.useSelector;
    const useDispatchMock = reactRedux.useDispatch;


    test("Render ListDetail component on passing Lists prps", () => {

        Object.defineProperty(window, "location", {
            value: {
                pathname: '/1'
            },
            writable: true
        });

        const { getAllByRole, getByText, queryAllByTestId, getByTestId } = render(<ListDetailsController />)

        expect(getByText('Team 1')).toBeInTheDocument();
        expect(getAllByRole('list')).toHaveLength(2)
        expect(queryAllByTestId("taskDetailRow")).toHaveLength(1);
        expect(getByTestId('taskDetailRow').firstChild.textContent).toBe('Check Timesheet')
    })

    test("ListDetail component complete button click", async () => {

        Object.defineProperty(window, "location", {
            value: {
                pathname: '/1'
            },
            writable: true
        });

        const { getByTestId } = render(<ListDetailsController />)
        expect(getByTestId('taskDetailRow').lastChild.textContent).toBe('Complete');
    })
});



describe("ListDetailsView works", () => {
    test('Render ListDetail View component', () => {
        const list = {
            "id": 1,
            "listTitle": "Team 1",
            "taskDetails": [
                {
                    "dueDate": "2021-10-20",
                    "index": 0.4653066358719222,
                    "name": "Attend annual apprisal meeting",
                    "status": "Completed",
                    "taskDetails": "Attend annual apprisal meeting and send the updated report",
                    "backgroundColor": "green",
                    "bgColor": "green"
                }
            ],
            "isDND": true
        }

        const { getAllByRole, getByText } = render(<ListDetailsView list={list} />)
        expect(getByText('Team 1')).toBeInTheDocument();
        expect(getByText('Expired')).toBeInTheDocument();
        expect(getByText('Expiring Today')).toBeInTheDocument();
        expect(getAllByRole('list')).toHaveLength(2)
        expect(getAllByRole('listitem')).toHaveLength(5)
        expect(getByText('Home')).toBeInTheDocument();
    })

    test('Home Button click on the component', async () => {
        const list = {
            "id": 1,
            "listTitle": "Team 1",
            "taskDetails": [
                {
                    "dueDate": "2021-10-20",
                    "index": 0.4653066358719222,
                    "name": "Attend annual apprisal meeting",
                    "status": "Completed",
                    "taskDetails": "Attend annual apprisal meeting and send the updated report",
                    "backgroundColor": "green",
                    "bgColor": "green"
                }
            ],
            "isDND": true
        }
        const redirectHome = jest.fn();
        const { getAllByRole, getByText } = render(<ListDetailsView list={list} redirectHome={redirectHome} />)
        expect(getByText('Home')).toBeInTheDocument();
        fireEvent.click(getByText('Home'))
        await waitFor(() => {
            expect(redirectHome).toBeCalledTimes(1);
        });
    })

    test('Complete Button click on the Component', async () => {
        const list = {
            "id": 0.3783657097783595,
            "taskDetails": [
                {
                    "index": 0.8849852316391573,
                    "name": "Task title 31",
                    "taskDetails": "Task 1 Details",
                    "status": "Not Started",
                    "dueDate": "2022-06-30",
                    "bgColor": ""
                }
            ],
            "listTitle": "tesk titletesk titletesk titletesk titletesk titletesk titletesk titletesk titletesk title",
            "redirect": true,
            "isFormValid": true,
            "invaidFormField": ""
        }
        const completeTask = jest.fn();
        const { getAllByRole, getByText } = render(<ListDetailsView list={list} completeTask={completeTask} />)
        expect(getByText('Complete')).toBeInTheDocument();
        fireEvent.click(getByText('Complete'))
        await waitFor(() => {
            expect(completeTask).toBeCalledTimes(1);
        });
    })

})