package edu.kh.project.board.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.project.board.model.dto.Board;
import edu.kh.project.board.model.dto.BoardImg;

@Mapper
public interface EditBoardMapper {

	/** 게시글 작성
	 * @param inputBoard
	 * @return
	 */
	int boardInsert(Board inputBoard);

	/** 게시글 이미지 모두 작성
	 * @param uploadList
	 * @return
	 */
	int insertUploadList(List<BoardImg> uploadList);

	/** 게시글 삭제
	 * @param map
	 * @return
	 */
	int boardDelFl(Map<String, Integer> map);

	/** 게시글 수정
	 * @param inputBoard
	 * @return
	 */
	int boardUpdate(Board inputBoard);

	/** 게시글 내의 이미지 삭제
	 * @param map
	 * @return
	 */
	int deleteImage(Map<String, Object> map);

	/** 게시글 이미지 수정
	 * @param img
	 * @return
	 */
	int updateImage(BoardImg img);

	/** 게시글 이미지 삽입
	 * @param img
	 * @return
	 */
	int insertImage(BoardImg img);

}
