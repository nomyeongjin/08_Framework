package com.kh.test.customer.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CustomerMapper {

	int add(Map<String, Object> map);

}
