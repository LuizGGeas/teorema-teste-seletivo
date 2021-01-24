package com.example.teorema.plantas.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity()
@Table(name = "planta")
public class PlantaModel implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_planta")
	private long idPlanta;
	
	@Column(name = "nm_planta")
	private String nmPlanta;
	
	@Column(name = "nm_filo")
	private String filoPlanta;
	
	@Column(name = "nm_classe")
	private String classePlanta;
	
	@Column(name = "nm_ordem")
	private String ordemPlanta;
	
	@Column(name = "nm_familia")
	private String familiaPlanta;
	
	@ManyToMany
	@JoinTable(name = "planta_caracteristicas",
			joinColumns = @JoinColumn(name = "id_planta"),
			inverseJoinColumns = @JoinColumn(name = "id_caracteristica"))
	private List<CaracteristicaModel> caracteristicas;
	
	public PlantaModel() {
		caracteristicas = new ArrayList<>();
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(getIdPlanta(),
				getNmPlanta(),
				getFiloPlanta(),
				getClassePlanta(),
				getOrdemPlanta(),
				getFamiliaPlanta(),
				getCaracteristicas());
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof PlantaModel)) {
			return false;
		}
		PlantaModel that = (PlantaModel) o;
		return getIdPlanta() == that.getIdPlanta() &&
				getNmPlanta().equals(that.getNmPlanta()) &&
				getFiloPlanta().equals(that.getFiloPlanta()) &&
				getClassePlanta().equals(that.getClassePlanta()) &&
				getOrdemPlanta().equals(that.getOrdemPlanta()) &&
				getFamiliaPlanta().equals(that.getFamiliaPlanta()) &&
				getCaracteristicas().equals(that.getCaracteristicas());
	}
}
