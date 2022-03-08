package com.airov.near.manager;

import java.util.List;
import java.util.Map;

import com.airov.entity.Attachment;

public interface IAttachmentManager {
	public List<Attachment> getAttachments(int pageNum, int pagePerItems)throws Exception;
	public Attachment getAttachment(String id)throws Exception;
	public void deleteAttachment(Map<String, Object> requestBody)throws Exception;
	public Attachment setAttachment(Attachment attachment)throws Exception;
	public long getAttachmentsSize()throws Exception;
}
