package com.airov.near.controller;

import java.io.File;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.airov.constant.Constant;
import com.airov.entity.Attachment;
import com.airov.entity.Reference;
import com.airov.model.StatusResult;
import com.airov.near.manager.IAttachmentManager;
import com.airov.near.manager.IFileManager;
import com.airov.near.manager.IMailManager;
import com.airov.near.manager.IReferenceManager;
import com.airov.near.manager.ITagManager;
import com.airov.util.EnvUtil;
import com.airov.util.ValueUtil;




@RestController
@ResponseStatus(HttpStatus.OK)
@Transactional(rollbackFor={Exception.class})
public class NearSolutionController {
	private static Logger logger = LoggerFactory.getLogger(NearSolutionController.class);

	@Autowired
	IFileManager fileManager;
	@Autowired
	IReferenceManager referenceManager;
	@Autowired
	IMailManager mailManager;
	@Autowired
	private EnvUtil envUtil;
	@Autowired
	IAttachmentManager attachmentManager;
	@Autowired
	ITagManager tagManager;
	
	@RequestMapping(value = "/uploadTempFile", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody void uploadTempFile(HttpServletRequest request, @RequestParam("file") MultipartFile uploader, HttpServletResponse response) throws Exception {	  
		try {
			fileManager.uploadTempFile(request, response);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
    }
	
	  @RequestMapping(value = "/downloadFile/{path}/{fileName}")
	    @ResponseStatus(HttpStatus.OK)
	    public void downloadFile(@PathVariable("path") String path, @PathVariable("fileName") String fileName, HttpServletRequest request, HttpServletResponse response) throws Exception {
	    	try {
	    		fileManager.downloadFile(request, response,Constant.FILE_DIVISION_FILES + File.separator + path, fileName);
	    	} catch (Exception e) {
	    		logger.error(e.getMessage());
	    	}
	    }

	  @RequestMapping(value = "/uploadEditorImage", method = RequestMethod.POST)
	    @ResponseStatus(HttpStatus.CREATED)
	    public @ResponseBody void uploadEditorImage(HttpServletRequest request, HttpServletResponse response, @RequestParam MultipartFile upload) throws Exception {
	    		fileManager.uploadEditorImage(request, response, upload);
	    }
	  
/* 
 * reference
 * */
	
	@RequestMapping(value="/getReferences/{currentPage}/{itemsPerPage}/{tags}/{keyword}", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public StatusResult getReferences(HttpServletRequest request, @PathVariable("currentPage") String currentPage, @PathVariable("itemsPerPage") String itemsPerPage, @PathVariable("tags") String tags, @PathVariable("keyword") String keyword) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			if (tags != null && tags.equals("null")) {
				tags = null;
			}
			if (keyword != null && keyword.equals("null")) {
				keyword = null;
			}
			resultMap.put("reference", referenceManager.getReferences(Integer.parseInt(currentPage)  * Integer.parseInt(itemsPerPage), Integer.parseInt(itemsPerPage), tags,keyword));
			resultMap.put("total", referenceManager.getReferencesSize(tags, keyword));
			return StatusResult.getObject(resultMap);
		} catch (Exception ex) {
			logger.error("", ex);
			return new StatusResult(ex);			
		}
	}
	@RequestMapping(value="/getReference/{id}", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public StatusResult getReference(HttpServletRequest request, @PathVariable("id") String id) {
		try {
			return StatusResult.getObject(referenceManager.getReference(id));
		}catch (Exception ex) {
			logger.error("", ex);
			return new StatusResult(ex);			
		}
	}
	@RequestMapping(value="/deleteReference", method = RequestMethod.POST , produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody StatusResult deleteReference(HttpServletRequest request, @RequestBody Map<String, Object> requestBody) {
		try {
			
			
			boolean result = fileManager.deleteFile((String)requestBody.get("image"));
			if (result) {
				String tmp = (String)requestBody.get("tags");
				
				if (ValueUtil.isNotEmpty(tmp)) {
					List<String> tags = Arrays.asList(tmp.split(";"));
					
					for (String tag:tags) {
						tagManager.subtractTagCount(tag);
					}
					
					tagManager.deleteZeroCountTag();
				}
				referenceManager.deleteReference((String)requestBody.get("id"));
			}
			
			return StatusResult.getObject(true);
		}catch (Exception ex) {
			logger.error("", ex);
			return new StatusResult(ex);		
		}
	}
	
	@RequestMapping(value="/setReference", method = RequestMethod.POST , produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody StatusResult setReference(HttpServletRequest request, @RequestBody Map<String, Object> requestBody) {
		Reference references = new Reference();
		try {
			String id = (String)requestBody.get("id");
			
			if (ValueUtil.isEmpty(id)) {
				references.setId(references.createReferencesId());
			}
			else {
				references = referenceManager.getReference(id);
			}
			

			references.setDescription((String)requestBody.get("description"));
	
			references.setTitle((String)requestBody.get("title"));
			
			Date now = new Date();
		
			if (ValueUtil.isEmpty(id)) {
				references.setCreatedAt(now);
			}
		
			
			references.setUpdatedAt(now);
			
		
			if (ValueUtil.isNotEmpty((Map)requestBody.get("files"))) {
				Map file = (Map)fileManager.deployTempImageFile(requestBody);
				String newImage = "images/" + (String)file.get("fileId") + "." + (String)file.get("fileExtension");
				fileManager.deleteFile(references.getImage());
				references.setImage(newImage);
			}
			
			
			
			String tmp = (String)requestBody.get("tags");
			
			if (ValueUtil.isNotEmpty(tmp)) {
				List<String> tags = Arrays.asList(tmp.split(";"));
				
				for (String tag:tags) {
					tagManager.updateTag(tag);
				}
				
				references.setTags((String)requestBody.get("tags"));
			}
			
			
			return StatusResult.getObject(referenceManager.setReferences(references));
		} catch (Exception ex) {
			logger.error("", ex);
			return new StatusResult(ex);			
		}
	}
	
	/* 
	 * attachment
	 * */
	
	
	@RequestMapping(value="/getAttachments/{currentPage}/{itemsPerPage}", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public StatusResult getAttachments(HttpServletRequest request, @PathVariable("currentPage") String currentPage, @PathVariable("itemsPerPage") String itemsPerPage) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("attachment", attachmentManager.getAttachments(Integer.parseInt(currentPage)  * Integer.parseInt(itemsPerPage), Integer.parseInt(itemsPerPage)));
			resultMap.put("total", attachmentManager.getAttachmentsSize());
			return StatusResult.getObject(resultMap);
		} catch (Exception ex) {
			logger.error("", ex);
			return new StatusResult(ex);			
		}
	}
	
	@RequestMapping(value="/getAttachment/{id}", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public StatusResult getAttachment(HttpServletRequest request, @PathVariable("id") String id) {
		try {
			return StatusResult.getObject(attachmentManager.getAttachment(id));
		}catch (Exception ex) {
			logger.error("", ex);
			return new StatusResult(ex);			
		}
	}
	
	@RequestMapping(value="/deleteAttachment", method = RequestMethod.POST , produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody StatusResult deleteAttachment(HttpServletRequest request, @RequestBody Map<String, Object> requestBody) {
		try {
			
			attachmentManager.deleteAttachment(requestBody);
			
			return StatusResult.getObject(true);
		}catch (Exception ex) {
			logger.error("", ex);
			return new StatusResult(ex);		
		}
	}
	
	@RequestMapping(value="/setAttachment", method = RequestMethod.POST , produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody StatusResult setAttachment(HttpServletRequest request, @RequestBody Map<String, Object> requestBody) {
		Attachment attachment = new Attachment();
		try {
			String id = (String)requestBody.get("id");
			
			if (ValueUtil.isEmpty(id)) {
				attachment.setId(attachment.createAttachmentId());
			}
			else {
				attachment = attachmentManager.getAttachment(id);
			}
			

			attachment.setDescription((String)requestBody.get("description"));

			attachment.setTitle((String)requestBody.get("title"));
			
			Date now = new Date();
		
			if (ValueUtil.isEmpty(id)) {
				attachment.setCreatedAt(now);
			}
		
			
			attachment.setUpdatedAt(now);
			
		
			if (ValueUtil.isNotEmpty((Map)requestBody.get("files"))) {
				Map file = (Map)fileManager.deployTempFile(requestBody);
				String newFile = (String)file.get("fileId") + "." + (String)file.get("fileExtension");
				attachment.setFileName((String)file.get("fileName"));
				attachment.setFilePath(newFile);
				
				if (ValueUtil.isNotEmpty((String)requestBody.get("filePath"))){
					fileManager.deleteFile(Constant.FILE_DIVISION_FILES + File.separator + (String)requestBody.get("filePath"));
				}
			}
			
			
			return StatusResult.getObject(attachmentManager.setAttachment(attachment));
		} catch (Exception ex) {
			logger.error("", ex);
			return new StatusResult(ex);			
		}
	}
	

	
	/* 
	 * quote
	 * */
	@RequestMapping(value="/sendQuote", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public StatusResult sendQuote(HttpServletRequest request, @RequestBody Map<String, Object> requestBody) {
	try {			
			mailManager.sendMail(requestBody);			
			return StatusResult.getObject(true);
		}catch (Exception ex) {
			logger.error("", ex);
			return new StatusResult(ex);		
		}
	}
	
	
}
