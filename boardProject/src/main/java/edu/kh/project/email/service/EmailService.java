package edu.kh.project.email.service;

public interface EmailService {

	/** 이메일 보내기
	 * @param string
	 * @param email
	 * @return authKey
	 */
	String sendEmil(String string, String email);

}
