import React from 'react';
import HomeView from "../View/HomeView";
import * as reactRedux from 'react-redux';
import HomeController from "../Controller/HomeController";
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));


describe('HomeView', () => {
    test('render home view component', () => {
        const lists = [
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
                    },
                    {
                        "dueDate": "2021-10-20",
                        "index": 0.4653066358719222,
                        "name": "Attend annual apprisal meeting",
                        "status": "Not Started",
                        "taskDetails": "Attend annual apprisal meeting and send the updated report",
                        "backgroundColor": ""
                    },
                    {
                        "dueDate": "2023-01-06",
                        "index": 0.4653066358719333,
                        "name": "Meeting with team leads",
                        "status": "Not Started",
                        "taskDetails": "Meeting with team leadsand get the lists of star performers",
                        "backgroundColor": ""
                    }
                ]
            },
            {
                "id": 2,
                "listTitle": "New Joiners Onboarding",
                "taskDetails": [
                    {
                        "dueDate": "2022-06-04",
                        "index": 0.4653066358719333,
                        "name": "Update the Excel",
                        "status": "Not Started",
                        "taskDetails": "Update the Excel with new dates",
                        "backgroundColor": ""
                    },
                    {
                        "dueDate": "2022-06-30",
                        "index": 0.46530663587194443,
                        "name": "Welcome New joiners",
                        "status": "Not Started",
                        "taskDetails": "Welcome meeting new joiners with other details",
                        "backgroundColor": ""
                    }
                ]
            }
        ]

        const { getAllByRole } = render(<HomeView lists={lists} />)

        const listPara = getAllByRole('list');
        expect(listPara).toHaveLength(2)

        const listItems = getAllByRole('listitem')
        expect(listItems).toHaveLength(5)

        expect(screen.getByText('Team 1')).toBeInTheDocument();
        expect(screen.getByText('New Joiners Onboarding')).toBeInTheDocument();

    });

    test('render home view component with empty lists', () => {
        const lists = []
        const { getByText } = render(<HomeView lists={lists} />)
        expect(getByText('Nothing is here yet, Please Create your ToDo lists')).toBeInTheDocument();

    });


});

describe('HomeController', () => {
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

    test('HomeController Works!', () => {
        const { getAllByRole } = render(<HomeController />)
        const listItems = getAllByRole('listitem')
        expect(listItems).toHaveLength(1)
    });

})