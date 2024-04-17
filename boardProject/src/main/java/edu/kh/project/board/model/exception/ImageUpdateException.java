package edu.kh.project.board.model.exception;


/** 게시글 이미지 수정 중 문제 발생 시 사용할 사용자 저으이 예외
 * 
 */
public class ImageUpdateException extends RuntimeException{

	public ImageUpdateException() {
		super("게시글 이미지 수정 중 예외 발생");
	}
	
	public ImageUpdateException(String message) {
		super(message);
	}

	
}
