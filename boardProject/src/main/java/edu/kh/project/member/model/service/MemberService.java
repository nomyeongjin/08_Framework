package edu.kh.project.member.model.service;

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

}
