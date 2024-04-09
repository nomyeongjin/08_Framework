package com.kh.test.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.kh.test.customer.model.service.CustomerService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class CustomerController {

	@Autowired
	private final CustomerService service;
	
	@GetMapping("add")
	public String add(
			@RequestParam("inputName") String inputName,
			@RequestParam("inputTel") String inputTel,
			@RequestParam("inputAddress") String inputAddress,
			Model model
			) {
		
		int result = service.add(inputName,inputTel,inputAddress);
		
		model.addAttribute("inputName",inputName);
		
		return "result";
	}
	
}
