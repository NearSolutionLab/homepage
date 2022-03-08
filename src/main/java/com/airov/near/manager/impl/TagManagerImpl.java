package com.airov.near.manager.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airov.db.IResultMapper;
import com.airov.db.ITagQueryManager;
import com.airov.entity.Tag;
import com.airov.near.manager.ITagManager;

@Service
public class TagManagerImpl implements ITagManager{

	@Autowired
	ITagQueryManager tagQueryManager;
	@Autowired
	IResultMapper resultMapper;
	
	public List<Tag> getTags()throws Exception{
		return tagQueryManager.getTags();
	}
	public void updateTag(String tag)throws Exception{
		resultMapper.updateTag(tag);
	}
	
	public void subtractTagCount(String name)throws Exception{
		resultMapper.subtractTagCount(name);
	}
	
	public void deleteZeroCountTag()throws Exception{
		resultMapper.deleteZeroCountTag();
	}
}
