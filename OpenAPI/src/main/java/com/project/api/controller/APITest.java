package com.project.api.controller;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class APITest {

	
	// API 개인 인증키

	private final String serviceKey = "JzkABn6Wgy8ni//5iOg0eyjAcHsmqGe+tPRSk+OOBrcjMw6qPRWCGKrkeg7RxPdDht4HwRTU0hNNOpA8smp30Q==";

	/** 에어코리아 대기오염정보 - 시도별 실시간 측정정보 조회

	* @param location : 지역명(시, 도 이름)

	* @throws IOException

	*/

	@GetMapping("air")
	public String airPollution(
			@RequestParam(value="location", required = false, defaultValue = "서울") String location
			) throws IOException{
		
		
		String requestUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";// 수정
	
		StringBuilder urlBuilder = new StringBuilder(requestUrl);
	
		urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "="+ serviceKey); /*Service Key*/
		urlBuilder.append("&" + URLEncoder.encode("sidoName","UTF-8") + "=" + URLEncoder.encode(location, "UTF-8"));
		urlBuilder.append("&" + URLEncoder.encode("returnType","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
		
		
		// 공공데이터 요청 및 응답
		URL url = new URL(urlBuilder.toString());
	
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/json");
	
		// 응답 상태 코드(200: 성공, 404 : 페이지 찾을 수 없음)
        System.out.println("Response code: " + conn.getResponseCode());
		
		BufferedReader rd;
		
		// 응답 상태 코드가 200~300인 경우(요청/응답 성공)
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
        	
        	// InputStreamReader : 바이트 기반 입력 스트림을 문자 기반으로 변경
        	
        	// 문자 형태로 빨리 입력 받기 위한 준비(응답 데이터 빨리 받기)
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
		
		// 응답 상태 코드가 200~300인 경우(요청/응답 성공)
		if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
	
			rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	
		} else {
	
			rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
	
		}
	
		StringBuilder sb = new StringBuilder();
		String line;
	
		while ((line = rd.readLine()) != null) {
	
			sb.append(line);
	
		}
	
		rd.close();
		conn.disconnect();
	
		log.info(sb.toString());
	
		return "air";

	}
	
	@GetMapping("air2")
	public String ex1() {
		return "air2";
	}
	
	
}
