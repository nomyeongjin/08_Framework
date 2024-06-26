package edu.kh.project.board.model.exception;


/** 게시글 이미지 삭제 중 문제 발생 시 사용할 사용자 저으이 예외
 * 
 */
public class ImageDeleteException extends RuntimeException{

	public ImageDeleteException() {
		super("게시글 이미지 삭제 중 예외 발생");
	}
	
	public ImageDeleteException(String message) {
		super(message);
	}

	
}
