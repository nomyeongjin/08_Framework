package edu.kh.project.myPage.model.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.project.member.model.dto.Member;

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

	String fileUpload1(MultipartFile uploadFile) throws IllegalStateException, IOException;

	
	
}
