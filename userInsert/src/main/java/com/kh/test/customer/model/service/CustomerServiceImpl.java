package com.kh.test.customer.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kh.test.customer.model.mapper.CustomerMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomerServiceImpl implements CustomerService {

	private final CustomerMapper mapper;
	
	@Override
	public int add(String inputName, String inputTel, String inputAddress) {

		Map<String, Object> map = new HashMap<>();
		
		map.put("inputName", inputName);
		map.put("inputTel", inputTel);
		map.put("inputAddress", inputAddress);
		
		return mapper.add(map);
	}
}
