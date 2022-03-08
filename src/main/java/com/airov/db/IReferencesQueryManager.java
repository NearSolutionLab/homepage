package com.airov.db;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.airov.entity.Reference;


public interface IReferencesQueryManager extends JpaRepository<Reference, String>{	
	@Query(value = "SELECT u.*  FROM reference u WHERE u.id = ?1", nativeQuery = true)
	public Reference getReference(@Param("id") String id);
}
