import React, { Component } from 'react';
import EmployeeDataService from '../service/EmployeeDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SaveButton from './SaveButton';
import ReturnButton from './ReturnButton';

const EmployeeSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required"),
    lastName: Yup.string()
      .min(2, "Last Name must be 2 characters at minimum")
      .required("Last Name is required")
  });

class EmployeeDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: this.props.match.url,
            id: this.props.match.params.id,
            employee: [],
            detailMode: props.match.params.detailMode
        };
        this.getForm = this.getForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.getForm();
    }


    render() { 
      return (
        <div>
            <h1>Employee Details</h1> 
            <div className="container">
                <Formik
                initialValues={{ 
                    firstName: this.state.employee.firstName || '',  //This eliminates 'controlled vs uncontrolled' errors in console. 
                    lastName: this.state.employee.lastName || '',
                    description: this.state.employee.description || ''
                }}
                enableReinitialize={true}
                validationSchema={EmployeeSchema}
                onSubmit={(values) => {
                    this.handleSubmit(values, this.state.id);             
                }}    
                >
                    {({ errors, touched }) => (                 
                            <Form>
                                <fieldset className="form-group" disabled={this.state.detailMode === "detailMode" ? true : false} >
                                <fieldset className="form-group">
                                    <label>First Name</label>
                                    <Field type="text" name="firstName" 
                                    className={`form-control ${
                                        touched.firstName && errors.firstName ? "is-invalid" : ""}`}/> 
                                    <ErrorMessage
                                        component="div"
                                        name="firstName"
                                        className="invalid-feedback"
                                    />
                                </fieldset>
                                <fieldset className="form-group" >
                                    <label>Last Name</label>
                                    <Field type="text" name="lastName" 
                                    className={`form-control ${
                                        touched.lastName && errors.lastName ? "is-invalid" : ""}`}/> 
                                    <ErrorMessage
                                        component="div"
                                        name="lastName"
                                        className="invalid-feedback"
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"
                                    />
                                </fieldset>
                                </fieldset>
                                { this.state.detailMode === "detailMode" ? null : <SaveButton />}
                                { this.state.detailMode === "detailMode" ? <ReturnButton url={"http://localhost:3000/employees/"} /> : null } 
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
  }

  getForm() {
    //-1 means Add mode
    if (this.state.id == -1) {
        return;
    }
    EmployeeDataService.getEmployeeById(this.state.id)
    .then(response => this.setState({
        employee: response.data
    }))
  }
 
    handleSubmit(values, id) {
        let employee = {
            lastName: values.lastName,
            firstName: values.firstName,
            description: values.description
        }

        if (id == -1) {
         EmployeeDataService.addEmployeeByResource(employee)
                .then(() => this.props.history.push('/employees'))
        } else {
            EmployeeDataService.updateEmployeeByResource(id, employee)
               .then(() => this.props.history.push('/employees'))
        }
    }
}

export default EmployeeDetailComponent