package com.example.teorema.plantas.controller;

import com.example.teorema.plantas.model.CaracteristicaModel;
import com.example.teorema.plantas.model.PlantaModel;
import com.example.teorema.plantas.repository.PlantaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/planta")
public class PlantaController {
	@Autowired
	CaracteristicasController caracteristicasController;
	@Autowired
	private PlantaRepository plantaRepository;
	
	@GetMapping("")
	ResponseEntity<List<PlantaModel>> getAllPlantas() {
		return new ResponseEntity(this.plantaRepository.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	ResponseEntity<PlantaModel> getPlantaById(@PathVariable long id) {
		Optional<PlantaModel> planta = this.plantaRepository.findByIdPlanta(id);
		if (planta.isPresent()) {
			return new ResponseEntity(planta, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping
	ResponseEntity<PlantaModel> savePlanta(@Valid @RequestBody PlantaModel planta) {
		List<CaracteristicaModel> savedCaracteristicas = planta.getCaracteristicas()
				.stream()
				.map(caracteristicasController::saveCaracteristica)
				.collect(Collectors.toList());
		planta.setCaracteristicas(savedCaracteristicas);
		this.plantaRepository.save(planta);
		return new ResponseEntity<>(planta, HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	ResponseEntity<PlantaModel> updatePlanta(@PathVariable long id, @Valid @RequestBody PlantaModel planta) {
		final Optional<PlantaModel> oldPlanta = this.plantaRepository.findById(id);
		
		if (oldPlanta.isPresent()) {
			PlantaModel newPlanta = oldPlanta.get();
			newPlanta.setNmPlanta(planta.getNmPlanta());
			
			planta.getCaracteristicas().stream().map(caracteristicasController::saveCaracteristica);
			newPlanta.setCaracteristicas(planta.getCaracteristicas());
			
			plantaRepository.save(newPlanta);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/{id}")
	ResponseEntity<Object> deletePlanta(@PathVariable long id) {
		Optional<PlantaModel> planta = plantaRepository.findById(id);
		
		if (planta.isPresent()) {
			plantaRepository.delete(planta.get());
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/cruzamento")
	ResponseEntity<Void> cruzarPlantas(@Valid @RequestBody CruzamentoDTO plantasCruzamento) {
		PlantaModel parent1 = plantasCruzamento.getParent1();
		PlantaModel parent2 = plantasCruzamento.getParent2();
		
		if (parent1.getClassePlanta().equals(parent2.getClassePlanta())) {
			List<CaracteristicaModel> caracteristicas = parent1.getCaracteristicas();
			parent2.getCaracteristicas()
					.stream()
					.filter(caracteristica -> !caracteristicas.contains(caracteristica.getId()))
					.forEach(caracteristica -> caracteristicas.add(caracteristica));
			
			
		} else {
			throw new IllegalArgumentException("Plantas não compatíveis não podem ser cruzadas");
		}
		
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
