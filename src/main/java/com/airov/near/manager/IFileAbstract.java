package com.airov.near.manager;

/**
 * 
 * @author kmyu
 *
 */
public interface IFileAbstract  {

	/**
	 * File 저장 폴더를 나누는 기준값을 리턴하는 구현체 필요 (ex : companyId, projectId)
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getRootDivision() throws Exception;

	/**
	 * File 저장 폴더경로를 리턴한다. 
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getRepositoryPath();

	/**
	 * 이미지 서버의 Context를 리턴한다.. 
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getImageServerContext();
	/**
	 * 이미지 서버 경로를 리턴한다.. 
	 * 
	 * @return
	 * @throws Exception
	 */
	
	public String getImageServerPath(); 
	/**
	 * 서버의 URL을 리턴한다.. 
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getServerUrl();

	/**
	 * 이미지 서버의 URL을 리턴한다.. 
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getImageServerUrl();

	/**
	 * Temps 이미지 서버의 URL을 리턴한다.. 
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getImageServerTempsUrl();

	public String getImageServerProfileUrl();
	
	public boolean isGcsEnabled();
}
