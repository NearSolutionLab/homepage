package com.airov.db;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.airov.entity.Attachment;


public interface IAttachmentQueryManager extends JpaRepository<Attachment, String>{
	@Query(value = "SELECT u.*  FROM attachment u ORDER BY u.created_at DESC OFFSET ?1 LIMIT ?2", nativeQuery = true)
	public List<Attachment> getAttachments(@Param("start") int start, @Param("end") int end);
	
	@Query(value = "SELECT u.*  FROM attachment u WHERE u.id = ?1", nativeQuery = true)
	public Attachment getAttachment(@Param("id") String id);
}
