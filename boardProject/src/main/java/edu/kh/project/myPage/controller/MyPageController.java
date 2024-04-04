package edu.kh.project.myPage.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.project.member.model.dto.Member;
import edu.kh.project.myPage.model.service.MyPageService;
import lombok.RequiredArgsConstructor;

@SessionAttributes({"loginMember"})
@Controller
@RequestMapping("myPage")
@RequiredArgsConstructor
public class MyPageController {

	private final MyPageService service;
	
	/** 내 정보 조회/수정 화면으로 전환
	 * 
	 *  @param loginMember 
	 * : 세션에 존재하는 loginMember를 얻어와 매개 변수에 대입
	 * 
	 * @param model : 데이터 전달용 객체(기본 request scope)
	 * 
	 * @return myPage/myPage-info.html
	 */
	@GetMapping("info")
	public String info(
			@SessionAttribute("loginMember") Member loginMember,
			Model model
			) {
		
		// 주소만 꺼내옴
		String memberAddress = loginMember.getMemberAddress();
		
		// 주소가 있을 경우에만 동작
		if(memberAddress != null) {
			
			// 구분자"^^^"를 기준으로
			// memberAddress 값을 쪼개어 String[]로 반환
			String[] arr = memberAddress.split("\\^\\^\\^");
			
			// "04540^^^서울시 중구 남대문로 120^^^2층 A강의장"
						// --> ["04540", "서울시 중구 남대문로 120", "2층 A강의장"]
			model.addAttribute("postcode"      , arr[0]);
			model.addAttribute("address"       , arr[1]);
			model.addAttribute("detailAddress" , arr[2]);
			
		}
		// /templates/myPage/myPage-info.html로 forward
		return "myPage/myPage-info";
	}
	
	/** 프로필
	 * @return
	 */
	@GetMapping("profile")
	public String profile() {
		return "myPage/myPage-profile";
	}
	
	/** 비밀번호 변경
	 * @return
	 */
	@GetMapping("changePw")
	public String changePw() {
		return "myPage/myPage-changePw";
	}
	
	/** 회원 탈퇴
	 * @return
	 */
	@GetMapping("secession")
	public String secession() {
		return "myPage/myPage-secession";
	}
	
	/** 회원정보 수정
	 * @param inputMember : 제출된 회원 닉네임, 전화번호, 주소
	 * 
	 * @param loginMember : 로그인한 회원 정보(회원 번호 사용할 예정)
	 * 
	 * @param memberAddress : 주소만 따로 받은 String[]
	 * 
	 * @param ra : 리다이렉트 시 request scope로 전달
	 * 
	 * @return
	 */
	@PostMapping("info")
	public String updateInfo(
			/* @ModelAttribute */ Member inputMember,
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam("memberAddress") String[] memberAddress,
			RedirectAttributes ra
			) {
		
		// inputMember에 로그인한 회원번호 추가
		int memberNo = loginMember.getMemberNo();
		inputMember.setMemberNo(memberNo);
		
		// 회원 정보 수정 서비스 호출
		int result = service.updateInfo(inputMember,memberAddress);
		
		String message = null;
		
		if(result>0) {
			message = "회원 정보 수정 성공!!";
			
			// loginMember는
			// 세션에 저장된 로그인된 회원정보가 저장된 객체를
			// 참조하고 있다!!
			// -> loginMember를 수정하면
			//    세션에 저장된 로그인된 회원 정보가 수정된다
			
			// == 세션 데이터가 수정됨
			
			loginMember.setMemberNickname(inputMember.getMemberNickname());
			loginMember.setMemberTel(inputMember.getMemberTel());
			loginMember.setMemberAddress(inputMember.getMemberAddress());
			
		}else {
			message = "회원 정보 수정 실패...";
			
			
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:info";
	}
	
	
	@PostMapping("changePw")
	public String changePw(
			@RequestParam("currentPw") String currentPw,
			@RequestParam("newPw") String newPw,
			@SessionAttribute("loginMember") Member loginMember,
			RedirectAttributes ra
			){
		
		int memberNo = loginMember.getMemberNo();
		
		// 서비스 호출
		int result = service.changePw(memberNo,currentPw,newPw);
		
		String message = null;
		
		if(result>0) { // 성공시
			// 리다이렉트
			message = "비밀번호 변경완료!!";
			ra.addFlashAttribute("message", message);

			return "redirect:/myPage/info";
			
			
		}else {
			message = "비밀번호가 일치하지 않습니다...";
			ra.addFlashAttribute("message", message);
			return "redirect:/myPage/changePw";
			
		}
		
		
		
		
	}
	
	// @SessionAttributes : 
	// - Model에 세팅된 값 중 key가 일치하는 값을
	//   request -> session으로 변경
	
	// SessionStatus : 
	// - @SessionAttributes를 이용해서 올라간 데이터의 상태를 관리하는 객체
	
	// -> 해당 컨트롤러에 @SessionAttributes({"key1","key2"}) 가 작성되어 있는
	//    () 내 key1, key2의 상태 관리
	
	
	/** 회원탈퇴
	 * @param loginMember : 로그인한 회원 정보(세션)
	 * @param memberPw : 입력받은 비밀번호
	 * @param ra
	 * @param status : 세션 완료(없애기) 용도의 객체
	 * 				-> @SessionAttributes 로 등록된 세션을 완료
	 * @return
	 */
	@PostMapping("secession")
	public String secession(
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam("memberPw") String memberPw,
			RedirectAttributes ra,
			SessionStatus status
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		// 서비스 호출
		int result = service.secession(memberNo, memberPw);
		
		String message = null;
		String path = null;
		
		if(result>0) {
			message = "탈퇴되었습니다.";
			status.setComplete();//세션을 완료 시킴 (없앰)
			path = "/";
			
		}else {
			message = "비밀번호가 일치하지 않습니다.";
			path = "/myPage/secession";
		}
		
		ra.addFlashAttribute("message", message);
		return "redirect:"+path;
		
				
	}
	/*
	 * [컨트롤러]
	 * - 파라미터 : 입력된 비밀번호
	 * - Session : 로그인한 회원 정보 -> 회원 번호만 얻어오기
	 * (누구 탈퇴인지 지정)
	 * 
	 * [서비스]
	 * - 현재 로그인한 회원의 암호화된 비밀번호를 DB에서 조회
	 *  -> 입력된 비밀번호와 비교해서 같을 때 탈퇴
	 *  
	 * [같을 때]
	 * MEMBER_DEL_FL 값을 'Y'로 변경하는 Mapper 호출
	 *  -> 수행 결과 반환
	 *  
	 * [다를 때]
	 * return 0 
	 * 
	 * [컨트롤러 돌아옴]
	 * * 탈퇴 성공 시
	 *  - message : "탈퇴되었습니다."
	 *  - 로그아웃 코드
	 *  - 메인페이지로 redirect
	 *   
	 * * 탈퇴 실패 시
	 * 	- message : "비밀번호가 일치하지 않습니다."
	 *  - 탈퇴 페이지로 리다이렉트
	 */
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	
	/* 파일 업로드 테스트 */
	
	@GetMapping("fileTest")
	public String fileTest() {
		return "myPage/myPage-fileTest";
	}
	
	/* Spring 에서 파일 업로드를 처리하는 방법
	 * 
	 * - enctype="multipart/form-data"로 클라이언트 요청을 받으면
	 *   (문자, 숫자, 차일 등이 섞여있는 요청)
	 *   
	 *   이를 MultipartResolver를 이용해서
	 *   섞여있는 파라미터 분리
	 *   문자열, 숫자 -> String
	 *   파일         -> MultipartFile
	 * 
	 * 
	 */
	
	/** 파일 업로드 테스트 1
	 * @param uploadFile : 업로드한 파일 + 설정 내용
	 * @return
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@PostMapping("file/test1")
	public String fileUpload(
			@RequestParam("uploadFile") MultipartFile uploadFile,
			RedirectAttributes ra
			) throws IllegalStateException, IOException {
		
		//
		String path = service.fileUpload1(uploadFile);
		
		// 파일이 저장되어 웹에서 접근할 수 있는 경로가 반환되었을때
		if(path!=null) {
			ra.addFlashAttribute("path",path);
		}
		
		return "redirect:/myPage/fileTest";
	}
	
	
	
} // 끝
