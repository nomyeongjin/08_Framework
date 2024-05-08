package com.kh.test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kh.test.model.dto.Student;
import com.kh.test.model.service.StudentService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class StudentController {

	@Autowired
	private final StudentService service;
	
	@ResponseBody
	@GetMapping("select")
	public List<Student> selectList() {
		
		List<Student> studentList = service.selcet(); 
		
		return studentList;
		
	}
	
	
}
