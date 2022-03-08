package com.airov.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.airov.util.IdUtil;
import com.airov.util.ValueUtil;

@Entity
@Table(name = "reference")
public class Reference {
	public static final String prefix = "ref";
	
	
	@Id
	private String id;
	
	@Column(name = "image")
	private String image;
	
	@Column(name = "tags")
	private String tags;
	 
	@Column(name = "description")
	private String description;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "created_at")
	private Date createdAt; 
	
	@Column(name = "updated_at")
	private Date updatedAt;
	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public static String createReferencesId() {
		return IdUtil.createShortId(prefix);
	}
	
	public static boolean isReferencesId(String id) {
		if (ValueUtil.isEmpty(id)) {
			return false;
		}
		return id.startsWith(prefix);
	}
}