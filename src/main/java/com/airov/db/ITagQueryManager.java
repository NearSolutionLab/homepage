package com.airov.db;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.airov.entity.Tag;

public interface ITagQueryManager  extends JpaRepository<Tag, String>{

	
	@Query(value = "SELECT u.*  FROM tag u ORDER BY u.count DESC OFFSET 0 LIMIT 5", nativeQuery = true)
	public List<Tag> getTags();
}
