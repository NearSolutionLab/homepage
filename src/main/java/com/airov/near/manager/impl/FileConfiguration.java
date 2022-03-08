package com.airov.near.manager.impl;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.airov.constant.Constant;
import com.airov.near.manager.IFileAbstract;
import com.airov.util.EnvUtil;
import com.airov.util.ValueUtil;



@Service
public class FileConfiguration implements IFileAbstract {

	@Autowired
	EnvUtil envUtil;
	
	@Override
	public String getRootDivision() throws Exception {
		return envUtil.getProperty(Constant.ROOT_DIVISION);
	}

	@Override
	public String getRepositoryPath() {
		return envUtil.getProperty(Constant.FILE_REPOSITORY);
	}

	@Override
	public String getImageServerContext() {
		return envUtil.getProperty(Constant.IMAGE_SERVER_CONTEXT);
	}
	@Override
	public String getImageServerPath() {
		return envUtil.getProperty(Constant.IMAGE_SERVER_REPOSITORY);
	}

	@Override
	public String getServerUrl() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		if (ValueUtil.isNotEmpty(request)) {
			return request.getScheme() + "://" + request.getHeader("Host") + "/";
		}
		return "";
	}
	
	@Override
	public String getImageServerUrl() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		if (ValueUtil.isNotEmpty(request)) {
			return request.getScheme() + "://" + request.getHeader("Host") + envUtil.getProperty(Constant.IMAGE_SERVER_CONTEXT);
		} else {
			return envUtil.getProperty(Constant.IMAGE_SERVER_CONTEXT);
		}
	}

	@Override
	public String getImageServerTempsUrl() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		if (ValueUtil.isNotEmpty(request)) {
			return request.getScheme() + "://" + request.getHeader("Host") + envUtil.getProperty(Constant.IMAGE_SERVER_CONTEXT) + "temps/";
		} else {
			return envUtil.getProperty(Constant.IMAGE_SERVER_CONTEXT) + "temps/";
		}
	}

	@Override
	public String getImageServerProfileUrl() {
		return getImageServerUrl() + "profiles/";
	}

	@Override
	public boolean isGcsEnabled() {
		// TODO Auto-generated method stub
		return false;
	}
}
