package com.airov.near.manager;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.airov.entity.Reference;

public interface IReferenceManager {
	public ArrayList<Reference> getReferences(int pageNum, int pagePerItems, String tags, String keyword)throws Exception;
	public Reference getReference(String id)throws Exception;
	public void deleteReference(String id)throws Exception;
	public Reference setReferences(Reference references)throws Exception;
	public long getReferencesSize()throws Exception;
	public long getReferencesSize(String tags, String keyword)throws Exception;
}
