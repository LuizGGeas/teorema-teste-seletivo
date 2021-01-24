package com.example.teorema.plantas.controller;

import com.example.teorema.plantas.model.AleloModel;
import com.example.teorema.plantas.model.CaracteristicaModel;
import com.example.teorema.plantas.repository.CaracteristicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/caracterisitcas")
public class CaracteristicasController {
	@Autowired
	private CaracteristicaRepository caracteristicaRepository;
	
	@Autowired
	private AleloController aleloController;
	
	@GetMapping
	public ResponseEntity<List<CaracteristicaModel>> getAllCaracteristicas() {
		return new ResponseEntity(this.caracteristicaRepository.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CaracteristicaModel> getCaracteristicaById(@PathVariable long id) {
		Optional<CaracteristicaModel> caracteristica = this.caracteristicaRepository.findById(id);
		
		if (caracteristica.isPresent()) {
			return new ResponseEntity(caracteristica.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping
	public ResponseEntity<CaracteristicaModel> postCaracteristica(
			@Valid @RequestBody CaracteristicaModel caracteristica) {
		if(caracteristica.getId() == null) {
			saveCaracteristica(caracteristica);
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return this.updateCaracteristica(caracteristica.getId(), caracteristica);
		}
	}
	
	protected CaracteristicaModel saveCaracteristica(CaracteristicaModel caracteristica) {
		List<AleloModel> aleloSaved = saveAlelo(caracteristica.getAlelos());
		List<AleloModel> genotipoSaved = saveAlelo(caracteristica.getGenotipos());
		caracteristica.setAlelos(aleloSaved);
		caracteristica.setGenotipos(genotipoSaved);
		return caracteristicaRepository.save(caracteristica);
	}
	
	private List<AleloModel> saveAlelo(List<AleloModel> alelos) {
		return alelos.stream().map(aleloController::saveAlelo).collect(Collectors.toList());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<CaracteristicaModel> updateCaracteristica(
			@PathVariable long id,
			@RequestBody CaracteristicaModel caracteristica) {
		
		Optional<CaracteristicaModel> oldCaracteristica = this.caracteristicaRepository.findById(id);
		
		if (oldCaracteristica.isPresent()) {
			CaracteristicaModel newCaracteristica = oldCaracteristica.get();
			newCaracteristica.setNome(caracteristica.getNome());
			
			if (caracteristica.getAlelos().size() > 2 || caracteristica.getGenotipos().size() > 2) {
				throw new IllegalArgumentException("Lista de alelos ou de genótipos não pode ter mais de 2 elementos");
			}
			
			List<AleloModel> updatedAlelos = caracteristica.getAlelos().stream().map(aleloController::saveAlelo).collect(Collectors.toList());
			List<AleloModel> updatedGenotipos = caracteristica.getGenotipos().stream().map(aleloController::saveAlelo).collect(Collectors.toList());
			newCaracteristica.setAlelos(updatedAlelos);
			newCaracteristica.setGenotipos(updatedGenotipos);
			
			this.caracteristicaRepository.save(newCaracteristica);
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCaracterista(@PathVariable long id) {
		Optional<CaracteristicaModel> caracteristica = this.caracteristicaRepository.findById(id);
		
		if (caracteristica.isPresent()) {
			this.caracteristicaRepository.delete(caracteristica.get());
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	
}
