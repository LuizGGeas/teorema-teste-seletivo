package com.example.teorema.plantas.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Entity()
@Table(name="alelo")
public class AleloModel implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alelo", nullable = false)
    private long idAlelo;
    @Column(name = "nm_alelo", nullable = false)
    private String caracteristica;
    @Column(name = "tp_alelo", nullable = false)
    private char tpAlelo;
    
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AleloModel)) {
            return false;
        }
        AleloModel that = (AleloModel) o;
        return getIdAlelo() == that.getIdAlelo()
            && getTpAlelo() == that.getTpAlelo() &&
            getCaracteristica().equals(that.getCaracteristica());
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(getIdAlelo(), getCaracteristica(), getTpAlelo());
    }
}
