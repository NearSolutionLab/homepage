package com.airov.near.manager.impl;



import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airov.near.manager.IFileManager;
import com.airov.near.manager.IMailManager;
import com.airov.util.EnvUtil;
import com.airov.util.MailUtil;
import com.airov.util.ValueUtil;


@Service
public class MailManagerImpl implements IMailManager{

	@Autowired
	IFileManager fileManager;
	@Autowired
	private EnvUtil envUtil;

	

	@Override
	public void sendMail(Map request) throws Exception{
		String host = envUtil.getProperty("airov.dev.mail.smtp.host");
		String port =  envUtil.getProperty("airov.dev.mail.smtp.port");
		String from =  envUtil.getProperty("airov.dev.mail.smtp.user");
		String password =  envUtil.getProperty("airov.dev.mail.smtp.password");
		String targetMail = envUtil.getProperty("airov.dev.mail.target");
		
		String subject = (String)request.get("title");
		String contents = (String)request.get("contents");
		
		if (ValueUtil.isEmpty(request.get("files"))) {
			MailUtil.sendMail(host, port, from, password, targetMail, subject, contents,null);
		}
		else {
			Map files= fileManager.deployTempFile(request) ;
			MailUtil.sendMail(host, port, from, password, targetMail, subject, contents,files,null);
		}
	
		
		

	}
}
