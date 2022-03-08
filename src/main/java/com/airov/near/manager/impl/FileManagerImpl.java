package com.airov.near.manager.impl;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.airov.constant.Constant;
import com.airov.entity.FileModel;
import com.airov.exception.InvalidArgumentException;
import com.airov.near.manager.IFileAbstract;
import com.airov.near.manager.IFileManager;
import com.airov.util.FileUtil;
import com.airov.util.IdUtil;
import com.airov.util.MessageUtil;
import com.airov.util.RestUtil;
import com.airov.util.ValueUtil;




@Service
public class FileManagerImpl implements IFileManager {

	
	public static final String FILE_DIVISION_TEMPS = "Temps";
	
	@Autowired
	IFileAbstract fileConfiguration;
	
 
   private String fileDirectory;

   /**
    * @return the fileDirectory
    */
   public String getFileDirectory() {
       return fileDirectory;
   }

   /**
    * @param fileDirectory
    *            the fileDirectory to set
    */
   public void setFileDirectory(String fileDirectory) {
       this.fileDirectory = fileDirectory;
   }
   
	/**
	 * File 구분 폴더(division) 별로 날짜(월)을 구분해서 파일을 저장할지에 대한 boolean 값
	 * 
	 * @return
	 * @throws Exception
	 */
	public boolean useMonthlyFolder(String fileDivision) throws Exception {
		if (fileDivision.equals(FILE_DIVISION_TEMPS)) {
			return false;
		}
		return true;
	}

	
	
	 private File getFileRepository(String fileRootDivision, String fileDivision, boolean onMonthlyFolder) throws Exception {

	        if (ValueUtil.isEmpty(this.fileDirectory)) {
	        		this.fileDirectory = fileConfiguration.getRepositoryPath();
	        		if (ValueUtil.isEmpty(this.fileDirectory)) {
	        			throw new Exception("Attachment directory is not specified!");
	        		}
	        }
	        
	        // 파일 홈 디렉토리 선택
	        String storageDir = this.fileDirectory;
	        File storage = new File(storageDir);
	        // 없다면 생성한다.
	        if (!FileUtil.exists(storage)) {
	            FileUtil.mkdir(storage);
	        }    
	        // 파일 루트 디렉토리 선택
	        storageDir =  storageDir + File.separator + fileRootDivision;
	        storage = new File(storageDir);
	        if (!FileUtil.exists(storage)) {
	            FileUtil.mkdir(storage);
	        }
	        // 파일 형태 구분에 따른 디렉토리 선택
	        storageDir = storageDir + File.separator + fileDivision;
	        storage = new File(storageDir);

	        // 없다면 생성한다.
	        if (!FileUtil.exists(storage)) {
	            FileUtil.mkdir(storage);
	        }
	        if (onMonthlyFolder) {
	            // 현재 년, 월 정보를 얻는다.
	            Calendar currentDate = Calendar.getInstance();
	            int year = currentDate.get(Calendar.YEAR);
	            int month = currentDate.get(Calendar.MONTH) + 1;
	            // 기본 파일 저장 디렉토리와 현재 년 정보로 파일 디렉토리를 설정한다.
	            storageDir = storageDir + File.separator + "Y" + year;
	            storage = new File(storageDir);
	            // 없다면 생성한다.
	            if (!FileUtil.exists(storage)) {
	                FileUtil.mkdir(storage);
	            }    
	            // 기본 파일 저장 디렉토리와 현재 월 정보로 파일 디렉토리를 설정한다.
	            storageDir = storageDir + File.separator + "M" + month;
	            storage = new File(storageDir);
	            // 만일 디렉토리가 없다면 생성한다.
	            if (!FileUtil.exists(storage)) {
	                FileUtil.mkdir(storage);
	            }
	        } else {
	            storage = new File(storageDir);
	        }
	        return storage;
	    }
	
	  private void writeAjaxFile(HttpServletRequest request, HttpServletResponse response, FileModel formFile) throws Exception {

	        PrintWriter writer = null;
	        InputStream is = null;

	        try {
	            writer = response.getWriter();
	        } catch (IOException ex) {
	            throw new Exception(ex.getMessage());
	        }
	        String agentInfo = request.getHeader("User-Agent");
	        try {
	            if (agentInfo.indexOf("MSIE") > 0 || request instanceof MultipartHttpServletRequest) { //IE
	                MultipartFile multipartFile = formFile.getMultipartFile();
	                is = multipartFile.getInputStream();
	            } else {
	                is = request.getInputStream();
	            }
	          
	            Map<String, Object> message = new HashMap<String, Object>();
	            message.put("key", "copingProgress");
	            message.put("fileName", formFile.getFileName());
	            message.put("fileSize", formFile.getFileSize());
	    		FileOutputStream fos = new FileOutputStream(new File(formFile.getFilePath()));
		        long count = 0;
	    		try {
	    	    	byte[] buffer = new byte[FileUtil.DEFAULT_BUFFER_SIZE];
	    	        long available = (long)message.get("fileSize");
	    	        int n = 0;
	    	        int lastProgress = 0;
	    	        while (-1 != (n = is.read(buffer))) {
	    	        	fos.write(buffer, 0, n);
	    	            count += n;
	    	            int progress = Math.round((float)count/(float)available * 100);
	    	            if (progress > lastProgress) {
	    	            	message.put("copingProgress", progress);
	    	
	    	            	lastProgress = progress;
	    	            }
	    	        }    			
	    	        if (count > Integer.MAX_VALUE) {
	    	        }
	    		} catch (Exception ex) {
	    			ex.printStackTrace();
	    		} finally {
	    			fos.close();
	    		}
	            response.setStatus(HttpServletResponse.SC_OK);
	            if (agentInfo.indexOf("MSIE") <= 0) {
	                response.setHeader("Content-Type", "application/json");
	            } else {
	                response.setHeader("Content-Type", "text/html");
	            }
	            
	            String encodingFilePath = StringUtils.replace(formFile.getFilePath(), "\\", "/");
	            String encodingFullPathName = StringUtils.replace(formFile.getFileServerPath(), "\\", "/");
	            
	            if (agentInfo.indexOf("MSIE") <= 0) {
	                writer.print("{\"status\": " + true + ", \"result\": {\"fileUrl\":\"" + formFile.getFileUrl(FILE_DIVISION_TEMPS) + "\", \"fileId\": \"" + formFile.getId() + "\", \"fileExtension\": \"" + formFile.getType() + "\", \"fileName\": \"" + formFile.getFileName() + "\", \"fullPathName\": \"" + encodingFullPathName + "\", \"fileSize\": " + formFile.getFileSize() + ", \"localFilePath\": \"" + encodingFilePath + "\"}}");
	            } else {            
	                writer.print("{\"status\": " + true + ", \"result\": {\"fileUrl\":\"" + formFile.getFileUrl(FILE_DIVISION_TEMPS) + "\", \"fileExtension\": \"" + formFile.getType() + "\", \"fileId\": " + formFile.getId() + "\", \"fullPathName\": \"" + formFile.getFileServerPath() + "\", \"fileSize\": " + formFile.getFileSize() + ", \"localFilePath\": \"" + encodingFilePath + "\"}}");
	            }    
	        } catch (FileNotFoundException ex) {
	            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	            writer.print("{\"status\": false, \"result\": {\"fileId\": \"" + formFile.getId() + "\"}}");
	            throw new Exception(ex.getMessage());
	        } catch (IOException ex) {
	            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	            writer.print("{\"status\": false, \"result\": {\"fileId\": \"" + formFile.getId() + "\"}}");
	            throw new Exception(ex.getMessage());
	        } finally {
	            try {
	                is.close();
	            } catch (IOException ignored) {
	                throw new Exception(ignored.getMessage());
	            }
	        }

	        writer.flush();
	        writer.close();
	    }
	    
	  @Override
	    public void uploadTempFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
	        
	        FileModel formFile = new FileModel();

	        String fileRootDivision = fileConfiguration.getRootDivision();

	        String fileId = IdUtil.getUUIDString();
	        String fileDivision = FILE_DIVISION_TEMPS;
	        File repository = this.getFileRepository(fileRootDivision, fileDivision, useMonthlyFolder(fileDivision));
	        String filePath = "";
	        String fileServerPath = "";
	        String extension = "";
	        String fileName = "";
	        String agentInfo = request.getHeader("User-Agent");
	        if (agentInfo.indexOf("MSIE") > 0 || request instanceof MultipartHttpServletRequest) { 
		        	//IE
	            List<FileModel> docList = new ArrayList<FileModel>();
	            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
	            Map<String, MultipartFile> filesMap = multipartRequest.getFileMap();
	            for (String key : filesMap.keySet()) {
	                MultipartFile mf = filesMap.get(key);
	                FileModel doc = new FileModel();
	                doc.setMultipartFile(mf);
	                docList.add(doc);
	            }
	            formFile = docList.get(0);
	            MultipartFile multipartFile = formFile.getMultipartFile();
	            fileName = multipartFile.getOriginalFilename();
	            formFile.setFileSize(multipartFile.getSize());
	            formFile.setMultipartFile(multipartFile);
	        } else {
	            try {
	            	JSONObject readBody = RestUtil.readRequestBody(request);
	            	fileName = (String)readBody.get("fileName");
	                //fileName = URLDecoder.decode(request.getHeader("X-File-Name"), "UTF-8");
	            	long fileSize = (long)readBody.get("fileSize");
	                formFile.setFileSize(fileSize);
	            } catch (UnsupportedEncodingException ex) {
	                throw ex;
	            }
	        }

	        if (fileName.indexOf(File.separator) > 1) {
	            fileName = fileName.substring(fileName.lastIndexOf(File.separator) + 1);
	        }
	        formFile.setFileName(fileName);
	        extension = fileName.lastIndexOf(".") > -1 ? fileName.substring(fileName.lastIndexOf(".") + 1) : null;
	        filePath = repository.getAbsolutePath() + File.separator + (String) fileId;

	        fileServerPath = this.getFileDirectory() + fileRootDivision + File.separator + FILE_DIVISION_TEMPS + File.separator + fileId + "." + extension;
	        formFile.setFileServerPath(fileServerPath);

	        if (extension != null) {
	            filePath = filePath + "." + extension;
	        }

	        formFile.setFilePath(filePath);
	        formFile.setId(fileId);
//	        formFile.setType(extension != null ? extension.toLowerCase() : null);
	        formFile.setType(extension);

	        this.writeAjaxFile(request, response, formFile);
	    }
	    
	    @Override
	    public boolean deleteTempFile(String path) throws Exception {
	        boolean result = false;

	        String fileRootDivision = fileConfiguration.getRootDivision();
	        String fileRepository = fileConfiguration.getRepositoryPath();
	        
	        String filePath = fileRepository + fileRootDivision + "/Temps/" + path;
	        File file = new File(filePath);
	        if (FileUtil.exists(file)) {
	            FileUtil.delete(file);
	            result = true;
	        }
	        return result;
	    }
	    
	    @Override
	    public boolean deleteFile(String path) throws Exception {
	        boolean result = false;

	        String imageServerRepository = fileConfiguration.getImageServerPath();
	        
	        String filePath = imageServerRepository  + path;
	        File file = new File(filePath);
	        if (FileUtil.exists(file)) {
	            FileUtil.delete(file);
	            result = true;
	        }
	        return result;
	    }
	    
	    @Override
	    public void downloadFile(HttpServletRequest request, HttpServletResponse response, String path, String fileName) throws Exception {
	    	String repositoryPath = fileConfiguration.getRepositoryPath();

	    	try {
		    	path = repositoryPath + File.separator + "imageserver/" + path;
				File file = new File(path);
				
				String userAgent = request.getHeader("User-Agent");
				boolean ie = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:11") > -1;
//				String fileName = null;
				
				if (ie) {
					fileName = URLEncoder.encode(fileName, "utf-8");
				} else {
					fileName = new String(fileName.getBytes("utf-8"),"iso-8859-1");
				}

				response.setContentType("application/octet-stream");
				response.setHeader("Content-Disposition","attachment;filename=\"" +fileName+"\";");

				FileInputStream fis = new FileInputStream(file);
				BufferedInputStream bis = new BufferedInputStream(fis);
				ServletOutputStream so = response.getOutputStream();
				BufferedOutputStream bos = new BufferedOutputStream(so);

				byte[] data = new byte[2048];
				int input = 0;
				while ((input=bis.read(data))!=-1) {
					bos.write(data,0,input);
					bos.flush();
				}

				if (bos!=null) bos.close();
				if (bis!=null) bis.close();
				if (so!=null) so.close();
				if (fis!=null) fis.close();
	    	} catch (Exception e) {
	    		e.printStackTrace();
	    	}
	    }
	    
	    @Override
	    public Map deployTempImageFile(Map filesMap) throws Exception{
	    	
	        if (ValueUtil.isEmpty(filesMap)) {
				throw new InvalidArgumentException();
	        }     
	        Map<String, Object> fileMap =  (Map<String, Object>)filesMap.get("files");
	        
	        
	        if (ValueUtil.isEmpty(fileMap)) {
				throw new InvalidArgumentException();
	        }

			String fileRootDivision = fileConfiguration.getRootDivision();
			String imageServerContext = fileConfiguration.getImageServerContext();
			
	 
	
	                    
	            
	            String tempFileId = (String)fileMap.get("fileId");
	            if (!FileUtil.isTempId(tempFileId)) {
	               
	            }
	            String fileName = (String)fileMap.get("fileName");
	            
	            if (fileName.indexOf(File.separator) > 1) {
	                fileName = fileName.substring(fileName.lastIndexOf(File.separator) + 1);
	            }
	            String extension = fileName.lastIndexOf(".") > -1 ? fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase() : null;

	            File repository = this.getFileRepository(imageServerContext, Constant.FILE_DIVISION_IMAGES, false);
	            
	            String fileId = FileModel.createFileId();
	            String tempFilePath = this.getFileDirectory() + fileRootDivision + File.separator + FILE_DIVISION_TEMPS + File.separator + tempFileId + "." + extension;
	            String realFilePath = repository.getAbsolutePath() + File.separator + fileId + "." + extension;            
	            
	            File tempFileDir = new File(this.getFileDirectory() + fileRootDivision + File.separator + FILE_DIVISION_TEMPS);
	            if (!FileUtil.exists(tempFileDir)) {
	            	FileUtil.mkdir(tempFileDir);
	            }
	            File realFileDir = new File(repository.getAbsolutePath() + File.separator);
	            if (!FileUtil.exists(realFileDir)) {
	            	FileUtil.mkdir(realFileDir);
	            }
	            
	            
	   
	            if (FileUtil.isImageExtension(extension)) {
	                String realThumnailFilePath = repository.getAbsolutePath() + File.separator + fileId  + "." + extension;            
	                BufferedImage image = FileUtil.getImageRead(new File(tempFilePath));       
	                FileUtil.writeImage(image, extension, new File(realThumnailFilePath));
	                  	
	            }            
	            fileMap.put("fileId", fileId);
	            
	            realFilePath = realFilePath.replace(fileDirectory, "");
	            fileMap.put("localFilePath", realFilePath);
	            fileMap.put("fileUrl", realFilePath);
	            
	            File deleteFile = new File(tempFilePath);
	            if (FileUtil.exists(deleteFile)) {
	                FileUtil.delete(deleteFile);
	            }
	          
	            
	         
			
			return fileMap;
	    }
	    public Map deployTempFile(Map filesMap)throws Exception{
	    	 if (ValueUtil.isEmpty(filesMap)) {
					throw new InvalidArgumentException();
		        }     
		        Map<String, Object> fileMap =  (Map<String, Object>)filesMap.get("files");
		        
		        
		        if (ValueUtil.isEmpty(fileMap)) {
					throw new InvalidArgumentException();
		        }

				String fileRootDivision = fileConfiguration.getRootDivision();
				String imageServerContext = fileConfiguration.getImageServerContext();
				
		 
		
		                    
		            
		            String tempFileId = (String)fileMap.get("fileId");
		            if (!FileUtil.isTempId(tempFileId)) {
		               
		            }
		            String fileName = (String)fileMap.get("fileName");
		            
		            if (fileName.indexOf(File.separator) > 1) {
		                fileName = fileName.substring(fileName.lastIndexOf(File.separator) + 1);
		            }
		            String extension = fileName.lastIndexOf(".") > -1 ? fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase() : null;

		            File repository = this.getFileRepository(imageServerContext, Constant.FILE_DIVISION_FILES, false);
		            
		            String fileId = FileModel.createFileId();
		            String tempFilePath = this.getFileDirectory() + fileRootDivision + File.separator + FILE_DIVISION_TEMPS + File.separator + tempFileId + "." + extension;
		            String realFilePath = repository.getAbsolutePath() + File.separator + fileId + "." + extension;            
		            
		            File tempFileDir = new File(this.getFileDirectory() + fileRootDivision + File.separator + FILE_DIVISION_TEMPS);
		            if (!FileUtil.exists(tempFileDir)) {
		            	FileUtil.mkdir(tempFileDir);
		            }
		            File realFileDir = new File(repository.getAbsolutePath() + File.separator);
		            if (!FileUtil.exists(realFileDir)) {
		            	FileUtil.mkdir(realFileDir);
		            }
		            
		            
		   
		            try {
		            	FileUtil.copy(new File(tempFilePath), new File(realFilePath));
		            } catch (Exception ex) {
						ex.printStackTrace();
		            }       
		            fileMap.put("fileId", fileId);
		            
		            fileMap.put("localFilePath", realFilePath );
		            fileMap.put("fileUrl",realFilePath.replace(fileDirectory, ""));
		            
		            File deleteFile = new File(tempFilePath);
		            if (FileUtil.exists(deleteFile)) {
		                FileUtil.delete(deleteFile);
		            }
		          
		            
		         
				
				return fileMap;
	    }
	    
	  
		 @Override
		public void uploadEditorImage(HttpServletRequest request, HttpServletResponse response, MultipartFile upload) throws Exception {
			if (upload==null || upload.getSize()==0){
				// 파일업로더에게 오류메시지를 전달하여 업로더가 종료될수 있도록 해야 함
				return;
			}

	        FileModel formFile = new FileModel();

	        String fileRootDivision = fileConfiguration.getRootDivision();

	        String fileId = IdUtil.getUUIDString();
	        String fileDivision = FILE_DIVISION_TEMPS;
	        File repository = this.getFileRepository(fileRootDivision, fileDivision, useMonthlyFolder(fileDivision));
	        String filePath = "";
	        String fileServerPath = "";
	        String extension = "";
	        String fileName = "";
	        String agentInfo = request.getHeader("User-Agent");
	        if (agentInfo.indexOf("MSIE") > 0 || request instanceof MultipartHttpServletRequest) { 
		        	//IE
	            List<FileModel> docList = new ArrayList<FileModel>();
	            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
	            Map<String, MultipartFile> filesMap = multipartRequest.getFileMap();
	            for (String key : filesMap.keySet()) {
	                MultipartFile mf = filesMap.get(key);
	                FileModel doc = new FileModel();
	                doc.setMultipartFile(mf);
	                docList.add(doc);
	            }
	            formFile = docList.get(0);
	            MultipartFile multipartFile = formFile.getMultipartFile();
	            fileName = multipartFile.getOriginalFilename();
	            formFile.setFileSize(multipartFile.getSize());
	            formFile.setMultipartFile(multipartFile);
	        } else {
	            try {
	            	JSONObject readBody = RestUtil.readRequestBody(request);
	            	fileName = (String)readBody.get("fileName");
	                //fileName = URLDecoder.decode(request.getHeader("X-File-Name"), "UTF-8");
	            	long fileSize = (long)readBody.get("fileSize");
	                formFile.setFileSize(fileSize);
	            } catch (UnsupportedEncodingException ex) {
	                throw ex;
	            }
	        }

	        if (fileName.indexOf(File.separator) > 1) {
	            fileName = fileName.substring(fileName.lastIndexOf(File.separator) + 1);
	        }
	        formFile.setFileName(fileName);
	        extension = fileName.lastIndexOf(".") > -1 ? fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase() : null;
	        filePath = repository.getAbsolutePath() + File.separator + (String) fileId;

	        fileServerPath = this.getFileDirectory() + fileRootDivision + File.separator + FILE_DIVISION_TEMPS + File.separator + fileId + "." + extension;
	        formFile.setFileServerPath(fileServerPath);

	        if (extension != null) {
	            filePath = filePath + "." + extension;
	        }

	        formFile.setFilePath(filePath);
	        formFile.setId(fileId);
	        formFile.setType(extension);

	        this.writeCKEditorAjaxFile(request, response, formFile, upload);
			
		}
		
	
		private void writeCKEditorAjaxFile(HttpServletRequest request, HttpServletResponse response, FileModel formFile, MultipartFile upload) throws Exception {

			PrintWriter writer = null;
			String callback = request.getParameter("CKEditorFuncNum");

	        try {
	        	response.setCharacterEncoding("UTF-8");
	        	if (!ValueUtil.isEmpty(callback)) 
	        		response.setContentType("text/html; charset=UTF-8");
	        	else 
	        		response.setContentType("application/json; charset=UTF-8");
	            writer = response.getWriter();
	        } catch (IOException ex) {
	            throw new Exception(ex.getMessage());
	        }
	        
	        
	        try {
	        	upload.transferTo(new File(formFile.getFilePath()));
	  
				
				if (!ValueUtil.isEmpty(callback)) {
					writer.print("<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction("
							+ callback
							+ ",'"
							+ formFile.getFileUrl(FILE_DIVISION_TEMPS)
							+ "',''"
							+ ")</script>");
				} else {	
					JSONObject json = new JSONObject();
					json.put("uploaded", 1);
					json.put("fileName", formFile.getFileName());
					json.put("url", formFile.getFileUrl(FILE_DIVISION_TEMPS));
					json.writeJSONString(writer);
				}
	        } catch (FileNotFoundException ex) {
	        	response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	        	if (!ValueUtil.isEmpty(callback))    {
	        		writer.print(MessageUtil.getString("common.upload.file.failed"));
	        	} else {
	        		JSONObject json = new JSONObject();
	        		JSONObject jsonErrorMessage = new JSONObject();
	        		jsonErrorMessage.put("message", MessageUtil.getString("common.upload.file.failed"));
					json.put("uploaded", 0);
					json.put("error", jsonErrorMessage);
					json.writeJSONString(writer);
	        	}
	            throw new Exception(ex.getMessage());
	        } catch (IOException ex) {
	        	response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	        	if (!ValueUtil.isEmpty(callback)) {
	        		writer.print(MessageUtil.getString("common.upload.file.failed"));
	        	} else {
	        		JSONObject json = new JSONObject();
	        		JSONObject jsonErrorMessage = new JSONObject();
	        		jsonErrorMessage.put("message", MessageUtil.getString("common.upload.file.failed"));
					json.put("uploaded", 0);
					json.put("error", jsonErrorMessage);
					json.writeJSONString(writer);
	        	}
	            throw new Exception(ex.getMessage());
	        }
	        writer.flush();
	        writer.close();
	    }
	    
	    
}
