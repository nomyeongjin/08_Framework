package com.nmj.book.main.model.service;

import java.util.List;
import java.util.Map;

import com.nmj.book.main.model.dto.Book;

public interface MainService {

	/** 전체 조회
	 * @return
	 */
	List<Book> selectAll();

	/** 책 추가
	 * @param bookTitle
	 * @param bookWriter
	 * @param bookPrice
	 * @return
	 */
	int insertBook(String bookTitle, String bookWriter, int bookPrice);

	/** 검색
	 * @param searchBar
	 * @return
	 */
	List<Book> search(String searchBar);

	/** 업데이트
	 * @param obj
	 * @return
	 */
	int updateBook(Map<String, Object> obj);

	/** 삭제
	 * @param bookNo
	 * @return
	 */
	int deleteBook(int bookNo);


}
