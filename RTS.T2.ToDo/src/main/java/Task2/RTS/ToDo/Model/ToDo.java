package Task2.RTS.ToDo.Model;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data   //generates getter setter and toSting method
@NoArgsConstructor    //generated non parameterized constructor
@AllArgsConstructor  //generates parameterized constructor
@Entity   //signals to the JPA provider that the class should be treated as a table in the database
@Table(name="todo")
public class ToDo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column
	private String title;
	@Column
	private String description;
	@Column
	private LocalDate date;
	@Column
	private boolean status;
	
}
