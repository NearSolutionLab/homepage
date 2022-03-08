package com.airov.util;

import java.util.Map;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;



public class MailUtil {
	public static void sendMail(String host, String port, String from, String password, String to, String subject, String contents,Map files ,String noreplyFrom) {
		
        // SMTP 서버 정보를 설정한다.
        Properties prop = new Properties();
        prop.put("mail.smtp.host", host);
        prop.put("mail.smtp.port", port);
        prop.put("mail.smtp.auth", "true"); 
        prop.put("mail.smtp.ssl.enable", "false"); 
        prop.put("mail.pop3.ssl.trust", host);
        
        Session session = Session.getDefaultInstance(prop, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, password);
            }
        });
        try {
            MimeMessage message = new MimeMessage(session);
            
            if (noreplyFrom != null) {
            	try {
            		message.setFrom(new InternetAddress(noreplyFrom, MessageUtil.getString("mail.text.no-reply-from")));
            	} catch (Exception e) {}
            } else {
                message.setFrom(new InternetAddress(from));            	
            }
            if (to.contains(";")) {
            	String[] tos = to.split(";");
            	for (int i = 0; i < tos.length; i++) {
                    //수신자메일주소
                    message.addRecipient(Message.RecipientType.TO, new InternetAddress(tos[i]));             		
            	}
            } else {
                //수신자메일주소
                message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));             	
            }


            // Subject
            message.setSubject(subject); //메일 제목을 입력

            // Text
            //message.setText(contents);    //메일 내용을 입력
            
            // 파일첨부
            Multipart mParts = new MimeMultipart();

            MimeBodyPart mFilePart = new MimeBodyPart();
            FileDataSource fds = new FileDataSource((String)files.get("localFilePath"));
            mFilePart.setDataHandler(new DataHandler(fds));
            mFilePart.setFileName((String)files.get("fileName"));
            

            
            MimeBodyPart mTextPart = new MimeBodyPart();
            mTextPart.setText(contents + "\n\n\n\n\n");
     
            
           
            mParts.addBodyPart(mTextPart);
            mParts.addBodyPart(mFilePart);

            message.setContent(mParts); // 메일 내용을 html형식을 입력
//            message.setContent(mParts, "text/html; charset=utf-8"); // 메일 내용을 html형식을 입력
            
            // send the message
            Transport.send(message); ////전송
            System.out.println("message sent successfully...");
        } catch (AddressException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
	
	public static void sendMail(String host, String port, String from, String password, String to, String subject, String contents ,String noreplyFrom) {
		
		
        // SMTP 서버 정보를 설정한다.
        Properties prop = new Properties();
        prop.put("mail.smtp.host", host);
        prop.put("mail.smtp.port", port);
        prop.put("mail.smtp.auth", "true"); 
        prop.put("mail.smtp.ssl.enable", false); 
        prop.put("mail.pop3.ssl.trust", host);
        
        Session session = Session.getDefaultInstance(prop, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, password);
            }
        });
        try {
            MimeMessage message = new MimeMessage(session);
            
            if (noreplyFrom != null) {
            	try {
            		message.setFrom(new InternetAddress(noreplyFrom, MessageUtil.getString("mail.text.no-reply-from")));
            	} catch (Exception e) {}
            } else {
                message.setFrom(new InternetAddress(from));            	
            }
            if (to.contains(";")) {
            	String[] tos = to.split(";");
            	for (int i = 0; i < tos.length; i++) {
                    //수신자메일주소
                    message.addRecipient(Message.RecipientType.TO, new InternetAddress(tos[i]));             		
            	}
            } else {
                //수신자메일주소
                message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));             	
            }

//            String[] tmp = contents.split("\n");
            
            // Subject
            message.setSubject(subject); //메일 제목을 입력

            // Text
            message.setText(contents);    //메일 내용을 입력
//            message.setContent(contents, "text/html; charset=utf-8"); // 메일 내용을 html형식을 입력
            
            // send the message
            Transport.send(message); ////전송
            System.out.println("message sent successfully...");
        } catch (AddressException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
