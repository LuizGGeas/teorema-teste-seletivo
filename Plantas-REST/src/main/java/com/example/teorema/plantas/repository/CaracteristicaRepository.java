package com.example.teorema.plantas.repository;

import com.example.teorema.plantas.model.CaracteristicaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CaracteristicaRepository extends JpaRepository<CaracteristicaModel, Long> {
	@Query(value = "select c from planta_caracteristicas pc " +
			"join caracteristica c ON c.id_caracteristica = pc.id_caracteristica " +
			"where pc.id_planta = :idPlanta", nativeQuery = true)
	List<CaracteristicaModel> findByPlantaId(@Param("idPlanta") Long plantaId);
	
}
