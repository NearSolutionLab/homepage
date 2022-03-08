package com.airov.near.manager.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airov.db.IReferencesQueryManager;
import com.airov.db.IResultMapper;
import com.airov.entity.Reference;
import com.airov.near.manager.IFileManager;
import com.airov.near.manager.IReferenceManager;
import com.airov.util.ValueUtil;

@Service
public class ReferenceManagerImpl  implements IReferenceManager{
	
	@Autowired
	IReferencesQueryManager referencesQueryManager;
	@Autowired
	IFileManager fileManager;
	@Autowired
	IResultMapper resultMapper;

	@Override
	public ArrayList<Reference> getReferences(int pageNum, int pagePerItems, String tags, String keyword)throws Exception{
		Map<String, Object> paraMap = new HashMap<String, Object>();
		
		
		if (ValueUtil.isEmpty(tags)) {
			paraMap.put("tags", tags);
		}
		else {
			paraMap.put("tags", tags.split(","));
		}
		
		paraMap.put("start", pageNum);
  		paraMap.put("end", pagePerItems);
  		paraMap.put("keyword", keyword);
  		
		 
		return resultMapper.getReferences(paraMap);
	}
	
	
	@Override
	public Reference setReferences(Reference reference)throws Exception{
		return referencesQueryManager.save(reference);
	}
	
	@Override
	public long getReferencesSize()throws Exception{
		return referencesQueryManager.count();
	}
	
	@Override
	public long getReferencesSize(String tags, String keyword)throws Exception{
		Map<String, Object> paraMap = new HashMap<String, Object>();
		
		paraMap.put("keyword", keyword);
		
		if (ValueUtil.isEmpty(tags)) {
			paraMap.put("tags", tags);
		}
		else {
			paraMap.put("tags", tags.split(","));
		}
		
		return resultMapper.getReferenceSize(paraMap);
	}
	
	
	@Override
	public Reference getReference(String id)throws Exception{
		return referencesQueryManager.getReference(id);
	}
	
	@Override
	public void deleteReference(String id)throws Exception{
		referencesQueryManager.deleteById(id);
	}
}
