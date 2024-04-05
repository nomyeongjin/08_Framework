package edu.kh.project.myPage.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.project.member.model.dto.Member;
import edu.kh.project.myPage.model.dto.UploadFile;

public interface MyPageService {

	/** 회원정보 수정
	 * @param inputMember
	 * @param memberAddress
	 * @return
	 */
	int updateInfo(Member inputMember, String[] memberAddress);

	/** 비밀번호 변경
	 * @param memberNo
	 * @param currentPw
	 * @param newPw
	 * @return
	 */
	int changePw(int memberNo, String currentPw, String newPw);

	/** 회원 탈퇴
	 * @param memberNo
	 * @param memberPw
	 * @return
	 */
	int secession(int memberNo, String memberPw);

	/** 파일 업로드 테스트 1
	 * @param uploadFile
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	String fileUpload1(MultipartFile uploadFile) throws IllegalStateException, IOException;

	/** 파일 업로드 테스트2(+DB)
	 * @param uploadFile
	 * @param memberNo
	 * @return
	 */
	int fileUpload2(MultipartFile uploadFile, int memberNo)  throws IllegalStateException, IOException;

	/** 파일 목록 조회
	 * @return
	 */
	List<UploadFile> fileList();

	/** 여러 파일 업로드
	 * @param aaaList
	 * @param bbbList
	 * @param memberNo
	 * @return
	 */
	int fileUpload3(List<MultipartFile> aaaList, List<MultipartFile> bbbList, int memberNo) throws IllegalStateException, IOException;

	/** 프로필 사진
	 * @param profileImg
	 * @param loginMember
	 * @return
	 */
	int profile(MultipartFile profileImg, Member loginMember) throws IllegalStateException, IOException;

	
	
}
