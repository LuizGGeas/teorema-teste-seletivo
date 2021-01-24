package com.example.teorema.plantas.repository;

import com.example.teorema.plantas.model.PlantaModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantaRepository extends JpaRepository<PlantaModel, Long> {
	
	Optional<PlantaModel> findByIdPlanta(Long id);
}
