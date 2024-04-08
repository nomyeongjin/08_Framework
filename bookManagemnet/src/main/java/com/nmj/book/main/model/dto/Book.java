package com.nmj.book.main.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Book {
	
	private int bookNo;
	private String bookTitle;
	private String bookWriter;
	private int bookPrice;
	private String regDate;

}
