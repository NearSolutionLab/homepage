package com.airov.near.manager;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

import com.airov.entity.FileModel;

public interface IFileManager {
	public void uploadTempFile(HttpServletRequest request, HttpServletResponse response) throws Exception;
    public boolean deleteTempFile(String path) throws Exception;
    public boolean deleteFile(String path) throws Exception;
    public void downloadFile(HttpServletRequest request, HttpServletResponse response, String path, String fileName) throws Exception ;
    public Map deployTempImageFile(Map filesMap) throws Exception ;
    public Map deployTempFile(Map filesMap)throws Exception;
    public void uploadEditorImage(HttpServletRequest request, HttpServletResponse response, MultipartFile upload) throws Exception;
}
