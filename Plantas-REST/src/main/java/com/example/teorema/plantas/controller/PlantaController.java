package com.example.teorema.plantas.controller;

import com.example.teorema.plantas.model.CaracteristicaModel;
import com.example.teorema.plantas.model.PlantaModel;
import com.example.teorema.plantas.repository.PlantaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
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
	ResponseEntity cruzarPlantas(@Valid @RequestBody CruzamentoDTO plantasCruzamento) {
		PlantaModel parent1 = plantasCruzamento.getParent1();
		PlantaModel parent2 = plantasCruzamento.getParent2();
		PlantaModel[] children = new PlantaModel[4];
		if (parent1.getClassePlanta().equals(parent2.getClassePlanta())) {
			List<CaracteristicaModel> caracteristicas = parent1.getCaracteristicas()
					.stream()
					.filter(caracteristica -> caracteristica.getAlelos().size() == 2)
					.collect(Collectors.toList());
			parent2.getCaracteristicas()
					.stream()
					.filter(caracteristica -> !caracteristicas.contains(caracteristica.getId()) && caracteristica.getAlelos().size() == 2)
					.forEach(caracteristica -> {
						caracteristica.setGenotipos(new ArrayList<>());
						caracteristicas.add(caracteristica);
					});
			
			if(caracteristicas.isEmpty()) {
				throw new IllegalArgumentException("Não há como realizar o cruzamento por número inesperado de alelos");
			}
			
			for (int i = 0; i < children.length; i++) {
				children[i] = new PlantaModel();
				children[i].setCaracteristicas(caracteristicas);
				children[i].setNmPlanta(i %2 == 0 ? parent1.getNmPlanta() : parent2.getNmPlanta());
			}
			
			caracteristicas.forEach(caracteristica -> {
				Arrays.asList(children).forEach(child -> {
					child.setFiloPlanta(parent1.getFiloPlanta());
					child.setClassePlanta(parent1.getClassePlanta());
					child.setFamiliaPlanta(parent1.getFamiliaPlanta());
					for (int i = 0; i < 2; i++) {
						for (int j = 0; j < 2; j++) {
							CaracteristicaModel caracteristicaChild = child.getCaracteristicas()
									.stream()
									.filter(caracteristicaFilter -> caracteristica.getId().equals(caracteristicaFilter.getId()))
									.findFirst()
									.orElse(null);
							
							caracteristicaChild.setGenotipos(Arrays.asList(caracteristica.getAlelos().get(i), caracteristica.getAlelos().get(j)));
						}
					}
				});
			});
			

				plantaRepository.saveAll(Arrays.asList(children));
			
			
		} else {
			throw new IllegalArgumentException("Plantas não compatíveis não podem ser cruzadas");
		}
		
		
		return new ResponseEntity(children, HttpStatus.OK);
	}
	
}
