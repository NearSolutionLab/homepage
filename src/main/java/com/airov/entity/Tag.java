package com.airov.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tag")
public class Tag {
	
	
	@Id
	private int id;
	
	@Column(name = "name" ,unique =false)
	private String name;
	
	@Column(name = "count" , nullable = false)
	private String count;

	public String getName() {
		return name;
	}

	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public void setName(String name) {
		this.name = name;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}
	
	
	

}
