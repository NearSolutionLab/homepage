package com.airov.near.manager;

import java.util.List;

import com.airov.entity.Tag;

public interface ITagManager {

	public List<Tag> getTags()throws Exception;
	public void updateTag(String tag)throws Exception;
	public void subtractTagCount(String name)throws Exception;
	public void deleteZeroCountTag()throws Exception;
}