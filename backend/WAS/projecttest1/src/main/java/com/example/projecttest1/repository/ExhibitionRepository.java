package com.example.projecttest1.repository;

import com.example.projecttest1.entity.Exhibition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExhibitionRepository extends JpaRepository<Exhibition, Integer> {
}
