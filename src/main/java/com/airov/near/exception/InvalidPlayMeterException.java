/*
 *  Copyright (c) 2020 Smartworks.net, Inc. & AIROV Tech. All Rights Reserved
 *
 *  Use of this software is controlled by the terms and conditions found in the
 *  license agreement under which this software has been supplied.
 *------------------------------------------------------------------------------
 *
 *  Source Name:    InvalidPlayMeterException.java
 *  Description:  	Play Meter에 관련된 오류를 위한 Exception 
 *  Authors:        Y.S. Jung
 *  Update History:
 *                  2020.03.14 : Created by Y.S. Jung
 *
 */
package com.airov.near.exception;

public class InvalidPlayMeterException extends Exception {

	private static final long serialVersionUID = 1L;
	public InvalidPlayMeterException() {
		super("Invalid PlayMeter Exception");
	}
	public InvalidPlayMeterException(String detailMessage) {
		super("Invalid PlayMeter Exception : " + detailMessage);
	}
	
}
