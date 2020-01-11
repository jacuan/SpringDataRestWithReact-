import React, { Component } from 'react';
import EmployeeDataService from '../service/EmployeeDataService';

class EmployeeListComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            employees: [], 
            JSONSchema: [],
            message: null, 
            pageSize: null,
            links: null
        };
        this.refreshEmployeeList = this.refreshEmployeeList.bind(this);
        this.deleteEmployeeButtonClicked = this.deleteEmployeeButtonClicked.bind(this);
        this.updateEmployeeClicked = this.updateEmployeeClicked.bind(this);
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this);
    }

    componentDidMount() {
        this.refreshEmployeeList(this.state.pageSize);
    }
    
    render() {
        return (
            <div className="container">
                <h3>All Employees</h3>
                {this.state.message && 
                    <div className="alert alert-success">{this.state.message}</div>
                }
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    //Whenever you work with Spring Data REST, the 'self link' (see below) IS the key for a given resource. 
                                    //Also, React needs a unique identifer for child nodes, and _links.self.href is perfect. 
                                    //In Spring REST, ID is hidden by default (override it if necessary). 
                                        <tr key={employee._links.self.href}> 
                                            <td>
                                                <a href={`/employees/${employee.id}/detailMode`}>{employee.firstName}</a>
                                            </td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.description}</td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteEmployeeButtonClicked(employee._links.self.href, employee)}>
                                                    Delete
                                                </button>
                                            </td>
                                            <td><button className="btn btn-success" onClick={() => this.updateEmployeeClicked(employee.id)}>Update</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addEmployeeClicked}>Add</button>
                     </div>
                </div>
            </div>
        )
    }

    refreshEmployeeList(pageSize) {
        EmployeeDataService.getAllEmployees()
            .then(
                response => {
                    console.log(response.data._embedded.employees);
                    this.setState({
                        employees: response.data._embedded.employees,
                        pageSize: response.data.page.size,
                        links: response.data._links,
                    }, 
                    () => EmployeeDataService.getJSONSchemaDefinition(response.data._links.profile.href)
                    .then(
                        schema => {
                            this.setState({
                                JSONSchema: schema.data.properties
                            })
                        }
                    ));            
                }
            );
        

    }

    deleteEmployeeButtonClicked(employeeResource, employee) {
        EmployeeDataService.deleteEmployeeById(employeeResource)
            .then(
                response => {
                    this.setState({
                        message: `Employee [${employee.firstName} ${employee.lastName}] is deleted successful!`
                    });
                    this.refreshEmployeeList(this.state.pageSize);
                }
            ) 
    }

    updateEmployeeClicked(id) {
       this.props.history.push(`/employees/${id}`)    
    }

    addEmployeeClicked() {
       this.props.history.push(`/employees/-1`) 
    }
    
}

export default EmployeeListComponent

