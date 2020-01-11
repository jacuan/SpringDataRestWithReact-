package com.spring.study.one;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

//This enables the CRUD operation for REACT frontend.
@CrossOrigin(origins = {"http://localhost:3000"})
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long>{
}
