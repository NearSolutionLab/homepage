package com.airov.near.manager.impl;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airov.constant.Constant;
import com.airov.db.IAttachmentQueryManager;
import com.airov.entity.Attachment;
import com.airov.near.manager.IAttachmentManager;
import com.airov.near.manager.IFileManager;


@Service
public class AttachmentManagerImpl implements IAttachmentManager{

	@Autowired
	IFileManager fileManager;
	@Autowired
	IAttachmentQueryManager attachmentQueryManager;
	
	@Override
	public List<Attachment> getAttachments(int pageNum, int pagePerItems)throws Exception{
		return attachmentQueryManager.getAttachments(pageNum, pagePerItems);
	}
	
	@Override
	public Attachment getAttachment(String id)throws Exception{
		return attachmentQueryManager.getAttachment(id);
	}
	
	@Override
	public void deleteAttachment(Map<String, Object> requestBody)throws Exception{
		boolean result = fileManager.deleteFile(Constant.FILE_DIVISION_FILES + File.separator + (String)requestBody.get("filePath"));
		if (result) {
			attachmentQueryManager.deleteById((String)requestBody.get("id"));
		}
	}
	
	@Override
	public Attachment setAttachment(Attachment attachment)throws Exception{
		return attachmentQueryManager.save(attachment);
	}
	
	@Override
	public long getAttachmentsSize()throws Exception{
		return attachmentQueryManager.count();
	}
}
