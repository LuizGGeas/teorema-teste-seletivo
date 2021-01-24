package com.example.teorema.plantas.controller;

import com.example.teorema.plantas.model.AleloModel;
import com.example.teorema.plantas.repository.AleloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/alelos")
public class AleloController {
	
	@Autowired
	private AleloRepository aleloRepository;
	
	protected AleloModel saveAlelo(AleloModel alelo) {
		if(Objects.isNull(alelo.getIdAlelo())) {
			return aleloRepository.save(alelo);
		}
		return this.updateAlelo(alelo);
	}
	
	private AleloModel updateAlelo(AleloModel alelo){
		return this.updateAlelo(alelo.getIdAlelo(), alelo);
	}
	
	private AleloModel updateAlelo(Long idAlelo, AleloModel alelo){
		Optional<AleloModel> oldAlelo = this.aleloRepository.findById(idAlelo);
		
		if (oldAlelo.isPresent()) {
			AleloModel newAlelo = oldAlelo.get();
			newAlelo.setTpAlelo(alelo.getTpAlelo());
			newAlelo.setCaracteristica(alelo.getCaracteristica());
			return this.aleloRepository.save(newAlelo);
		}
		return null;
	}
}
