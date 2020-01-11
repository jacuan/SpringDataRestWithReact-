package com.spring.study.one;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;

//This is primarily used for getting access to http://localhost:8080/api/profile/employees
//because it is not part of CRUD operation (in EmployeeRepository.java). This path gets the JSON schema. 
@Component
public class SpringDataRestCustomisation implements RepositoryRestConfigurer {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.getCorsRegistry().addMapping("/api/**")
		.allowedOrigins("http://localhost:3000");
		//Let Employee ID visible on frontend
		config.exposeIdsFor(Employee.class);
	}
}
