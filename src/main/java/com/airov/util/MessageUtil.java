package com.airov.util;

import java.text.MessageFormat;
import java.util.Locale;
import java.util.ResourceBundle;


public class MessageUtil {
	public static final String DEFAULT_LOCALE = "ko";
	
    public static String getString(String key, String locale) {
        try {
        	if (ValueUtil.isEmpty(locale)) {
        		locale = DEFAULT_LOCALE;
        	}
            ResourceBundle res = ResourceBundle.getBundle("resource/airov", new Locale(locale));
            return res.getString(key);
        } catch (Exception ex) {
        }
        return "";
    }

    public static String getString(String key, Object[] params, String locale) {
        try {
        	if (ValueUtil.isEmpty(locale)) {
        		locale = DEFAULT_LOCALE;
        	}
            ResourceBundle res = ResourceBundle.getBundle("resource/airov", new Locale(locale));
            String pattern = res.getString(key);
            if (params == null) {
                return pattern;
            }
            MessageFormat mf = new MessageFormat("");
            mf.setLocale(new Locale(locale));
            mf.applyPattern(pattern);
            return mf.format(params);
        } catch (Exception ex) {
        }
        return "";
    }
    
    public static String[] getStringArray(String key, String locale) {
        try {
        	if (ValueUtil.isEmpty(locale)) {
        		locale = DEFAULT_LOCALE;
        	}
            ResourceBundle res = ResourceBundle.getBundle("resource/airov", new Locale(locale));
            return res.getStringArray(key);
        } catch (Exception ex) {
        }
        return null;
    }

    public static Object getObject(String key, String locale) {
        try {
        	if (ValueUtil.isEmpty(locale)) {
        		locale = DEFAULT_LOCALE;
        	}
            ResourceBundle res = ResourceBundle.getBundle("resource/airov", new Locale(locale));
            return res.getObject(key);
        } catch (Exception ex) {
        }
        return null;
    }
    
    public static String getString(String key) {
    	try {
    		return getString(key, DEFAULT_LOCALE);
    	} catch (Exception ex) {
    	}
    	return null;
    }

    public static String getString(String key, Object[] params) {
    	try {
    			return getString(key, params, DEFAULT_LOCALE);
    		
    	} catch (Exception ex) {
    	}
    	return null;
    }
    
    public static String[] getStringArray(String key) {
    	try {
    		return getStringArray(key, DEFAULT_LOCALE);

    	} catch (Exception ex) {
    	}
    	return null;
    }

    public static Object getObject(String key) {
    	try {
    			return getObject(key, DEFAULT_LOCALE);

    	} catch (Exception ex) {
    	}
    	return null;
    }
}
