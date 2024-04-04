package edu.kh.project.myPage.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
	
	@Override
	public int secession(int memberNo, String memberPw) {
		
		// DB에 저장된 암호화 비밀번호 조회
		String pw = mapper.selectPw(memberNo);
		
		// 비교
		if(!bcrypt.matches(memberPw, pw)){
			return 0;
		}
		
		int result = mapper.delMember(memberNo);
		
		return result;
	}
	
	@Override
	public String fileUpload1(MultipartFile uploadFile) throws IllegalStateException, IOException {

		// MultipartFile이 제공하는 메서드
		// - getFile() : 파일 크기
		// - isEmpty : 업로드한 파일이 없을 경우 true
		// - getOriginalFileName() : 원본 파일 명
		// - transferTo(경로) : 
		//		메모리 또는 임시 저장 경로에 업로드된 파일을 
		// 		원하는 경로에 전송(서버 어떤 폴더에 저장)
		
		if(uploadFile.isEmpty()) {//업로드한 파일이 없을 경우
			return null;
		}

		
		// 업로드한 파일이 있을 경우
		// c:\\uploadFiles\\test\\파일명 으로 서버에 저장
		uploadFile.transferTo(new File("c:\\uploadFiles\\test\\"+uploadFile.getOriginalFilename()));
		
		// 웹에서 해당 파일에 접근할 수 있는 경로를 반환
		
		// 서버 : c:\\uploadFiles\\test\\a.jpg
		// 웹 접근 주소 : /myPage/file/a.jpg
		return "/myPage/file/"+uploadFile.getOriginalFilename();
	}
	
}
