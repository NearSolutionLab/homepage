package com.airov;
import org.apache.catalina.connector.Connector;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@SpringBootApplication
@EnableAsync
@EnableCaching
public class NearSolutionApplication {
	public static void main(String[] args) {
		SpringApplication.run(NearSolutionApplication.class, args);
	}
	
/*
 * 
 * apatch tomcat 설
 * */
		@Value("${tomcat.ajp.protocol}")
		String ajpProtocol;

		@Value("${tomcat.ajp.port}")
		int ajpPort;

		@Value("${tomcat.ajp.enabled}")
		boolean tomcatAjpEnabled;

		@Bean
		public ServletWebServerFactory servletContainer() {
			TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
			tomcat.addAdditionalTomcatConnectors(createAjpConnector());
			return tomcat;
		}

		private Connector createAjpConnector() {
			Connector ajpConnector = new Connector(ajpProtocol);
			ajpConnector.setPort(ajpPort);
			ajpConnector.setSecure(false);
			ajpConnector.setAllowTrace(false);
			ajpConnector.setScheme("http");
			return ajpConnector;
		}
}