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
@Table(name = "caracteristica")
public class CaracteristicaModel implements Serializable {
	
	@Id()
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_caracteristica")
	private Long id;
	@Column(name = "nm_caracteristica")
	private String nome;
	
	@ManyToMany()
	@JoinTable(name = "caracteristica_to_alelo",
			joinColumns = @JoinColumn(name = "id_caracteristica"),
			inverseJoinColumns = @JoinColumn(name = "id_alelo"))
	private List<AleloModel> alelos;
	
	@ManyToMany()
	@JoinTable(name = "caracteristica_to_alelo",
			joinColumns = @JoinColumn(name = "id_caracteristica"),
			inverseJoinColumns = @JoinColumn(name = "id_genotipo"))
	private List<AleloModel> genotipos;
	
	public CaracteristicaModel() {
		genotipos = new ArrayList<>();
		alelos = new ArrayList<>();
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(getId(), getNome(), getAlelos(), getGenotipos());
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof CaracteristicaModel)) {
			return false;
		}
		CaracteristicaModel that = (CaracteristicaModel) o;
		return getId().equals(that.getId())
				&& getNome().equals(that.getNome())
				&& getAlelos().equals(that.getAlelos())
				&& getGenotipos().equals(that.getGenotipos());
	}
}
