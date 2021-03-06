package com.spring.study.one;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/*
 * This whole class is just for initializing and loading
 * some sample data. In reality, data should come from 
 * a DB. 
 */
@Component
public class DatabaseLoader implements CommandLineRunner{

	private final EmployeeRepository repository;
	
	@Autowired
	public DatabaseLoader(EmployeeRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public void run(String... args) throws Exception {
		this.repository.save(new Employee("Jacky", "Guan", "Sample Employee"));		
	}

}
