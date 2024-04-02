package edu.kh.project.member.model.service;

import java.util.List;

import edu.kh.project.member.model.dto.Member;

public interface MemberService {

	/** 로그인 서비스
	 * @param inputMember
	 * @return loginMamber
	 */
	Member login(Member inputMember);

	/** 회원가입
	 * @param inputMember
	 * @param memberAddress
	 * @return result
	 */
	int signup(Member inputMember, String[] memberAddress);

	/** 이메일 중복검사
	 * @param memberEmail
	 * @return count
	 */
	int checkEmail(String memberEmail);

	/** 닉네임 중복 검사
	 * @param memberNickname
	 * @return count
	 */
	int checkNickname(String memberNickname);

	/** 빠른 로그인
	 * @param memberEmail
	 * @return loginMember
	 */
	Member quickLogin(String memberEmail);

	/** 전체 조회
	 * @return member
	 */
	List<Member> selectList();

}
