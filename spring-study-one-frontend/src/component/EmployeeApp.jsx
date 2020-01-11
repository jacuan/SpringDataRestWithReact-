import React, { Component } from 'react';
import EmployeeListComponent from './EmployeeListComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeeDetailComponent from './EmployeeDetailComponent';

class EmployeeApp extends Component {
    render() {//<> and </> is necessary here becuase we return two compements and they must have a same parent. 
        return (
            <Router>
                <>
                <h1>Employee Application</h1>
                <Switch>

                    <Route path="/" exact component={EmployeeListComponent} />

                    <Route path="/employees" exact component={EmployeeListComponent} />

                    <Route path="/employees/:id" exact component={EmployeeDetailComponent} />

                    <Route path="/employees/:id/:detailMode" exact component={EmployeeDetailComponent} />
                </Switch>
                </>
            </Router>          
        )
    }
}

export default EmployeeApp