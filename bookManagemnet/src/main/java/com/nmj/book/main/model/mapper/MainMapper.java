package com.nmj.book.main.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nmj.book.main.model.dto.Book;

@Mapper
public interface MainMapper {

	public List<Book> selectAll();

	public int insertBook(Map<String, Object> map);

	public List<Book> search(String searchBar);

	public int update(Map<String, Object> obj);

	public int delete(int bookNo);

}
