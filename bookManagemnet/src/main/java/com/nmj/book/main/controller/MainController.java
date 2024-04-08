package com.nmj.book.main.controller;

import java.lang.reflect.Member;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nmj.book.main.model.dto.Book;
import com.nmj.book.main.model.service.MainService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MainController {

	public final MainService service;
	
	@RequestMapping("/")
	public String mainPage() {
		return "common/main";
	}
	
	@ResponseBody
	@GetMapping("selectAll")
	public List<Book> selectAll() {
		List<Book> bookList = service.selectAll();
		
		
		return bookList;
	}
	
	@GetMapping("insertBook")
	public String insertBook() {
		
		return "common/insertBook";
	}
	
	@PostMapping("add")
	public String addBook(
			@RequestParam("bookTitle") String bookTitle,
			@RequestParam("bookWriter") String bookWriter,
			@RequestParam("bookPrice") int bookPrice,
			RedirectAttributes ra
			) {
		int result = service.insertBook(bookTitle,bookWriter,bookPrice);
		
		String message = null;
		String path = null;
		
		if(result>0) {
			message = "책을 등록하였습니다.";
			ra.addFlashAttribute("message", message);
			return "redirect:/";
					
		}else {
			message = "책 등록을 실패하였습니다...";
			ra.addFlashAttribute(message);
			
			return "redirect:/insertBook";
		}
		
		
	}
	
	@GetMapping("updateBook")
	public String updateBook() {
		return "common/updateBook";
	}
	
	@ResponseBody
	@GetMapping("search")
	public List<Book> searchBook(
			 @RequestParam ("title") String searchBar
			) {
		
		List<Book> bookList = service.search(searchBar);
		return bookList;
	}
	
	
	
}
