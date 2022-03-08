package com.airov.db;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.airov.entity.Reference;

@Mapper
public interface IResultMapper {

	public int updateTag(String name)throws Exception;
	public ArrayList<Reference> getReferences(Map <String, Object> paramMap)throws Exception;
	public long getReferenceSize(Map <String, Object> paramMap)throws Exception;
	public int subtractTagCount(String name)throws Exception;
	public void deleteZeroCountTag()throws Exception;
}
