package com.airov.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

import com.airov.util.BeanUtil;

@Service
public class BeanUtil implements ApplicationContextAware {
	/**
	 * ApplicationContext
	 */
	private static ApplicationContext applicationContext;
	
	/**
	 * class 을 이용하여 Bean 가져온다.
	 * 
	 * @param requiredType
	 * @return
	 */
	public static <T> T get(Class<T> requiredType) {
		return applicationContext.getBean(requiredType);
	}

	/**
	 * ApplicationContext 가져온다.
	 * 
	 * @param requiredType
	 * @return
	 */
	public static <T> T getByApplicationContext(Class<T> requiredType) {
		return applicationContext.getBean(requiredType);
	}
	
	/**
	 * ApplicationContext Dependency Injection.
	 * 
	 * @param applicationContext
	 */
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		BeanUtil.applicationContext = applicationContext;
	}
}