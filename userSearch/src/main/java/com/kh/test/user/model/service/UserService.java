package com.kh.test.user.model.service;

import java.util.List;

import com.kh.test.user.model.dto.User;

public interface UserService {

	List<User> search(String inputSearch);

	int count(String inputSearch);

}
