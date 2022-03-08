package com.airov.model;

import java.io.PrintWriter;
import java.io.StringWriter;

import com.airov.exception.DevException;
import com.airov.util.FormatUtil;
import com.airov.util.ValueUtil;

public class StatusResult {
	public static String REULT_OK = "OK";
	
	private boolean status;
	private Object result;
	private Integer errorCode;
	private String errorMessage;
	private String stacktrace;
	
	public StatusResult() {
		this.status = true;
		this.result = null;
	}

	public StatusResult(Object result) {
		this.status = true;
		this.result = result;
	}
	public StatusResult(Exception e) {
		this.status = false;
		if (e instanceof DevException) {
			this.errorCode = ((DevException)e).getErrorCode();
			this.errorMessage = ((DevException)e).getMessage();			
		} else {
			this.errorMessage = e.getMessage();	
		}
		
		StringWriter sw = new StringWriter();
		e.printStackTrace(new PrintWriter(sw));
		this.stacktrace = sw.toString();
	}
	public static StatusResult getObject(Exception e) {
		if (ValueUtil.isEmpty(e)) {
			return new StatusResult();
		}
		return new StatusResult(e);
	}

	public static StatusResult getObject() {
		return new StatusResult();
	}
	
	public static StatusResult getObject(Object result) {
		return new StatusResult(result);
	}
	
	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public Integer getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(Integer errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String toString() {
		return FormatUtil.toJsonString(this);
	}

	public String getStacktrace() {
		return stacktrace;
	}

	public void setStacktrace(String stacktrace) {
		this.stacktrace = stacktrace;
	}
}
