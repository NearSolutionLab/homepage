package com.airov.config;

import java.io.File;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import com.airov.constant.Constant;
import com.airov.near.controller.NearSolutionController;
import com.airov.near.manager.IFileAbstract;
import com.airov.near.manager.impl.FileManagerImpl;
import com.airov.util.BeanUtil;
import com.airov.util.EnvUtil;


@Configuration
public class WebConfig implements WebMvcConfigurer  {
	
	private static Logger logger = LoggerFactory.getLogger(NearSolutionController.class);
	
	private String uploadImagesPath;
	
	private String uploadImagesUrlPath;
	
	@Autowired
	private EnvUtil envUtil;
	
	/*
	 *  cros 에러문제
	 *  개발시에만 활성화 베포시에 주석처리
	 *  
	 * 
	 * */

//	@Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**").allowedOrigins("http://localhost:4200");
//    }
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		uploadImagesPath = 
				envUtil.getProperty(Constant.FILE_REPOSITORY)  
				+ "/imageserver";
		
		uploadImagesUrlPath = "/imageserver";
		
		/**
		 * angular 을 위한 셋팅
		 */
    	registry.addResourceHandler("/**/*")
        .addResourceLocations("classpath:/static/")
        .resourceChain(true)
        .addResolver(new PathResourceResolver() {
            @Override
            protected Resource getResource(String resourcePath,
                Resource location) throws IOException {
                Resource requestedResource = location.createRelative(resourcePath);
                if (requestedResource.exists() && requestedResource.isReadable()) {
                	return requestedResource;
                }
            	return new ClassPathResource("/static/index.html");
            }
        });
		
    	/**
    	 * 이미지 서버 셋팅
    	 */
		registry.addResourceHandler(envUtil.getProperty(Constant.IMAGE_SERVER_CONTEXT)+"**").addResourceLocations("file:" + envUtil.getProperty(Constant.IMAGE_SERVER_REPOSITORY));
		
		/**
    	 * temps folder 이미지 서버 셋팅
    	 */
		try {
			IFileAbstract fileAbstract = BeanUtil.get(IFileAbstract.class);
			String tempFolderDirPath = fileAbstract.getRepositoryPath() + fileAbstract.getRootDivision() + File.separator + FileManagerImpl.FILE_DIVISION_TEMPS + File.separator;
			registry.addResourceHandler(envUtil.getProperty(Constant.IMAGE_SERVER_CONTEXT) + "temps/" +"**").addResourceLocations("file:" + tempFolderDirPath);
		} catch (Exception e) {
			logger.error("Failed to make temp imageServer!");
		}
	}
}
