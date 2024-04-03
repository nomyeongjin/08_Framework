package edu.kh.project.myPage.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.project.member.model.dto.Member;
import edu.kh.project.myPage.model.mapper.MyPageMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

	private final MyPageMapper mapper;
	
	// BCrypt 암호화 객체 의존성 주입(SecurityConfig 참고)
		@Autowired
		private BCryptPasswordEncoder bcrypt;
	
	// @RequiredArgsConstructor 를 이용했을 때 자동 완성 되는 구문
//		@Autowired
//		public MyPageServiceImpl(MyPageMapper mapper) {
//			this.mapper = mapper;
//		}
	
	@Override
	public int updateInfo(Member inputMember, String[] memberAddress) {
		
		// 입력된 주소가 있을 경우 memberAddress를 A^^^B^^^C 형태로 가공
		
		// 입력 X -> inputMember.getMemberAddress() -> ",,"
		if(inputMember.getMemberAddress().equals(",,")) {
			inputMember.setMemberAddress(null);
		}else {
			// memberAddress를 A^^^B^^^C 형태로 가공
			
			String address = String.join("^^^", memberAddress);
			
			// 주소에 가공된 데이터 대입
			inputMember.setMemberAddress(address);
			
		}
		
		return mapper.updateInfo(inputMember);
	}
	
	@Override
	public int changePw(int memberNo, String currentPw, String newPw) {

		// DB에 저장된 암호화 비밀번호 조회
		String pw = mapper.selectPw(memberNo);
		
		
		// 비교
		if(!bcrypt.matches(currentPw, pw)){
			return 0;
		}
		
		// 새 비밀번호 암호화 진행
		String encPw = bcrypt.encode(newPw);
		
		Map<String, Object> map = new HashMap<>();
		map.put("memberNo", memberNo);
		map.put("encPw", encPw);
		
		int result = mapper.updatePw(map);
		
				
		
		return result;
	}
	
}
