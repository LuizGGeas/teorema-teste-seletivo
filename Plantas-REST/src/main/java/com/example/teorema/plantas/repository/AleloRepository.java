package com.example.teorema.plantas.repository;

import com.example.teorema.plantas.model.AleloModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AleloRepository extends JpaRepository<AleloModel, Long> {
	@Query(value = "SELECT * FROM caracteristica_to_alelo cta " +
			"JOIN alelo a on cta.id_alelo = a.id_alelo " +
			"WHERE cta.id_caracteristica = :caracteristicaId", nativeQuery = true)
	List<AleloModel> findAleloByCaracteristicaId(@Param("caracteristicaId") Long caracteristicaId);
	
	@Query(value = "SELECT * FROM caracteristica_to_alelo cta " +
			"JOIN alelo a on cta.id_genotipo = a.id_alelo " +
			"WHERE cta.id_caracteristica = :caracteristicaId", nativeQuery = true)
	List<AleloModel> findGenotipoByCaracteristicaId(@Param("caracteristicaId") Long caracteristicaId);
}
