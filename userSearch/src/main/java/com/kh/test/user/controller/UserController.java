package com.kh.test.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.kh.test.user.model.dto.User;
import com.kh.test.user.model.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class UserController {

	@Autowired
	private final UserService service;
	
	@GetMapping("searchSuccess")
	public String searchSuccess(
			Model model,
			@RequestParam("inputSearch") String inputSearch
			){
		
		List<User> searchList = service.search(inputSearch);
		
		int result = service.count(inputSearch);
		
		if(result!=0) {
			model.addAttribute("searchList",searchList);
			
			return "searchSuccess";
		
		}else{
		
			return "redirect:/searchFail";
			}
		}
	
	@GetMapping("searchFail")
	public String searchFail() {
		return "searchFail";
	}
	


}