package com.kh.test.user.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.test.user.model.dto.User;
import com.kh.test.user.model.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

	private final UserMapper mapper;
	
	@Override
	public List<User> search(String inputSearch) {
		
		return mapper.search(inputSearch);
	}
	
	@Override
	public int count(String inputSearch) {
		return mapper.count(inputSearch);
	}
	
}
