package edu.kh.project.main.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.kh.project.main.model.mapper.MainMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {
	
	private final MainMapper mapper;
	
	private final BCryptPasswordEncoder bcrypt; 

	@Override
	public int resetPw(int inputNo) {

		String pw = "pass01!";
		
		String encPw = bcrypt.encode(pw);
		
		Map<String, Object> map = new HashMap<>();
		map.put("encPw", encPw);
		map.put("inputNo", inputNo);
		
		
		return mapper.resetPw(map);
	}
	
	@Override
	public int delFl(int inputNo) {
		return mapper.delFl(inputNo);
	}
	
}
