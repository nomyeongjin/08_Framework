package com.nmj.book.main.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nmj.book.main.model.dto.Book;
import com.nmj.book.main.model.mapper.MainMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {
	
	private final MainMapper mapper;
	
	
	@Override
	public List<Book> selectAll() {
		return mapper.selectAll();
	}
	
	@Override
	public int insertBook(String bookTitle, String bookWriter, int bookPrice) {

		Map<String, Object> map = new HashMap<>();
		map.put("bookTitle", bookTitle);
		map.put("bookWriter", bookWriter);
		map.put("bookPrice", bookPrice);
		
		return mapper.insertBook(map);
	}
	
	@Override
	public List<Book> search(String searchBar) {
		return mapper.search(searchBar);
	}
	
	@Override
	public int updateBook(Map<String, Object> obj) {
		// TODO Auto-generated method stub
		return mapper.update(obj);
	}
	@Override
	public int deleteBook(int bookNo) {
		return mapper.delete(bookNo);
	}

}
