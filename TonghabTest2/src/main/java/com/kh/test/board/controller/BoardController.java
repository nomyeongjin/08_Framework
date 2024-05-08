package com.kh.test.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.kh.test.board.model.dto.Board;
import com.kh.test.board.model.service.BoardService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BoardController {
	
	@Autowired
	private final BoardService service;

	@GetMapping("boardSearch")
	public String boardSearch(
			Model model,
			@RequestParam("inputSearch") String inputSearch
			) {
		
		List<Board> searchList = service.search(inputSearch);
		
		if(!searchList.isEmpty()) {
			model.addAttribute("searchList",searchList);
			
			return "searchSuccess";
		
		}else{
		
			return "searchFail";
			}
		}
	}

